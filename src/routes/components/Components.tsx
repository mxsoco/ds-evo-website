import {
  GoabOneColumnLayout,
  GoabPageBlock,
} from "@abgov/react-components";
import { Outlet } from "react-router-dom";
import { SupportInfo } from "../../components/support-info/SupportInfo";

export function Components() {

  return (
    <>
      <GoabOneColumnLayout>
          <section className="ds-main-content">
              <GoabPageBlock width="1200px">
                <Outlet />
                <SupportInfo />
              </GoabPageBlock>
          </section>
      </GoabOneColumnLayout>
    </>
  );
}

export default Components;
