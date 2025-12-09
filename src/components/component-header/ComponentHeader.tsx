import { GoabBadge, GoabBlock, GoabText } from "@abgov/react-components";
import "./ComponentHeader.css";

export enum Category {
  CONTENT_AND_LAYOUT = "Content and layout",
  FEEDBACK_AND_ALERTS = "Feedback and alerts",
  STRUCTURE_AND_NAVIGATION = "Structure and navigation",
  INPUTS_AND_ACTIONS = "Inputs and actions",
  UTILITIES = "Utilities",
}

interface Props {
  category?: Category;
  name: string;
  description?: string;
  relatedComponents?: { link: string; name: string }[];
}

export const ComponentHeader: React.FC<Props> = (props) => {

  return (

    <div className="component-header" >
      <GoabBadge type="default" emphasis="subtle" content={props.category} />

      <GoabBlock gap="2xl" alignment="center">
        <GoabText size="heading-xl" mt="s" mb="xs">
          {props.name}
        </GoabText>
      </GoabBlock>

      <GoabText size="body-l" mt="none">
        {props.description}
      </GoabText>


    </div>
  );
};
