import "./CardLite.css";
import { ReactNode } from "react";
import { GoabText } from "@abgov/react-components";

export interface Props {
  title: string;
  description: string;
  imageURL: string;
  linkTo: string;
}

export function CardLite(props: Props) {
  return (
    <a href={props.linkTo} className="card-lite">
      <div>
        <div className="card-image">
          <img src={props.imageURL}></img>
        </div>
        <GoabText size="heading-m" mt="l" mb="m">
          <u>{props.title}</u>
        </GoabText>
        <GoabText size="body-m" mt="none" mb="xs">
          <div className="card-description">{props.description}</div>
        </GoabText>
      </div>
    </a>
  );
}

export default CardLite;
