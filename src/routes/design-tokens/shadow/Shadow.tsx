import { GoabContainer, GoabGrid, GoabTable } from "@abgov/react-components";
import { TokenSnippet } from "../../../components/token-snippet/TokenSnippet";
import "./Shadow.css";
import { getTokenGroups } from "../getTokenGroups";
import { useContext } from "react";
import { DeviceWidthContext } from "../../../contexts/DeviceWidthContext";

interface Token {
  tokenName: string;
  value: string;
  figmaUsage: string;
}

export default function ShadowPage({ filter }: { filter?: string } = {}) {
  const tokens: Token[] = [
    {
      tokenName: "goa-shadow-modal",
      value: "x=6, y=6, blur=6, spread=0, rgba(0,0,0,0.16)",
      figmaUsage: "Effect: Drop-shadow/Modal",
    },
    {
      tokenName: "goa-shadow-100",
      value: "x=0, y=1, blur=0, spread=0, #1A1A1A12",
      figmaUsage: "Effect: Drop-shadow/100",
    },
    {
      tokenName: "goa-shadow-150",
      value: "x=0, y=1, blur=0, spread=0, #1A1A1A40",
      figmaUsage: "Effect: Drop-shadow/150",
    },
    {
      tokenName: "goa-shadow-200",
      value: "x=0, y=3, blur=1, spread=-1, #1A1A1A12",
      figmaUsage: "Effect: Drop-shadow/200",
    },
    {
      tokenName: "goa-shadow-300",
      value: "x=0, y=4, blur=6, spread=-2, #1A1A1A33",
      figmaUsage: "Effect: Drop-shadow/300",
    },
    {
      tokenName: "goa-shadow-400",
      value: "x=0, y=8, blur=16, spread=-4, #1A1A1A38",
      figmaUsage: "Effect: Drop-shadow/400",
    },
    {
      tokenName: "goa-shadow-500",
      value: "x=0, y=12, blur=20, spread=-8, #1A1A1A3D",
      figmaUsage: "Effect: Drop-shadow/500",
    },
    {
      tokenName: "goa-shadow-600",
      value: "x=0, y=20, blur=20, spread=-8, #1A1A1A47",
      figmaUsage: "Effect: Drop-shadow/600",
    },

  ];
  const { isDesktopContent } = useContext(DeviceWidthContext);
  const search = (filter || "").toLowerCase();
  const filteredTokens = tokens.filter((token) => {
    const hay = `${token.tokenName} ${token.value} ${token.figmaUsage}`.toLowerCase();
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
            <th>Value</th>
            <th>Figma</th>
          </tr>
        </thead>
        <tbody>
          {filteredTokens.map((token, index) => (
            <tr key={index}>
              <td>
                <div className={`token-block ${token.tokenName}`} />
              </td>
              <td>
                <TokenSnippet code={token.tokenName} />
              </td>
              <td>{token.value}</td>
              <td>{token.figmaUsage}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>
    );
  };

  const renderMobile = () => {
    return (
      <section className="mobile-token-view">
        <GoabGrid minChildWidth="22rem" gap="l">
          {getTokenGroups(filteredTokens).map(group =>
            group.map((token: Token, idx: number) => (
              <GoabContainer key={idx}>
                <div className={`token-block ${token.tokenName}`} />
                <TokenSnippet code={token.tokenName} className="mobile-token-view" />
                <dl>
                  <dt>Value</dt> <dd className="dd-style">{token.value}</dd>
                  <dt>Figma usage</dt> <dd className="dd-style">{token.figmaUsage}</dd>
                </dl>
              </GoabContainer>
            ))
          )}
        </GoabGrid>
      </section>
    );
  };

  return (
    <div className="shadow-page">
      {isDesktopContent ? renderDesktop() : renderMobile()}
    </div>
  );
}
