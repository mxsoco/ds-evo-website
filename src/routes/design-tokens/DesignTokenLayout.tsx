import { Outlet } from "react-router-dom";
import { SupportInfo } from "../../components/support-info/SupportInfo";
import "./DesignToken.css";

export function DesignTokenLayout() {

  return (
    <>
        <div className="content design-tokens">
          <main className="main">
            <Outlet />
            <SupportInfo />
          </main>
        </div>
    </>
  );
}

export default DesignTokenLayout;
