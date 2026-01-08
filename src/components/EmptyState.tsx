import React from "react";
import { GoabBlock, GoabButton, GoabText } from "@abgov/react-components";
import emptyStateIllustration from "../assets/empty-state-illustration.svg";

interface EmptyStateProps {
    /** Main heading text */
    heading?: string;
    /** Secondary text below the heading */
    subline?: string;
    /** Button text (if not provided, no button is shown) */
    buttonText?: string;
    /** Click handler for the button */
    onButtonClick?: () => void;
    /** Custom illustration URL (defaults to standard empty state illustration) */
    illustration?: string;
}

/**
 * EmptyState - Displayed when a list/table has no results to show.
 *
 * Usage:
 *   <EmptyState
 *     heading="No results found"
 *     subline="Try adjusting your search or filters."
 *     buttonText="Clear filters"
 *     onButtonClick={handleClearFilters}
 *   />
 */
export function EmptyState({
    heading = "No results found",
    subline = "Try adjusting your search or filters.",
    buttonText = "Clear filters",
    onButtonClick,
    illustration = emptyStateIllustration,
}: EmptyStateProps) {
    return (
        <GoabBlock direction="column" alignment="center" mt={"2xl"} mb={"xl"} width="100%">
            <img
                src={illustration}
                alt=""
                className="cases-empty-state__illustration"
            />
            <GoabText size="body-m" mt="s" mb="none">
                <strong>{heading}</strong>{" "}
            </GoabText>
            <GoabText size="body-m" mt="none">
                {subline}{" "}
            </GoabText>
            <GoabButton type="tertiary" size="compact" onClick={onButtonClick} ml={"s"}>
                {buttonText}
            </GoabButton>
        </GoabBlock>
    );
}