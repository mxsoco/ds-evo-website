import { GoabBadge, GoabContainer, GoabIcon, GoabLink, GoabText } from "@abgov/react-components";
import "./RelatedCard.css";
import { MenuContext, useMenu } from '../../contexts/MenuContext';

type RelatedCategory = "components" | "examples" | "get-started" | "foundations" | "tokens";
interface Props {
  type: RelatedCategory;
  title: string;
  url?: string;
  githubURL?: string;
}

export function Related({ type, title, url, githubURL }: Props) {
  const { isMobile } = useMenu();

  return (
    <div className="related-container">
      <a href={`${githubURL ? githubURL : url}`} target= {` ${githubURL ? '_blank' : ''}`}>
        {type === "components" && ( 
          <div className= {`related-icon components ${githubURL && 'related-icon-bw'}`}>
            <GoabIcon fillColor="#333" type="shapes" />
          </div>
        )}
        {type === "examples" && ( 
          <div className= {`related-icon examples ${githubURL && 'related-icon-bw'}`}>
            <GoabIcon fillColor="#333" type="browsers" />
          </div>
        )}
        {type === "get-started" && ( 
          <div className= {`related-icon get-started ${githubURL && 'related-icon-bw'}`}>
            <GoabIcon fillColor="#333" type="document-text" />
          </div>
        )}
        {type === "foundations" && ( 
          <div className= {`related-icon foundations ${githubURL && 'related-icon-bw'}`}>
            <GoabIcon fillColor="#333" type="list" />
          </div>
        )}
        {type === "tokens" && ( 
          <div className= {`related-icon tokens ${githubURL && 'related-icon-bw'}`}>
            <GoabIcon fillColor="#333" type="code-slash" />
          </div>
        )}

        <div className="related-content">
          {!githubURL && ( 
            <div className="related-path">
              <GoabText size="body-xs" color="secondary" mt="none" mb="xs">
                {type === "components" && "Components > "}
                {type === "examples" && "Examples > "}
                {type === "get-started" && "Get started > "}
                {type === "foundations" && "Foundations > "}
                {type === "tokens" && "Tokens > "}
                {title}
              </GoabText>
            </div>
          )}

          <h3>
            {title}
            {githubURL && <GoabIcon ml="2xs" fillColor="var(--goa-color-interactive-default);" type="open"/>}
          </h3>

          {githubURL && (
            <GoabText mb="none">
                Visit the GitHub issue for more information.
            </GoabText>
          )}

          {(githubURL && isMobile) && (
            <GoabBadge mt="s" type="default" content="Not published" />
          )}
        </div>

        {(githubURL && !isMobile) && (
          <GoabBadge type="default" content="Not published" />
        )}
      </a>
    </div>
  );
}
