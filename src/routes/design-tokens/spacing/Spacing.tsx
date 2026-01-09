import { GoabContainer, GoabGrid, GoabTable } from "@abgov/react-components";
import { TokenSnippet } from "../../../components/token-snippet/TokenSnippet";
import "./Spacing.css";
import SPACING_TOKENS from "./spacing.json";
import { getTokenGroups } from "../getTokenGroups";
import { DeviceWidthContext } from "../../../contexts/DeviceWidthContext";
import { useContext } from "react";
import { getCssVarValue } from "../../../utils/styling";

interface Token {
  tokenName: string;
  rem: string;
  px: string;
  figmaUsage: string;
}

export default function SpacingPage({ filter }: { filter?: string } = {}) {
  const tokens: Token[] = SPACING_TOKENS;
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
          {filteredTokens.map((token, index) => (
            <tr key={index}>
              <td>
                <div className="represent">
                  <div className="grey-circle"></div>
                  <div
                    className={`space-rect ${token.tokenName}`}
                    style={{
                      width: getCssVarValue(`--${token.tokenName}`),
                    }}
                  ></div>
                  <div className="grey-circle"></div>
                </div>
              </td>
              <td>
                <TokenSnippet code={token.tokenName} />
              </td>
              <td>{token.rem}</td>
              <td>{token.px}</td>
              <td>{token.figmaUsage}</td>
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
          group.map((token: Token, idx: number) => (
            <GoabContainer key={idx}>
              <div className="represent">
                <div className="grey-circle"></div>
                <div
                  className={`space-rect ${token.tokenName}`}
                  style={{
                    width: getCssVarValue(`--${token.tokenName}`),
                  }}
                ></div>
                <div className="grey-circle"></div>
              </div>
              <TokenSnippet code={token.tokenName} className="mobile-token-view" />
              <dl>
                <dt>REM</dt> <dd className="dd-style">{token.rem}</dd>
                <dt>PX</dt> <dd className="dd-style">{token.px}</dd>
                <dt>Figma usage</dt> <dd className="dd-style">{token.figmaUsage}</dd>
              </dl>
            </GoabContainer>
          ))
        )}
      </GoabGrid>
    );
  };

  return (
    <div className="spacing-page">
      {isDesktopContent ? renderDesktop() : renderMobile()}
    </div>
  );
}
