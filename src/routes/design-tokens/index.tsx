import { 
  GoabAccordion,
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabPageBlock,
  GoabInput,
  GoabText
} from "@abgov/react-components";
import { useEffect, useState } from "react";
import "./Overview.css";
import BorderRadiusPage from "./border-radius/BorderRadius";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";
import { DesignTokensLanguageContext } from "../../contexts/DesignTokensLanguageContext";

export default function DesignTokensOverviewPage() {
  const [tokenLanguage, setLanguage] = useState("");

  useEffect(() => {
    const lang = localStorage.getItem("goa-docs-design-tokens-lang");
    setLanguage(lang || "scss");
  }, []);

  function designTokenLanguageChange(event: GoabDropdownOnChangeDetail) {
    const lang = event.value || "react6";
    setLanguage(lang);
    localStorage.setItem("goa-docs-design-tokens-lang", lang);
  }

  return (
    <DesignTokensLanguageContext.Provider value={tokenLanguage}>
      <GoabPageBlock width="1200px">
        <GoabText size="heading-xl" mt="xl">
          Design Tokens
        </GoabText>
        <GoabText size="body-l" mt="none" mb="xl">
          We use design tokens to communicate design decisions across design and development. These
          design decisions are a limited set of options for spacing, colour, typography, object
          styles, and more that maintain consistency across the design system.
        </GoabText>
        <GoabFormItem helpText="Search by keyword, category, or name">
          <GoabInput
            leadingIcon="search"
            name="filter"
            size="compact"
            type="text"
            /*value={filter}*/
            width="100%"
            /*onChange={({ value }) => setFilter(value || "")}*/
          />
        </GoabFormItem>

        <GoabBlock direction="column" mt="s" mb="s" ml="l" mr="l">
          <GoabDropdown value={tokenLanguage} onChange={designTokenLanguageChange}>
            <GoabDropdownItem label="SCSS" value="scss" />
            <GoabDropdownItem label="CSS" value="css" />
          </GoabDropdown>
        </GoabBlock>
        <GoabAccordion heading="Border radius">
            {BorderRadiusPage()}
        </GoabAccordion>
      </GoabPageBlock>
    </DesignTokensLanguageContext.Provider>
  );
}
