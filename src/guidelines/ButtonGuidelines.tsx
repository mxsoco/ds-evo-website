import { GoabBlock, GoabContainer, GoabDivider, GoabGrid, GoabText } from "@abgov/react-components";
import { DoDont } from "../components/do-dont/DoDont";
import { Related } from "../components/related-card/RelatedCard";
import './guidelines.css';

const minGridWidth = "36ch";

interface Style {
  typeID: string;
  label: string;
}

const styles: Style[] = [
    {
      typeID: "1",
      label: "Primary",
    },
    {
      typeID: "2",
      label: "Secondary",
    },
    {
      typeID: "3",
      label: "Tertiary",
    },
    {
      typeID: "4",
      label: "Text",
    },
    {
      typeID: "5",
      label: "Start",
    },
    {
      typeID: "6",
      label: "Destructive",
    },
];

const states: Style[] = [
    {
      typeID: "1",
      label: "Default",
    },
    {
      typeID: "2",
      label: "Hover",
    },
    {
      typeID: "3",
      label: "Focus and Active",
    },
    {
      typeID: "4",
      label: "Disabled",
    },
];

const icons: Style[] = [
    {
      typeID: "1",
      label: "Leading icon",
    },
    {
      typeID: "2",
      label: "Trailing icon",
    }
];

