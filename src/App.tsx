import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideMenuGroup
} from "@abgov/react-components/experimental";

import {
  GoabSpacer,
} from "@abgov/react-components";

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { MenuContext } from './contexts/MenuContext';
import { PageHeaderProvider } from './contexts/PageHeaderContext';
import { ScrollStateProvider, useScrollState } from './contexts/ScrollStateContext';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "./constants/breakpoints";
import { WorkspaceLayout } from "./components/WorkspaceLayout";

const MENU_STATE_KEY = 'workspace-menu-open';

function getInitialMenuState(): boolean {
  // On mobile, always start closed
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    return false;
  }
  // On desktop, check localStorage for saved preference
  const saved = localStorage.getItem(MENU_STATE_KEY);
  if (saved !== null) {
    return saved === 'true';
  }
  // Default to open on desktop
  return true;
}

export function App() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(getInitialMenuState);
  const [isTablet, setIsTablet] = useState(window.innerWidth < TABLET_BREAKPOINT);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [visible, setVisibility] = useState<boolean>(false);


  // Navigate and close menu on mobile
  const handleNavigate = (path: string) => {
    console.log("handleNavigate is clicked ", path);
    navigate(path);
  };

  // Single resize handler - manages both isMobile state and menu visibility
  // Single debounced resize handler to avoid excessive re-renders and unexpected menu toggles
  const resizeTimer = useRef<number | null>(null);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < MOBILE_BREAKPOINT;
      const tablet = width < TABLET_BREAKPOINT;

      // Only update states when their value would change
      setIsTablet(prev => (prev === tablet ? prev : tablet));
      setIsMobile(prev => (prev === mobile ? prev : mobile));

      // If we cross into mobile, ensure the side menu is closed. Do not close on every small shrink.
      if (mobile) {
        setMenuOpen(false);
      }
    };

    const debounced = () => {
      if (resizeTimer.current) {
        window.clearTimeout(resizeTimer.current);
      }
      resizeTimer.current = window.setTimeout(() => {
        handleResize();
      }, 120);
    };

    window.addEventListener('resize', debounced);
    // Run once to normalize initial state if needed
    debounced();

    return () => {
      window.removeEventListener('resize', debounced);
      if (resizeTimer.current) {
        window.clearTimeout(resizeTimer.current);
      }
    };
  }, [setMenuOpen]);

  // Persist menu state to localStorage (desktop only)
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem(MENU_STATE_KEY, String(menuOpen));
    }
  }, [menuOpen, isMobile]);

  useEffect(() => {
    setTimeout(() => {
      setVisibility(true);
    }, 50);
  });

  console.log('[App] Rendering, menuOpen:', menuOpen, 'isMobile:', isMobile);

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, isMobile }}>
      <PageHeaderProvider>
        <ScrollStateProvider>
          <div className="app-layout" style={{ opacity: visible ? "1" : "0" }}>
            <div className="sidebar-left">
              <GoabxWorkSideMenu
                  url={"/"}
                  heading="Design system"
                  userName="Edna Mode"
                  userSecondaryText="edna.mode@example.com"
                  open={menuOpen}
                  onToggle={() => {
                    console.log('[App] onToggle called, toggling menuOpen from', menuOpen, 'to', !menuOpen);
                    setMenuOpen(prev => !prev);
                  }}
                  primaryContent={
                    <>
                      <GoabxWorkSideMenuItem
                          icon="document"
                          label="Get started"
                          url={"/get-started"}
                      />

                      <GoabxWorkSideMenuGroup
                          icon="shapes"
                          heading="Foundations"
                      >
                        <GoabxWorkSideMenuGroup
                          icon="shapes"
                          heading="Style guide"
                        >
                          <GoabxWorkSideMenuItem
                              url={"/foundations/motion"}
                              label="Motion"
                          />
                        </GoabxWorkSideMenuGroup>
                      </GoabxWorkSideMenuGroup>

                      <GoabxWorkSideMenuItem
                          icon="browsers"
                          label="Examples"
                          url={"/examples"}
                      />

                      <GoabxWorkSideMenuGroup
                          icon="shapes"
                          heading="Components"
                      >
                        <GoabxWorkSideMenuItem
                            url={"/button"}
                            label="Button"
                        />
                      </GoabxWorkSideMenuGroup>

                      <GoabxWorkSideMenuItem
                          icon="code-slash"
                          label="Tokens"
                          url={"/tokens"}
                      />

                      <GoabxWorkSideMenuItem
                          icon="people"
                          label="Playbook"
                          url={"/playbook"}
                      />

                      <GoabxWorkSideMenuItem
                          icon=""
                          label="Button"
                          url={"/button"}
                      />
                    </>
                  }
                  secondaryContent={
                    <>
                      <GoabxWorkSideMenuItem
                          icon="settings"
                          label="Get support"
                          url={"/settings"}
                      />
                      <GoabxWorkSideMenuItem
                          icon="search"
                          label="Search"
                          type="normal"
                          badge="Ctrl+K"
                          url={"/support"}
                      />
                      <GoabxWorkSideMenuItem
                          icon="notifications"
                          label="Release notes"
                          url={"/release-notes"}
                      />
                      <GoabSpacer vSpacing="m"/>
                    </>
                  }
              />
            </div>
            <WorkspaceLayout/>
          </div>
        </ScrollStateProvider>
      </PageHeaderProvider>
    </MenuContext.Provider>
  );
}

export default App;