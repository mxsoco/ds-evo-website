import { GoabPageBlock } from "@abgov/react-components";
import { Link, Outlet } from "react-router-dom";
import { SupportInfo } from "../../components/support-info/SupportInfo";

export default function GetStartedLayout() {
  return (
    <GoabPageBlock width="1200px">
      <Outlet />
      <SupportInfo />
    </GoabPageBlock>
  );
}
