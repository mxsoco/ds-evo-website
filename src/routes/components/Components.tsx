import {
  GoabPageBlock,
} from "@abgov/react-components";
import { Outlet } from "react-router-dom";

export function Components() {

  return (
    <>
      <GoabPageBlock width="1200px">
        <Outlet />
      </GoabPageBlock>
    </>
  );
}

export default Components;
