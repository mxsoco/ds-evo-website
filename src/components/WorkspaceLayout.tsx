import { Outlet, useLocation } from "react-router-dom";
import { useMenu } from "../contexts/MenuContext";
import { useScrollState } from "../contexts/ScrollStateContext";
import { PageHeader } from "./PageHeader";
import "./WorkspaceLayout.css";

export function WorkspaceLayout() {
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const { isMobile } = useMenu();
  const { scrollPosition } = useScrollState();

  if (isMobile) {
    return (
      <div className="mobile-content-container" style={{backgroundColor: "white", height: "100%", overflow: "auto"}}>
        {!isHomeActive && <PageHeader title="Design system" />}
        <Outlet />
      </div>
    );
  }

  return (
    <div className="card-container">
      <div className="desktop-card-container" data-scroll-state={scrollPosition}>
        <Outlet />
      </div>
    </div>
  );
}
