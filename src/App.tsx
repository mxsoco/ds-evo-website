import {
  GoaxWorkSideMenu,
  GoaxWorkSideMenuItem,
} from "@abgov/react-components/experimental";

import {
  GoabSpacer,
} from "@abgov/react-components";

import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MenuContext } from './contexts/MenuContext';
import {NotificationContent} from "./notification/NotificationContent";

export function App() {
  // On mobile (< 624px), start with menu closed; on desktop, start with menu open
  const [menuOpen, setMenuOpen] = useState(window.innerWidth >= 624);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 624);

  // Single resize handler - manages both isMobile state and menu visibility
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 624;

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
    <div style={{
      display: "flex",
      height: isMobile ? "" : "100vh",
      overflow: "hidden",
      backgroundColor: "#F8F8F8"
    }}>
      <GoaxWorkSideMenu
          heading="Design system"
          url="/"
          userName="Edna Mode"
          userSecondaryText="edna.mode@example.com"
          open={menuOpen}
          onToggle={() => {
            console.log('[App] onToggle called, toggling menuOpen from', menuOpen, 'to', !menuOpen);
            setMenuOpen(prev => !prev);
          }}
          popoverContent={
              <NotificationContent/>
          }
          primaryContent={
            <>
              <GoaxWorkSideMenuItem
                  icon="document"
                  label="Get started"
                  url="/document"
              />

              <GoaxWorkSideMenuItem
                  icon="list"
                  label="Foundations"
                  url="/foundations"
              />

              <GoaxWorkSideMenuItem
                  icon="browsers"
                  label="Examples"
                  url="/examples"
              />

              <GoaxWorkSideMenuItem
                  icon="shapes"
                  label="Components"
                  url="/components"
              >
                <GoaxWorkSideMenuItem
                    url="/documents/sub1"
                    label="Sub menu item 1"
                />
                <GoaxWorkSideMenuItem
                    url="/documents/sub2"
                    label="Sub menu item 2"
                />
                <GoaxWorkSideMenuItem
                    url="/documents/sub3"
                    label="Sub menu item 3"
                />
              </GoaxWorkSideMenuItem>

              <GoaxWorkSideMenuItem
                  icon="code-slash"
                  label="Tokens"
                  url="/tokens"
              />

              <GoaxWorkSideMenuItem
                  icon="people"
                  label="Playbook"
                  url="/team"
              />
            </>
          }
          secondaryContent={
            <>
              <GoaxWorkSideMenuItem
                  icon="search"
                  label="Search"
                  type="normal"
                  badge="/"
                  url="/support"
              />
              <GoaxWorkSideMenuItem
                  icon="settings"
                  label="Get support"
                  url="/settings"
              />
              <GoaxWorkSideMenuItem
                  icon="notifications"
                  label="Release notes"
                  url="/settings"
              />
              <GoabSpacer vSpacing="m"/>
            </>
          }
      />

      <div style={{
        flex: 1,
        padding: isMobile ? "0" : "20px 20px 20px 0",
        overflow: "auto"
      }}>
        {isMobile ? (
          // Mobile: No card container, content directly rendered
          <div style={{
            backgroundColor: "white",
            minHeight: "100vh",
          }}>
            <Outlet />
          </div>
        ) : (
          // Desktop: Keep the card container
          <div style={{
            backgroundColor: "white",
            border: "1px solid #E9E9E9",
            borderRadius: "24px",
            minHeight: "calc(100vh - 40px)",
            overflow: "hidden",
          }}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
    </MenuContext.Provider>
  );
}

export default App;