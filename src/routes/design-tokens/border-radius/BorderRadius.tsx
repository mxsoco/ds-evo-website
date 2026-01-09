import { useContext } from "react";
import { GoabContainer, GoabGrid, GoabTable, GoabText } from "@abgov/react-components";
import { TokenSnippet } from "../../../components/token-snippet/TokenSnippet";
import "./BorderRadius.css";
import { Token } from "../token";
import { getTokenGroups } from "../getTokenGroups";
import { DeviceWidthContext } from "../../../contexts/DeviceWidthContext";
import { getCssVarValue } from "../../../utils/styling";

export default function BorderRadiusPage({ filter }: { filter?: string } = {}) {
  const tokens: Token[] = [
    {
      tokenName: "goa-border-radius-none",
      rem: "0rem",
      px: "0px",
      figmaUsage: "Border-radius/None",
    },
    {
      tokenName: "goa-border-radius-s",
      rem: "0.125rem",
      px: "2px",
      figmaUsage: "Border-radius/Small",
    },
    {
      tokenName: "goa-border-radius-m",
      rem: "0.25rem",
      px: "4px",
      figmaUsage: "Border-radius/Medium",
    },
    {
      tokenName: "goa-border-radius-l",
      rem: "0.375rem",
      px: "6px",
      figmaUsage: "Border-radius/Large",
    },
    {
      tokenName: "goa-border-radius-xl",
      rem: "0.5rem",
      px: "8px",
      figmaUsage: "Border-radius/XLarge",
    },
    {
      tokenName: "goa-border-radius-2xl",
      rem: "0.625rem",
      px: "10px",
      figmaUsage: "Border-radius/2XLarge",
    },
    {
      tokenName: "goa-border-radius-3xl",
      rem: "0.75rem",
      px: "12px",
      figmaUsage: "Border-radius/3XLarge",
    },
  ];
  const { isDesktopContent } = useContext(DeviceWidthContext);
  const search = (filter || "").toLowerCase();
  const filteredTokens = tokens.filter((token) => {
    const hay = `${token.tokenName} ${token.figmaUsage} ${token.rem} ${token.px}`.toLowerCase();
    return hay.includes(search);
  });

  if (filteredTokens.length === 0 && search) {
    return <div style={{ padding: "1rem", color: "var(--goa-color-text-secondary)" }}>No tokens match your search</div>;
  }

  const renderDesktop = () => {
    return (
      <GoabTable variant="normal" width="100%">
        <thead>
          <tr>
            <th></th>
            <th>Design token</th>
            <th>rem</th>
            <th>px</th>
            <th>Figma</th>
          </tr>
        </thead>
        <tbody>
          {filteredTokens.map((tokens, index) => (
            <tr key={index}>
              <td>
                <div
                  className="token-block"
                  style={{
                    borderRadius: getCssVarValue(`--${tokens.tokenName}`),
                  }}
                />
              </td>
              <td>
                <TokenSnippet code={tokens.tokenName} />
              </td>
              <td>{tokens.rem}</td>
              <td>{tokens.px}</td>
              <td>{tokens.figmaUsage}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>
    );
  };

  const renderMobile = () => {
    return (
      <GoabGrid minChildWidth="22rem" gap="l">
        {getTokenGroups(filteredTokens).map(group =>
          group.map((token, idx) => (
            <GoabContainer key={idx}>
              <div
                className="token-block"
                style={{
                  borderRadius: getCssVarValue(`--${token.tokenName}`),
                }}
              />
              <TokenSnippet code={token.tokenName} className="mobile-token-view" />
              <dl>
                <dt>rem</dt> <dd  className="dd-style">{token.rem}</dd>
                <dt>px</dt> <dd  className="dd-style">{token.px}</dd>
                <dt>Figma variable</dt> <dd  className="dd-style">{token.figmaUsage}</dd>
              </dl>
            </GoabContainer>
          ))
        )}
      </GoabGrid>
    );
  };

  return (
    <div className="border-radius-page">
      {isDesktopContent ? renderDesktop() : renderMobile()}
    </div>
  );
}
