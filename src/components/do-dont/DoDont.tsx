import { GoabIcon, GoabText } from "@abgov/react-components";
import "./DoDont.css";
import { ReactNode } from "react";

type DoDont = "do" | "dont" | "generic";
interface Props {
  type: DoDont;
  children?: ReactNode;
  description?: string;
  image?: string;
}

export function DoDont({ type, children, description, image }: Props) {
  return (
    <div className="do-wrapper">
      {image ?
        <div className="do-container do-image-container">
          <img src={image} width="100%"></img> 
        </div>
        : 
        <div className="do-container">
          {children} 
        </div>
      }
      {(type === "do" || type === "dont") && (
        <div className="do-content" data-positive={type}>
          {type === "do" ? <GoabIcon type="checkmark-circle" /> : <GoabIcon type="close-circle" />}
          <div className="content-label">{type === "do" ? "Do" : "Dont"}</div>
        </div>
      )}
      <div className={`description type-${type}`}><GoabText size="body-s" mt="xs" mb="none">{description}</GoabText></div>
    </div>
  );
}
