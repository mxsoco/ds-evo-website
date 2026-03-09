import { GoabSpacer } from "@abgov/react-components";
import { GoabxCallout } from "@abgov/react-components/experimental";
import "./SupportInfo.css";

export const SupportInfo = (props: { hidden?: boolean }) => {
  if (props.hidden) {
    return null;
  }
  return (
    <>
      <div className="support-info">
        <GoabxCallout
          type="information"
          heading="Need help building a government service?"
          size="medium"
        >
          Join design system drop in hours to get feedback on your service, propose new components or patterns, suggest changes
          to existing resources, ask questions, and give feedback to the design system. These sessions are for Government of Alberta product teams.
          <GoabSpacer vSpacing="m"></GoabSpacer>
          <a href="https://outlook.office365.com/book/BKGDesignsystemdropinhours@abgov.onmicrosoft.com/" target="_blank">
            Book time in drop in hours
          </a>{" "}
        </GoabxCallout>
      </div>
    </>
  );
};
