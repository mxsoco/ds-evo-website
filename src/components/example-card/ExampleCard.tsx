import { Link } from "react-router-dom";
import "./ExampleCard.css";
import { toKebabCase } from "../../utils";
import { GoabBadge, GoabText } from "@abgov/react-components";
import { useState, useEffect } from "react";

export type ComponentStatus = "Available" | "Not Published" | "In Progress" | "Legacy";

// Define allowed group options as a union type
export type Group =
  | "Content layout"
  | "Feedback and alerts"
  | "Inputs and actions"
  | "Structure and navigation"
  | "Utilities";
import { useContext } from "react";
import { LanguageVersionContext } from "../../contexts/LanguageVersionContext";
import { ANGULAR_VERSIONS, REACT_VERSIONS } from "../../components/version-language-switcher/version-language-constants";

function dasherize(value: string): string {
  return value.toLowerCase().split(" ").join("-");
}

function isRelativeUrl(url?: string): boolean {
  return url !== undefined && !/^https?:\/\//i.test(url);
}

export interface ExampleCardProps {
  name: string;
  description: string;
  tags?: string[];
  status: ComponentStatus;
  githubLink?: string;
  openIssues?: number;
  isNew?: boolean; // if true, show a badge on the component card to let users know the component is available in the latest version
  exampleUrl?: string;
  designComponentFigmaUrl?: string;
  designContributionFigmaUrl?: string;
  imageFolder?: "component-thumbnails" | "example-thumbnails";
}

export function ExampleCard(props: ExampleCardProps) {
  const folder = props.imageFolder ?? "example-thumbnails";
  const [imageUrl, setImageUrl] = useState(`/images/${folder}/${dasherize(props.name)}.png`);

  useEffect(() => {
    const testImage = new Image();
    testImage.src = imageUrl;
    testImage.onerror = () => {
      if (props.status !== "Available") {
        setImageUrl("/images/component-thumbnails/not-yet-available.svg");
      } else {
        setImageUrl("");
      }
    };
  }, [imageUrl, props.status]);

  const getBadgeType = (status: ComponentStatus) => {
    switch (status) {
      case "Available":
        return null; // No badge for "Available"
      case "Not Published":
        return "archived";
      case "In Progress":
        return "important";
      default:
        return "information"; // Fallback for unknown status
    }
  };
  getBadgeType(props.status);
  const { language } = useContext(LanguageVersionContext);
  return (

    <div className="card example">
      {props.status === "Available" ? (
        <Link to={isRelativeUrl(props.exampleUrl) ? props.exampleUrl! : toKebabCase(props.name)}
              tabIndex={-1}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </Link>
      ) : (
        <div
          className="card-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}
      <div className="card-content">
        {props.isNew && (
          <GoabBadge
            type="important"
            mt="l"
            content={
              "Available in " +
              (language === "angular"
                ? ANGULAR_VERSIONS.NEW.label.substring(0, 2).toUpperCase()
                : REACT_VERSIONS.NEW.label.substring(0, 2).toUpperCase())
            }
          />
        )}
        {props.status !== "Available" && (
          <GoabBadge
            mb="m"
            type={
              props.status === "In Progress"
                ? "important"
                : "archived"
            }
            content={props.status}
            emphasis="subtle"
          />
        )}
        <h4 style={{ marginTop: 0, marginBottom: 12 }}>
          {props.status === "Available" && (
            <Link
              to={isRelativeUrl(props.exampleUrl) ? props.exampleUrl! : toKebabCase(props.name)}>{props.name}</Link>
          ) }

          {props.status !== "Available" && props.githubLink && (
            <a
              href={props.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{props.name}</span>
            </a>
          )}
        </h4>
        <GoabText size="body-m" mb="m">
          {props.description}
          {props.status !== "Available" && props.githubLink && (
            " View issue on Github."
          )}
        </GoabText>

        {(() => {
          const getTagBadgeType = (tag: string) => {
            
            if (/Structure and navigation|Public form|Content layout|Inputs and actions|Technical|Feedback and alerts|Question page|Service type/i.test(tag)) {
              return "sunset";
            }
            
            if (/Interaction|Task|Page|Service/i.test(tag)) {
              return "lilac"; 
            } 

            if (/Ask a user for...|Help a user to.../i.test(tag)) {
              return "sky";
            } 

            // fallback rules similar to other headers
            return "information";
          };

          return props.tags?.map((tag) => (
            <GoabBadge
              key={tag}
              type={getTagBadgeType(tag)}
              mt="2xs"
              mb="2xs"
              mr="2xs"
              content={tag}
              emphasis="subtle"
            />
          ));
        })()}

      </div>
    </div>
  );
}
