import { 
  GoabAccordion,
  GoabBlock,
  GoabButton,
  GoabCallout,
  GoabTabs,
  GoabTab,
  GoabFormItem,
  GoabPageBlock,
  GoabInput,
  GoabText
} from "@abgov/react-components";
import { useEffect, useState } from "react";
import BorderRadiusPage from "./border-radius/BorderRadius";
import BorderWidthPage from "./border-width/BorderWidth";
import ColorPage from "./color/Color";
import IconSizePage from "./icon-size/IconSize";
import OpacityPage from "./opacity/Opacity";
import ShadowPage from "./shadow/Shadow";
import SpacingPage from "./spacing/Spacing";
import TypographyPage from "./typography/Typography";
import { SupportInfo } from "../../components/support-info/SupportInfo";
import { DesignTokensLanguageContext } from "../../contexts/DesignTokensLanguageContext";
import "./DesignToken.css";

export default function DesignTokensOverviewPage() {
  const [tokenLanguage, setLanguage] = useState("");
  const [expandedAll, setExpandedAll] = useState<boolean>(false);

  const [expandedList, setExpandedList] = useState<number[]>([]);
    useEffect(() => {
    setExpandedAll(expandedList.length === 4);
  }, [expandedList.length]);

  const expandOrCollapseAll = () => {
      setExpandedAll((prev) => {
      const newState = !prev;
      setExpandedList(newState ? [1, 2, 3, 4] : []);
      return newState;
    });
  };

  const updateAccordion = (order: number, isOpen: boolean) => {
    setExpandedList((prev) => {
      if (isOpen) {
        return prev.includes(order) ? prev: [...prev, order];
      }
      return prev.filter((item) => item !== order);
    });
  }

  useEffect(() => {
    const lang = localStorage.getItem("goa-docs-design-tokens-lang");
    setLanguage(lang || "css");
  }, []);

  function designTokenTabsChange(event: any) {
    const tabIndex = event.detail?.tab || event.tab;
    const lang = tabIndex === 2 ? "scss" : "css";
    setLanguage(lang);
    localStorage.setItem("goa-docs-design-tokens-lang", lang);
  }

  return (
  <div className="content design-tokens">
    <main className="main">
      <DesignTokensLanguageContext.Provider value={tokenLanguage}>
        <GoabPageBlock width="1200px">
          <GoabBlock direction="column" gap="none" maxWidth="735px" width="100%">
            <GoabText size="heading-xl" mt="2xl">
              Design Tokens
            </GoabText>
            <GoabText size="body-l" mt="none" mb="xl">
              Browse all of our design tokens and apply them to your service. Choose between CSS and SCSS.
            </GoabText>
            <GoabCallout size="large" emphasis="low" type="information">
              For information, visit the Tokens page in the Get Started section.
            </GoabCallout>
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
          </GoabBlock>

          <GoabTabs
            initialTab={tokenLanguage === "css" ? 1 : 2}
            onChange={designTokenTabsChange}
            variant="segmented"
            stackOnMobile={false}
            mt="xl"
          >
            <GoabTab heading={"CSS"} />
            <GoabTab heading={"SCSS"} />
          </GoabTabs>

          <GoabButton size="compact" type="tertiary" mb="m" onClick={() => expandOrCollapseAll()}>
            {expandedAll ? "Hide all sections" : "Show all sections"}
          </GoabButton>

          <GoabAccordion open={expandedList.includes(1)} heading="Border radius" onChange={(open) => updateAccordion(1, open)}>
              {BorderRadiusPage()}
          </GoabAccordion>
          <GoabAccordion open={expandedList.includes(2)} heading="Border width" onChange={(open) => updateAccordion(2, open)}>
              {BorderWidthPage()}
          </GoabAccordion>
          <GoabAccordion open={expandedList.includes(3)} heading="Color" onChange={(open) => updateAccordion(3, open)}>
              {ColorPage()}
          </GoabAccordion>
          <GoabAccordion open={expandedList.includes(4)} heading="Icon size" onChange={(open) => updateAccordion(4, open)}>
              {IconSizePage()}
          </GoabAccordion>
          <GoabAccordion open={expandedList.includes(5)} heading="Opacity" onChange={(open) => updateAccordion(5, open)}>
              {OpacityPage()}
          </GoabAccordion>
          <GoabAccordion open={expandedList.includes(6)} heading="Shadow" onChange={(open) => updateAccordion(6, open)}>
              {ShadowPage()}
          </GoabAccordion>
          <GoabAccordion open={expandedList.includes(7)} heading="Spacing" onChange={(open) => updateAccordion(7, open)}>
              {SpacingPage()}
          </GoabAccordion>
          <GoabAccordion open={expandedList.includes(8)} heading="Typography" onChange={(open) => updateAccordion(8, open)}>
              {TypographyPage()}
          </GoabAccordion>

          <SupportInfo />
        </GoabPageBlock>
      </DesignTokensLanguageContext.Provider>
    </main>
  </div>
  );
}
