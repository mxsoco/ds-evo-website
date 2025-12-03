import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem
} from "@abgov/react-components/experimental";

import {
  GoabSpacer,
} from "@abgov/react-components";

import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MenuContext, useMenu } from './contexts/MenuContext';
import { PageHeaderProvider } from './contexts/PageHeaderContext';
import { ScrollStateProvider, useScrollState } from './contexts/ScrollStateContext';
import { PageHeader } from './components/PageHeader';
import { MOBILE_BREAKPOINT } from "./constants/breakpoints";

// Inner component that can use ScrollState context
function WorkspaceContent() {
  const isHomeActive = location.pathname === '/';
  const { isMobile } = useMenu();
  const { scrollPosition } = useScrollState();

  if (isMobile) {
    // Mobile: No adaptive chrome, content edge-to-edge
    return (
      <div
      className="mobile-content-container"
      style={{
        backgroundColor: "white",
        height: "100%",
        overflow: "auto",
      }}>
        {!isHomeActive && ( // If DS "Homepage", do not apply PageHeader on this file
          <PageHeader title="Design system" />
        )}
        <Outlet />
      </div>
    );
  }

  // Desktop: Card container with adaptive chrome based on scroll state
  return (
    <div 
      className="desktop-card-container"
      data-scroll-state={scrollPosition}
    >
      <Outlet />
    </div>
  );
}

export function App() {
  const navigate = useNavigate();
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const tablet = width < 1200;
      setIsTablet(tablet);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile (< MOBILE_BREAKPOINT), start with menu closed; on desktop, start with menu open
  const [menuOpen, setMenuOpen] = useState(window.innerWidth >= MOBILE_BREAKPOINT);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  // Navigate and close menu on mobile
  const handleNavigate = (path: string) => {
    console.log("handleNavigate is clicked ", path);
    navigate(path);
  };

  // Single resize handler - manages both isMobile state and menu visibility
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < MOBILE_BREAKPOINT;

      setIsMobile(mobile);

      if (mobile) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, isMobile }}>
      <PageHeaderProvider>
        <ScrollStateProvider>
          <div className="app-layout">
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
                          icon="search"
                          label="Search"
                          type="normal"
                          badge="/"
                          url={"/support"}
                          onClick={() => handleNavigate("/support")}
                      />
                      <GoabxWorkSideMenuItem
                          icon="settings"
                          label="Get support"
                          url={"/settings"}
                          onClick={() => handleNavigate("/settings")}
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