export default function ButtonGuidelines() {
    return (
        <div className="wrapper">
            <h2 id="types">Types</h2>
            <GoabContainer mt="none" mb="none" padding="compact" >
                <div style={{ textAlign: "center" }}>
                    <img src="./images/button/types-anatomy.svg" style={{ width:"100%" }}></img>
                </div>
            </GoabContainer>
            <GoabText size="body-s" mt="s" mb="l">There are 6 types of buttons:</GoabText>

            <div className="anatomy-listing">
            {styles.map((style, index) => (
                <div className="anatomy-listing-single" key={index}>
                    <div className="anatomy-listing-number">
                        {style.typeID}
                    </div>
                    <div className="anatomy-listing-label">
                        <GoabText size="body-s" mt="none" mb="none">{style.label}</GoabText>
                    </div>
                </div>
            ))}
            </div>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use a primary button for the primary action on the page. For citizen facing applications there should generally only be one primary button on a page."
                    image="./images/button/button-do-primary.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not use two primary buttons."
                    image="./images/button/button-dont-primary.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use secondary buttons for less important actions on a page. A secondary action is often paired with a primary action."
                    image="./images/button/button-do-secondary.svg"
                >
                </DoDont>
                <DoDont
                    type="do"
                    description="Use tertiary buttons for links that should function like a button, such as “edit” or “cancel” in applications. It is okay to use more than one tertiary button on a page."
                    image="./images/button/button-do-tertiary.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use a start button for the main call to action on your services start page. This is the “front door” to your service on Alberta.ca."
                    image="./images/do-placeholder-wide.svg"   
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use a destructive button to indicate the final destructive action to the user."
                    image="./images/button/button-do-destructive.svg"   
                >
                </DoDont>
                <DoDont
                    type="do"
                    description="Use descriptive language in both the content and the button text itself in addition to the destructive button type to inform the user of the resulting action. "
                    image="./images/button/button-do-destructive-descriptive.svg"   
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="dont"
                    description="Avoid using a destructive button on the page when there is a secondary confirmation of the action that follows."
                    image="./images/dont-placeholder-wide.svg"   
                >
                </DoDont>
            </GoabGrid>

            <GoabDivider mt="3xl" mb="3xl"></GoabDivider>

            <h2 id="states">States</h2>
            <GoabContainer mt="none" mb="none" padding="compact" >
                <img src="./images/button/states-anatomy.svg" style={{ width:"100%" }}></img>
            </GoabContainer>
            <GoabText size="body-s" mt="s" mb="l">There are 4 main states for the buttons:</GoabText>

            <div className="anatomy-listing">
            {states.map((states, index) => (
                <div className="anatomy-listing-single" key={index}>
                    <div className="anatomy-listing-number">
                        {states.typeID}
                    </div>
                    <div className="anatomy-listing-label">
                        <GoabText size="body-s" mt="none" mb="none">{states.label}</GoabText>
                    </div>
                </div>
            ))}
            </div>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Remove an option if it is unavailable. Show actions that are only relevant and useful to the user at a given time."
                    image="./images/do-placeholder.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not show a disabled option to the user unless research shows that it makes the interface easier to understand."
                    image="./images/dont-placeholder.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use error handling to provide clear feedback about any missing fields or input errors when the user tries to submit the form."
                    image="./images/do-placeholder.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not disable a button on a form when a user has errors. Disabled states can confuse users if they do not know how to enable them."
                    image="./images/dont-placeholder.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabDivider mt="3xl" mb="3xl"></GoabDivider>

            <h2 id="compact">Compact buttons</h2>
            <GoabText size="body-s" mt="none" mb="l">A smaller variant of the button to be used when space is limited.</GoabText>
            <GoabContainer mt="none" mb="none" padding="compact" >
                <img src="./images/button/compact-anatomy.svg" style={{ width:"100%" }}></img>
            </GoabContainer>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl" gap="l">
                <DoDont
                    type="do"
                    description="Use the default button size for most situations."
                    image="./images/do-placeholder-wide.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use the compact button size when using buttons in compact scenarios such as within a table."
                    image="./images/button/button-do-compact-table.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not use different button sizes in the same area as a way to emphasize hierarchy."
                    image="./images/button/button-dont-compact-different-sizes.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabDivider mt="3xl" mb="3xl"></GoabDivider>

            <h2 id="icons">Leading and trailing icons</h2>
            <GoabText size="body-s" mt="none" mb="l">Using an icon in a button visually indicates what action the user can take or expect by clicking the button, making it easier for the user to scan the content of a page. Icons can help to provide a common visual language across language gaps.</GoabText>
            <GoabContainer mt="none" padding="compact" mb="l">
                <img src="./images/button/trailing-leading-icon-anatomy.svg" style={{ width:"100%" }}></img>
            </GoabContainer>
            
            <div className="anatomy-listing">
            {icons.map((icons, index) => (
                <div className="anatomy-listing-single" key={index}>
                    <div className="anatomy-listing-number">
                        {icons.typeID}
                    </div>
                    <div className="anatomy-listing-label">
                        <GoabText size="body-s" mt="none" mb="none">{icons.label}</GoabText>
                    </div>
                </div>
            ))}
            </div>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use a leading icon for back buttons, search, edit, add, and delete."
                    image="./images/button/button-do-leading-icon.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not use just the icon without a text label for public facing applications. Be cautious of icon only buttons for internal facing applications."
                    image="./images/dont-placeholder.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use a trailing icon when linking to a location outside of the current application or website or as a navigation button (next, forward)."
                    image="./images/button/button-do-trailing-icon.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not use trailing icons to communicate additional information for the button. Use a leading icon instead."
                    image="./images/dont-placeholder.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use icon buttons for actions on a page with a clear visual association to the action such as “Add item”. See example, {name of example}."
                    image="./images/button/button-do-leading-action.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not use icon buttons for actions that do not have a clear visual association to the intended outcome."
                    image="./images/button/button-dont-leading-action.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabDivider mt="3xl" mb="3xl"></GoabDivider>

            <h2 id="positioning">Positioning</h2>

            <GoabGrid minChildWidth={minGridWidth} mt="xl"gap="l">
                <DoDont
                    type="do"
                    description="Use a leading icon for back buttons, search, edit, add, and delete."
                    image="./images/button/button-do-positioning.svg"
                >
                </DoDont>
                <DoDont
                    type="do"
                    description="Do not use just the icon without a text label for public facing applications. Be cautious of icon only buttons for internal facing applications."
                    image="./images/button/button-do-positioning-compact.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabGrid minChildWidth={minGridWidth} mt="2xl"gap="l">
                <DoDont
                    type="do"
                    description="Use icon buttons for actions on a page with a clear visual association to the action such as “Add item”. See example, {name of example}."
                    image="./images/button/button-do-positioning-table.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not use trailing icons to communicate additional information for the button. Use a leading icon instead."
                    image="./images/button/button-dont-positioning-grouping.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabDivider mt="3xl" mb="3xl"></GoabDivider>

            <h2 id="content">Content</h2>

            <GoabGrid minChildWidth={minGridWidth} mt="xl"gap="l">
                <DoDont
                    type="do"
                    description="Use a trailing icon when linking to a location outside of the current application or website or as a navigation button (next, forward)."
                    image="./images/button/button-do-content.svg"
                >
                </DoDont>
                <DoDont
                    type="dont"
                    description="Do not use trailing icons to communicate additional information for the button. Use a leading icon instead."
                    image="./images/button/button-dont-content.svg"
                >
                </DoDont>
            </GoabGrid>

            <GoabDivider mt="2xl" mb="2xl"></GoabDivider>

            <h2 id="related">Related</h2>

            <GoabGrid gap="l" minChildWidth="320px">
                <Related
                    title="Icon button"
                    type="components"
                    url="#"
                    content="An icon-only button for common or repetitive actions."
                />
                
                <Related
                    title="Button group"
                    type="components"
                    url="#"
                    content="Display multiple related actions stacked or in a horizontal row to help with arrangement and spacing."
                />

                <Related
                    title="Show a label on an icon only button"
                    type="examples"
                    url="#"
                    content="Reveal a tooltip with a label when the user hovers over an icon-only button."
                />
                
                <Related
                    title="Back to top button"
                    type="components"
                    githubURL="https://alberta.ca"
                />
            </GoabGrid>
        </div>
    )
}