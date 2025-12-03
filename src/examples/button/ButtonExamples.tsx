import { AskAUserForAnAddress } from "../ask-a-user-for-an-address";
import { ConfirmADestructiveAction } from "../confirm-a-destructive-action";
import { DisabledButtonWithARequiredField } from "../disabled-button-with-a-required-field";
import { CompactButtonsInATable } from "../compact-buttons-in-a-table";
import { SandboxHeader } from "../../components/sandbox/sandbox-header/sandboxHeader";

export const ButtonExamples = () => {

  return <>
    {/*Button Example 1*/}
    <SandboxHeader
      exampleTitle="Ask a user for an address"
      figmaExample="https://www.figma.com/design/aIRjvBzpIUH0GbkffjbL04/%E2%9D%96-Patterns-library-%7C-DDD?node-id=6304-43250&t=X0IQW5flDDaj8Vyg-4">
    </SandboxHeader>
    <AskAUserForAnAddress />

    {/*Button example 2*/}
    <SandboxHeader
      exampleTitle="Confirm a destructive action"
      figmaExample="https://www.figma.com/design/aIRjvBzpIUH0GbkffjbL04/%E2%9D%96-Patterns-library-%7C-DDD?node-id=6307-43038&t=X0IQW5flDDaj8Vyg-4">
    </SandboxHeader>
    <ConfirmADestructiveAction />

    {/*Button example 3*/}
    <SandboxHeader
      exampleTitle="Disabled button with a required field"
      figmaExample="">
    </SandboxHeader>
    <DisabledButtonWithARequiredField />

    {/*Button example 4*/}
    <SandboxHeader
      exampleTitle="Compact buttons in a table"
      figmaExample="">
    </SandboxHeader>
    <CompactButtonsInATable />
  </>;
};
