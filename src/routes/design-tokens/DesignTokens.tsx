import { 
  GoabAccordion,
  GoabBlock,
  GoabButton,
  GoabCallout,
  GoabDivider,
  GoabTabs,
  GoabTab,
  GoabFormItem,
  GoabPageBlock,
  GoabInput,
  GoabText
} from "@abgov/react-components";
import { useEffect, useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import BorderRadiusPage, { BORDER_RADIUS_TOKENS } from "./border-radius/BorderRadius";
import BorderWidthPage, { BORDER_WIDTH_TOKENS } from "./border-width/BorderWidth";
import ColorPage, { COLOR_DATA } from "./color/Color";
import IconSizePage, { ICON_SIZE_TOKENS } from "./icon-size/IconSize";
import OpacityPage, { OPACITY_TOKENS } from "./opacity/Opacity";
import ShadowPage, { SHADOW_TOKENS } from "./shadow/Shadow";
import SpacingPage, { SPACING_TOKENS } from "./spacing/Spacing";
import TypographyPage, { TYPO_TOKENS } from "./typography/Typography";
import { SupportInfo } from "../../components/support-info/SupportInfo";
import {EmptyState} from "../../components/EmptyState";
import { DesignTokensLanguageContext } from "../../contexts/DesignTokensLanguageContext";
import "./DesignToken.css";

export default function DesignTokensOverviewPage() {
  const [filter, setFilter] = useState<string>("");
  const [debouncedFilter] = useDebounce(filter, 300);
  const [tokenLanguage, setLanguage] = useState("");
  const [expandedAll, setExpandedAll] = useState<boolean>(false);
  const [expandedList, setExpandedList] = useState<number[]>([]);

  useEffect(() => {
    setExpandedAll(expandedList.length === 8);
  }, [expandedList.length]);

  const expandOrCollapseAll = () => {
      setExpandedAll((prev) => {
        const newState = !prev;
        setExpandedList(newState ? [1, 2, 3, 4, 5, 6, 7, 8] : []);
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
  
  const resetFilters = () => {
    setFilter("");
  };

  const hasMatchTokens = (tokens: any[], filterStr: string) => {
    if (!filterStr) return true;
    const s = filterStr.toLowerCase();
    return tokens.some((t) => {
      const hay = Object.values(t).join(" ").toLowerCase();
      return hay.includes(s);
    });
  };

  const hasMatchColors = (colors: any[], filterStr: string) => {
    if (!filterStr) return true;
    const s = filterStr.toLowerCase();
    return colors.some((c) => c.tokens.some((t: any) => Object.values(t).join(" ").toLowerCase().includes(s)));
  };

  const borderRadiusHas = useMemo(() => hasMatchTokens(BORDER_RADIUS_TOKENS, debouncedFilter), [debouncedFilter]);
  const borderWidthHas = useMemo(() => hasMatchTokens(BORDER_WIDTH_TOKENS, debouncedFilter), [debouncedFilter]);
  const colorHas = useMemo(() => hasMatchColors(COLOR_DATA, debouncedFilter), [debouncedFilter]);
  const iconSizeHas = useMemo(() => hasMatchTokens(ICON_SIZE_TOKENS, debouncedFilter), [debouncedFilter]);
  const opacityHas = useMemo(() => hasMatchTokens(OPACITY_TOKENS, debouncedFilter), [debouncedFilter]);
  const shadowHas = useMemo(() => hasMatchTokens(SHADOW_TOKENS, debouncedFilter), [debouncedFilter]);
  const spacingHas = useMemo(() => hasMatchTokens(SPACING_TOKENS, debouncedFilter), [debouncedFilter]);
  const typographyHas = useMemo(() => hasMatchTokens(TYPO_TOKENS, debouncedFilter), [debouncedFilter]);

  useEffect(() => {
    if (debouncedFilter) {
      const ids: number[] = [];
      if (borderRadiusHas) ids.push(1);
      if (borderWidthHas) ids.push(2);
      if (colorHas) ids.push(3);
      if (iconSizeHas) ids.push(4);
      if (opacityHas) ids.push(5);
      if (shadowHas) ids.push(6);
      if (spacingHas) ids.push(7);
      if (typographyHas) ids.push(8);
      setExpandedList(ids);
    } else {
      setExpandedList([]);
    }
  }, [debouncedFilter, borderRadiusHas, borderWidthHas, colorHas, iconSizeHas, opacityHas, shadowHas, spacingHas, typographyHas]);

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
            <GoabText size="heading-xl" mt="2xl" mb="m">
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
                value={filter}
                width="100%"
                onChange={({ value }) => setFilter(value || "")}
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

          {(borderRadiusHas || borderWidthHas || colorHas || iconSizeHas || opacityHas || shadowHas || spacingHas || typographyHas) ? (
            <>
            {(!debouncedFilter || borderRadiusHas) && (
              <GoabAccordion
                open={expandedList.includes(1)}
                heading="Border radius"
                onChange={(open) => updateAccordion(1, open)}
              >
                <BorderRadiusPage filter={debouncedFilter} />
              </GoabAccordion>
            )}

            {(!debouncedFilter || borderWidthHas) && (
              <GoabAccordion
                open={expandedList.includes(2)}
                heading="Border width"
                onChange={(open) => updateAccordion(2, open)}
              >
                <BorderWidthPage filter={debouncedFilter} />
              </GoabAccordion>
            )}

            {(!debouncedFilter || colorHas) && (
              <GoabAccordion
                open={expandedList.includes(3)}
                heading="Color"
                onChange={(open) => updateAccordion(3, open)}
              >
                <ColorPage filter={debouncedFilter} />
              </GoabAccordion>
            )}

            {(!debouncedFilter || iconSizeHas) && (
              <GoabAccordion
                open={expandedList.includes(4)}
                heading="Icon size"
                onChange={(open) => updateAccordion(4, open)}
              >
                <IconSizePage filter={debouncedFilter} />
              </GoabAccordion>
            )}

            {(!debouncedFilter || opacityHas) && (
              <GoabAccordion
                open={expandedList.includes(5)}
                heading="Opacity"
                onChange={(open) => updateAccordion(5, open)}
              >
                <OpacityPage filter={debouncedFilter} />
              </GoabAccordion>
            )}

            {(!debouncedFilter || shadowHas) && (
              <GoabAccordion
                open={expandedList.includes(6)}
                heading="Shadow"
                onChange={(open) => updateAccordion(6, open)}
              >
                <ShadowPage filter={debouncedFilter} />
              </GoabAccordion>
            )}

            {(!debouncedFilter || spacingHas) && (
              <GoabAccordion
                open={expandedList.includes(7)}
                heading="Spacing"
                onChange={(open) => updateAccordion(7, open)}
              >
                <SpacingPage filter={debouncedFilter} />
              </GoabAccordion>
            )}

            {(!debouncedFilter || typographyHas) && (
              <GoabAccordion
                open={expandedList.includes(8)}
                heading="Typography"
                onChange={(open) => updateAccordion(8, open)}
              >
                <TypographyPage filter={debouncedFilter} />
              </GoabAccordion>
            )}
          </>
          ) : (
              
            <EmptyState
              buttonText={"Clear search"}
              onButtonClick={resetFilters}
              subline={"Try adjusting your search."}
            />
            
          )}
          
          <GoabDivider mt="3xl"></GoabDivider>

          <SupportInfo />
        </GoabPageBlock>
      </DesignTokensLanguageContext.Provider>
    </main>
  </div>
  );
}
