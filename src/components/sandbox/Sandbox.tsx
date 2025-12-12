import { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { GoabCallout } from "@abgov/react-components";
import { GoabCalloutType } from "@abgov/ui-components-common";

import SandboxProperties from "./SandboxProperties";
import { CodeSnippet } from "../../components/code-snippet/CodeSnippet";
import { ComponentBinding } from "./ComponentBinding";
import { ReactSerializer } from "./ReactSerializer";
import { AngularSerializer } from "./AngularSerializer";
import { AngularReactiveSerializer } from "./AngularReactiveSerializer";
import ComponentSerializer from "./ComponentSerializer";
import { useMenu } from '../../contexts/MenuContext';

import "./Sandbox.css";
import React from "react";
import { LanguageVersionContext } from "../../contexts/LanguageVersionContext";
import { AngularTemplateDrivenSerializer } from "../../components/sandbox/AngularTemplateDrivenSerializer";
import { LanguageVersion } from "../../components/version-language-switcher/version-language-constants";
import { toSentenceCase, fetchAllIssueCounts, fetchComponentMetadataFromProject } from "../../utils";
import { GoabBlock, GoabButton, GoabIcon, GoabSpacer, GoabTooltip } from "@abgov/react-components";

type Flag = "reactive" | "template-driven" | "event";
type ComponentType = "goa" | "codesnippet";
type Serializer = (el: any, properties: ComponentBinding[]) => string;

interface SandboxProps {
  properties?: ComponentBinding[];
  formItemProperties?: ComponentBinding[];
  note?: string | { type?: GoabCalloutType; heading?: string; content: string };
  fullWidth?: boolean;
  onChange?: (bindings: ComponentBinding[], props: Record<string, unknown>) => void;
  onChangeFormItemBindings?: (bindings: ComponentBinding[], props: Record<string, unknown>) => void;
  flags?: Flag[];
  skipRender?: boolean; // prevent rendering the snippet, to allow custom code to be shown
  skipRenderOnly?: string; // prevent rendering the snippet for a specific language. Ex: react/angular
  skipRenderDom?: boolean; // rendering code snippets, but display none for the DOM because it isn't working as expected if inside sandbox
  allow?: string[]; // Be default the Sandbox is selective to what it renders out. This adds
  // additional elements to what is allowed to be rendered out
  variableNames?: string[]; // If we want to assign a variable such as step={step} render in code snippet, provides variableNames=["step"]
  children: ReactNode;
  background?: string;
  githubLink?: string;
  onControlsOpen?: () => void;
  figmaLink?: string;
}

type SandboxViewProps = {
  fullWidth?: boolean;
  sandboxProps: SandboxProps;
  background?: string;
};

export const Sandbox = (props: SandboxProps) => {
  const { isMobile } = useMenu();
  const {language: lang, version} = useContext(LanguageVersionContext);
  const [formatLang, setFormatLang] = useState<string>("");

  const serializers: Record<string, Serializer> = {
    "react": (els: ReactElement[], properties) => {
      const serializer = new ComponentSerializer(new ReactSerializer(properties, version, props.variableNames || []));
      return serializer.componentsToString(els);
    },

    "angular": (els: ReactElement[], properties) => {
      const serializer = new ComponentSerializer(new AngularSerializer(properties, version, props.variableNames || []));
      return serializer.componentsToString(els);
    },

    "angular-reactive": (els: ReactElement[], properties) => {
      const serializer = new ComponentSerializer(new AngularReactiveSerializer(properties, version));
      return serializer.componentsToString(els);
    },

    "angular-template-driven": (els: ReactElement[], properties) => {
      const serializer = new ComponentSerializer(new AngularTemplateDrivenSerializer(properties, version, props.variableNames || []));
      return serializer.componentsToString(els);
    }
  };

  const formatMap: Record<string, string> = {
    react: "tsx",
    angular: "html",
  };

  const [issueCount, setIssueCount] = useState<number | null>(null);
  
  function onDrawerClick() {
    props.onControlsOpen?.();
  }

  useEffect(() => {
    if (!props.githubLink) return;

    const getCount = async () => {
      const label = toSentenceCase(props.githubLink!);
      const metadata = await fetchComponentMetadataFromProject();
      const Allcounts = await fetchAllIssueCounts("Components", metadata);
      const count = Allcounts[label] || 0;
      setIssueCount(count);
    };

    getCount();
  }, [props.githubLink]);

  // Hooks

  useEffect(() => {
    if (!props.properties) return;
    if (!props.children) return;

    setFormatLang(formatMap[lang]);
  }, [lang, props.children, props.properties]);

  // Functions

  function onChange(bindings: ComponentBinding[]) {
    props.onChange?.(bindings, toKeyValue(bindings));
  }

  function onChangeFormItemBindings(bindings: ComponentBinding[]) {
    props.onChangeFormItemBindings?.(bindings, toKeyValue(bindings));
  }

  function toKeyValue(bindings: ComponentBinding[]) {
    return bindings.reduce((acc: Record<string, unknown>, prop: ComponentBinding) => {
      if (typeof prop.value === "string" && prop.value === "") {
        return acc;
      }
      acc[prop.name] = prop.value;
      return acc;
    }, {});
  }

  function SandboxView(props: SandboxViewProps): ReactElement {
    const { background } = props;

    return <div className="sandbox-render" style={{ background }}>
      <div className={props.fullWidth ? "sandbox-render-fullwidth" : "sandbox-render-centered"}>
        <ComponentList type="goa" sandboxProps={props.sandboxProps} />
      </div>
    </div>
  }

  return (
    <>
      {/* Only render the GoAAccordion if props.properties is provided */}
      {props.properties && props.properties.length > 0 && (

        <>
        <GoabBlock gap="l" direction={isMobile ? "column" : "row"} alignment={isMobile ? "left" : "center"} mt="l" mb="xl" width="100%">

          <GoabButton onClick={onDrawerClick} size="compact" type="secondary">
            Component controls
          </GoabButton>

          {!isMobile && (
            <GoabSpacer hSpacing="fill"></GoabSpacer>
          )}

          {(props.githubLink || props.figmaLink) && (
            <GoabBlock gap="xs" direction="row" alignment="center">
              {/* GitHub Issues link, if we have a "githubLink" */}
              {/* Figma link, if we have a "figmaLink" */}
              <GoabBlock gap="2xs" direction="row" alignment="center">
                {props.figmaLink && (
                  <>
                    <GoabTooltip content="View in Figma">
                      <a className="icon-link no-external-icon"
                        href={props.figmaLink} target="_blank" rel="noopener noreferrer"
                        style={{ whiteSpace: "nowrap", display: "flex", gap: "var(--goa-space-xs)" }}>
                          <svg className="icon-default" width="18" height="18" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 5C5 5.92826 5.36875 6.8185 6.02513 7.47487C6.6815 8.13125 7.57174 8.5 8.5 8.5H12V1.5H8.5C7.57174 1.5 6.6815 1.86875 6.02513 2.52513C5.36875 3.1815 5 4.07174 5 5Z"
                              stroke="var(--goa-color-interactive-default)" strokeWidth="1.28947"/>
                            <path
                              d="M12.0001 1.5V8.5H15.5001C16.4284 8.5 17.3186 8.13125 17.975 7.47487C18.6314 6.8185 19.0001 5.92826 19.0001 5C19.0001 4.07174 18.6314 3.1815 17.975 2.52513C17.3186 1.86875 16.4284 1.5 15.5001 1.5L12.0001 1.5Z"
                              stroke="var(--goa-color-interactive-default)" strokeWidth="1.28947"/>
                            <path
                              d="M5 12C5 12.9283 5.36875 13.8185 6.02513 14.4749C6.6815 15.1313 7.57174 15.5 8.5 15.5H12V8.5H8.5C7.57174 8.5 6.6815 8.86875 6.02513 9.52513C5.36875 10.1815 5 11.0717 5 12Z"
                              stroke="var(--goa-color-interactive-default)" strokeWidth="1.28947"/>
                            <path
                              d="M12.0001 12C12.0001 11.0717 12.3689 10.1815 13.0252 9.52513C13.6816 8.86875 14.5719 8.5 15.5001 8.5C16.4284 8.5 17.3186 8.86875 17.975 9.52513C18.6314 10.1815 19.0001 11.0717 19.0001 12C19.0001 12.9283 18.6314 13.8185 17.975 14.4749C17.3186 15.1313 16.4284 15.5 15.5001 15.5C14.5719 15.5 13.6816 15.1313 13.0252 14.4749C12.3689 13.8185 12.0001 12.9283 12.0001 12V12Z"
                              stroke="var(--goa-color-interactive-default)" strokeWidth="1.28947"/>
                            <path
                              d="M5 19C5 18.0717 5.36875 17.1815 6.02513 16.5251C6.6815 15.8687 7.57174 15.5 8.5 15.5H12V19C12 19.9283 11.6313 20.8185 10.9749 21.4749C10.3185 22.1313 9.42826 22.5 8.5 22.5C7.57174 22.5 6.6815 22.1313 6.02513 21.4749C5.36875 20.8185 5 19.9283 5 19Z"
                              stroke="var(--goa-color-interactive-default)" strokeWidth="1.28947"/>
                          </svg>
                          {/* Hover SVG */}
                          <svg className="icon-hover" width="18" height="18" viewBox="0 0 400 600" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M0 500C0 444.772 44.772 400 100 400H200V500C200 555.228 155.228 600 100 600C44.772 600 0 555.228 0 500Z"
                              fill="#24CB71" />
                            <path d="M200 0V200H300C355.228 200 400 155.228 400 100C400 44.772 355.228 0 300 0H200Z"
                                  fill="#FF7237" />
                            <path
                              d="M299.167 400C354.395 400 399.167 355.228 399.167 300C399.167 244.772 354.395 200 299.167 200C243.939 200 199.167 244.772 199.167 300C199.167 355.228 243.939 400 299.167 400Z"
                              fill="#00B6FF" />
                            <path d="M0 100C0 155.228 44.772 200 100 200H200V0H100C44.772 0 0 44.772 0 100Z" fill="#FF3737" />
                            <path d="M0 300C0 355.228 44.772 400 100 400H200V200H100C44.772 200 0 244.772 0 300Z" fill="#874FFF" />
                          </svg>
                      </a>
                    </GoabTooltip>
                  </>
                )}
              </GoabBlock>
              <GoabBlock gap="2xs" direction="row" alignment="center">
                {props.githubLink && (
                  <>
                    <GoabTooltip content={issueCount !== null ? 'View Github issues (${issueCount})' : 'View Github issues'}>
                      <a className="github icon-link no-external-icon"
                        href={`https://github.com/GovAlta/ui-components/issues?q=is%3Aissue+is%3Aopen+label%3A%22${encodeURIComponent(
                          toSentenceCase(props.githubLink)
                        )}%22`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ whiteSpace: "nowrap", display: "flex", gap: "var(--goa-space-xs)" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#006DCC" className="icon-default" viewBox="0 0 512 512"><title>Logo Github</title><path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"></path></svg>
                        <span>
                          {issueCount !== null ? `(${issueCount})` : ''}
                        </span>
                      </a>
                    </GoabTooltip>
                  </>
                )}
              </GoabBlock>
            </GoabBlock>
          )}
        </GoabBlock>
        {/* Drawer moved to parent page so the trigger can remain here while the drawer is rendered elsewhere. */}
        </>
      )}
    {props.skipRenderDom ? null : <SandboxView fullWidth={props.fullWidth} sandboxProps={props} background={props.background} />}

      <SandboxCode props={props} formatLang={formatLang} lang={lang} serializers={serializers} version={version} />
      {props.note &&
        (typeof props.note === "string" ? (
          <p className="sandbox-note">{props.note}</p>
        ) : (
          <GoabCallout
            type={props.note.type || "important"}
            size="medium"
            heading={props.note.heading}
            maxWidth="596px"
            mt="m"
            mb="2xl"
          >
            {props.note.content}
          </GoabCallout>
        ))}
    </>
  );
};

type SandboxCodeProps = {
  props: SandboxProps & { children: ReactNode };
  lang: string;
  formatLang: string;
  serializers: Record<string, Serializer>;
  version?: LanguageVersion;
}
function SandboxCode(p: SandboxCodeProps) {
  // reactive angular
  if (p.lang === "angular" && p.props.flags?.includes("reactive")) {
    return (
      <>
        {(p.version === "old" || p.props.flags?.includes("event")) && <>
          <h4>Event based</h4>
          <AdditionalCodeSnippets tags={["angular"]} sandboxProps={p.props} />
          {!p.props.skipRender && p.props?.skipRenderOnly !== p.lang && (
            <ComponentOutput
              formatLang={p.formatLang}
              type="angular"
              sandboxProps={p.props}
              serializer={p.serializers[p.lang]}
            />
          )}
        </>}

        <h4>Reactive forms (FormControl)</h4>
        <AdditionalCodeSnippets tags={["angular", "reactive"]} sandboxProps={p.props} />

        {!p.props.skipRender && (
          <ComponentOutput
            formatLang={p.formatLang}
            type="angular-reactive"
            sandboxProps={p.props}
            serializer={p.serializers["angular-reactive"]}
          />
        )}

        {/*If flags have reactive, it means that the possibility we have template-driven as well*/}

        {p.props.flags?.includes("template-driven") && (
          <>
            <h4>Template driven (ngModel)</h4>
            <AdditionalCodeSnippets tags={["angular", "template-driven"]} sandboxProps={p.props} />
            {!p.props.skipRender && (
              <ComponentOutput
                formatLang={p.formatLang}
                type="angular-template-driven"
                sandboxProps={p.props}
                serializer={p.serializers["angular-template-driven"]}
              />
            )}
          </>
        )}
      </>
    );
  }

  // angular
  if (p.lang === "angular") {
    return (
      <>
        <AdditionalCodeSnippets tags={["angular"]} sandboxProps={p.props} />
        {!p.props.skipRender && p.props.skipRenderOnly !== "angular" && <ComponentOutput formatLang={p.formatLang} type="angular" sandboxProps={p.props} serializer={p.serializers[p.lang]} />}
      </>
    );
  }

  // react
  if (p.lang === "react") {
    return (
      <>
        <AdditionalCodeSnippets tags={["react"]} sandboxProps={p.props} />
        {!p.props.skipRender && p.props.skipRenderOnly !== "react" && <ComponentOutput formatLang={p.formatLang} type="react" sandboxProps={p.props} serializer={p.serializers[p.lang]} />}
      </>
    );
  }

  return <>No formatter found for {p.formatLang}</>;
}


// Gets code snippets matching the tags passed in. This allows for Angular reactive components
// to be displayed, while hiding the non-reactive ones
type AdditionalCodeSnippetsProps = {
  tags: string[];
  sandboxProps: SandboxProps;
}
function AdditionalCodeSnippets(props: AdditionalCodeSnippetsProps) {
  const matches = (list: string[]): boolean => {
    return props.tags.filter(tag => list.includes(tag)).length === list.length;
  };
  const els = ComponentList({type: "codesnippet", sandboxProps: props.sandboxProps})
    .filter(el => {
      if (el.props.lang === "css") return true;
      const componentTags: string[] =
        Array.isArray(el.props.tags)
          ? el.props.tags
          : [el.props.tags];
      if (props.tags.length !== componentTags.length)
        return false;
      return matches(componentTags);
    });
  return <>{els}</>
}

// Filters components from within the Sandbox children
// i.e. Get all the <CodeSnippet> components
type ComponentListProps = {
  sandboxProps: SandboxProps;
  type: ComponentType;
}
function ComponentList(props: ComponentListProps): ReactElement[] {
  const children = React.Children.toArray(props.sandboxProps.children) as ReactElement[];
  const isValidGOAComponent = (el: ReactElement) =>
    typeof el.type === "function" && el.type.name.toLowerCase().startsWith(props.type);
  const isAllowedInSandbox = (el: ReactElement) =>
    typeof el.type === "string" && props.sandboxProps.allow?.includes(el.type) ||
    typeof el.type === "function" && props.sandboxProps.allow?.includes(el.type.name);
  return children.filter(
    el => React.isValidElement(el) && (isValidGOAComponent(el) || isAllowedInSandbox(el))
  );
}

// CodeSnippet output. To show code the root element *must* start with goa (case-insensitive).
// This allows
type ComponentOutputProps = {
  formatLang: string;
  type: "angular" | "angular-reactive" | "angular-template-driven" | "react";
  sandboxProps: SandboxProps;
  serializer: Serializer;
}

function ComponentOutput(props: ComponentOutputProps): ReactElement {
  let code = props.serializer(
    ComponentList({type: "goa", sandboxProps: props.sandboxProps})
    ,props.sandboxProps.properties || []
  )

  // HACK: solve angular template error: If you meant to write the @ character, you should use the "&#64;" HTML entity instead.
  if (props.type.includes("angular")) {
    code = code.replace(/@/g, "&#64;");
  }
  // HACK: remove `$1`s that appear only in the prod build
  code = code.replace(/\$1/g, "")

  return (
    <CodeSnippet
      lang={props.formatLang}
      tags={props.type}
      allowCopy={true}
      code={code}
    />
  )
}


export default Sandbox;
