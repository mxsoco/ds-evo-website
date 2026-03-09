import { Outlet } from "react-router-dom";
import { SupportInfo } from "../../components/support-info/SupportInfo";

export default function FoundationsLayout() {
  return (
    <div className="content-card">
      <Outlet />
      <SupportInfo />
    </div>
  );
}
