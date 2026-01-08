import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem
} from "@abgov/react-components/experimental";

import {
  GoabSpacer,
} from "@abgov/react-components";

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { MenuContext, useMenu } from './contexts/MenuContext';
import { PageHeaderProvider } from './contexts/PageHeaderContext';
import { ScrollStateProvider, useScrollState } from './contexts/ScrollStateContext';
import { PageHeader } from './components/PageHeader';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "./constants/breakpoints";

function WorkspaceContent() {
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const { isMobile } = useMenu();
  const { scrollPosition } = useScrollState();

  return (
    <div
      className={isMobile ? "mobile-content-container" : "desktop-card-container"}
      data-scroll-state={isMobile ? undefined : scrollPosition}
      style={isMobile ? { backgroundColor: "white", height: "100%", overflow: "auto" } : undefined}
    >
      {/* Only show the PageHeader on mobile when not on the homepage */}
      {isMobile && !isHomeActive && <PageHeader title="Design system" />}
      <Outlet />
    </div>
  );
}

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
              <GoabxWorkSideMenu
                  heading="Design system"
                  url={"/"}
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
                          onClick={() => handleNavigate("/get-started")}
                      />

                      <GoabxWorkSideMenuItem
                          icon="list"
                          label="Foundations"
                          url={"/foundations"}
                          onClick={() => handleNavigate("/foundations")}
                      />

                      <GoabxWorkSideMenuItem
                          icon="browsers"
                          label="Examples"
                          url={"/examples"}
                          onClick={() => handleNavigate("/examples")}
                      />

                      <GoabxWorkSideMenuItem
                          icon="shapes"
                          label="Components"
                          url={"/components"}
                          onClick={() => handleNavigate("/components")}
                      >
                        <GoabxWorkSideMenuItem
                            url={"/documents/sub1"}
                            label="Sub menu item 1"
                            onClick={() => handleNavigate("/documents/sub1")}
                        />
                        <GoabxWorkSideMenuItem
                            url={"/documents/sub2"}
                            label="Sub menu item 2"
                            onClick={() => handleNavigate("/documents/sub2")}
                        />
                        <GoabxWorkSideMenuItem
                            url={"/documents/sub3"}
                            label="Sub menu item 3"
                            onClick={() => handleNavigate("/documents/sub3")}
                        />
                      </GoabxWorkSideMenuItem>

                      <GoabxWorkSideMenuItem
                          icon="code-slash"
                          label="Tokens"
                          url={"/tokens"}
                          onClick={() => handleNavigate("/tokens")}
                      />

                      <GoabxWorkSideMenuItem
                          icon="people"
                          label="Playbook"
                          url={"/playbook"}
                          onClick={() => handleNavigate("/playbook")}
                      />

                      <GoabxWorkSideMenuItem
                          icon=""
                          label="Button"
                          url={"/button"}
                          onClick={() => handleNavigate("/button")}
                      />
                    </>
                  }
                  secondaryContent={
                    <>
                      <GoabxWorkSideMenuItem
                          icon="settings"
                          label="Get support"
                          url={"/settings"}
                          onClick={() => handleNavigate("/settings")}
                      />
                      <GoabxWorkSideMenuItem
                          icon="search"
                          label="Search"
                          type="normal"
                          badge="/"
                          url={"/support"}
                          onClick={() => handleNavigate("/support")}
                      />
                      <GoabxWorkSideMenuItem
                          icon="notifications"
                          label="Release notes"
                          url={"/release-notes"}
                          onClick={() => handleNavigate("/release-notes")}
                      />
                      <GoabSpacer vSpacing="m"/>
                    </>
                  }
              />

              <div 
                className="card-container"
                style={{
                  flex: 1,
                  overflow: isTablet ? "hidden" : "unset",
                }}
              >
                <WorkspaceContent />
              </div>
          </div>
        </ScrollStateProvider>
      </PageHeaderProvider>
    </MenuContext.Provider>
  );
}

export default App;