import { GoabPageBlock } from "@abgov/react-components";
import {Outlet} from "react-router-dom";
import {SupportInfo} from "../../components/support-info/SupportInfo";
import { LanguageVersionContext } from "../../contexts/LanguageVersionContext";
import { useContext } from "react";
import { getVersionedUrlPath } from "../../components/version-language-switcher/version-language-constants";

export default function ExamplesLayout() {
  const {language, version} = useContext(LanguageVersionContext);
  getVersionedUrlPath(version, language);

  return (
      <GoabPageBlock width="1200px">
        <Outlet />
        <SupportInfo />
      </GoabPageBlock>
  );
}
