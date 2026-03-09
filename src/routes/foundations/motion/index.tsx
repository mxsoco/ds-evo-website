import { useContext, useMemo } from "react";
import {
  GoabBlock,
  GoabContainer,
  GoabDivider,
  GoabGrid,
  GoabText
} from "@abgov/react-components";
import { ComponentContent } from "../../../components/component-content/ComponentContent";
import { TokenSnippetx } from "../../../components/token-snippet/TokenSnippet";
import {
  GoabxTable,
  GoabxBadge,
} from "@abgov/react-components/experimental";
import './motion.css';
import { GoabxBadgeType } from "@abgov/ui-components-common";
import { DeviceWidthContext } from "../../../contexts/DeviceWidthContext";

export default function MotionPage() {
  const { isDesktopContent } = useContext(DeviceWidthContext);
  const easeData = useMemo(
    () => [
      {
        name: "Expressive",
        easeType: "cubic-bezier(0, 0, 0.58, 1) = easeOut",
        imageURL: "/images/foundations/motion/expressive.svg",
        description: "Used for expressive content reveal and removal, particularly transitioning page content into view and out of view.",
        copyLink: "goa-motion-curve-expressive",
      },
      {
        name: "Productive",
        easeType: "cubic-bezier(0, 0, 1, 1) = linear",
        imageURL: "/images/foundations/motion/productive.svg",
        description: "Used for small UI component state transition such as a button hover state, progress text, etc.",
        copyLink: "goa-motion-curve-productive",
      },
      {
        name: "Expressive exit",
        easeType: "cubic-bezier(0.42, 0, 1, 1) = easeIn",
        imageURL: "/images/foundations/motion/expressive-exit.svg",
        description: "Used for exit transitions where the element is leaving the screen and should feel quick, unobtrusive, and task-focused.",
        copyLink: "goa-motion-curve-expressive-exit",
      },
      {
        name: "Expressive reveal",
        easeType: "cubic-bezier(0.7, 0, 0.25, 1)",
        imageURL: "/images/foundations/motion/expressive-reveal.svg",
        description: "Used for expressive page loading/ full logo loading",
        copyLink: "goa-motion-curve-expressive-reveal",
      },
      {
        name: "Expressive transform",
        easeType: "cubic-bezier(0.42, 0, 0.58, 1) = easeInandOut",
        imageURL: "/images/foundations/motion/expressive-transform.svg",
        description: "Used for logo loader stage transitions.",
        copyLink: "goa-motion-curve-expressive-transform",
      },
    ],
    []
  );

  const durationData = useMemo(
    () => [
      {
        type: "short-1",
        length: "15ms",
        badgeType: { type: "dawn" as GoabxBadgeType, text: "Workspace" },
        description: "Page transition",
        copyLink: "goa-motion-duration-short-1",
      },
      {
        type: "short-2",
        length: "70ms",
        badgeType: { type: "important" as GoabxBadgeType, text: "Universal" },
        description: "Hover state",
        copyLink: "goa-motion-duration-short-2",
      },
      {
        type: "short-3",
        length: "100ms",
        badgeType: { type: "dawn" as GoabxBadgeType, text: "Workspace" },
        description: "Blanket / Scrim enter",
        copyLink: "goa-motion-duration-short-3",
      },
      {
        type: "short-4",
        length: "180ms",
        badgeType: { type: "dawn" as GoabxBadgeType, text: "Workspace" },
        description: "Side navigation collapse",
        copyLink: "goa-motion-duration-short-4",
      },
      {
        type: "medium-1",
        length: "250ms",
        badgeType: { type: "dawn" as GoabxBadgeType, text: "Workspace" },
        description: "Side navigation expand",
        copyLink: "goa-motion-duration-medium-1",
      },
      {
        type: "medium-2",
        length: "300ms",
        badgeType: { type: "dawn" as GoabxBadgeType, text: "Workspace" },
        description: "-",
        copyLink: "goa-motion-duration-medium-2",
      },
      {
        type: "medium-3",
        length: "350ms",
        badgeType: { type: "dawn" as GoabxBadgeType, text: "Workspace" },
        description: "-",
        copyLink: "goa-motion-duration-medium-3",
      },
      {
        type: "long-1",
        length: "400ms",
        badgeType: { type: "sky" as GoabxBadgeType, text: "Public" },
        description: "Side navigation collapse",
        copyLink: "goa-motion-duration-long-1",
      },
      {
        type: "long-2",
        length: "500ms",
        badgeType: { type: "sky" as GoabxBadgeType, text: "Public" },
        description: "Side navigation expand",
        copyLink: "goa-motion-duration-long-2",
      },
      {
        type: "long-3",
        length: "1000ms",
        badgeType: { type: "sky" as GoabxBadgeType, text: "Public" },
        description: "-",
        copyLink: "goa-motion-duration-long-3",
      },
      {
        type: "long-4",
        length: "20000ms",
        badgeType: { type: "sky" as GoabxBadgeType, text: "Public" },
        description: "Logo loading",
        copyLink: "goa-motion-duration-long-4",
      },
    ],
    []
  );

  const renderDurationDesktop = () => {
    return (
      <GoabxTable>
        <thead>
          <tr>
            <th>Length type</th>
            <th>Value</th>
            <th>Service type</th>
            <th>Usage examples</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {durationData.map(item => (
            <tr key={item.type}>
              <td><code>{item.type}</code></td>
              <td>{item.length}</td>
              <td>
                <GoabxBadge type={item.badgeType.type} content={item.badgeType.text} emphasis="subtle" icon={false} />
              </td>
              <td>{item.description}</td>
              <td><TokenSnippetx code={item.copyLink} /></td>
            </tr>
          ))}
        </tbody>
      </GoabxTable>
    );
  };

  const renderDurationMobile = () => {
    return (
      <GoabGrid minChildWidth="16rem" gap="xs">
        {durationData.map(item => (
          <GoabContainer key={item.type}>
            <GoabBlock width="100%">
              <dl>
                <dd className="dd-style item-name"><code>{item.type}</code></dd>
                <dt>Service type</dt><dd className="dd-style"><GoabxBadge type={item.badgeType.type} content={item.badgeType.text} emphasis="subtle" icon={false} /></dd>
                <dt>Value</dt> <dd className="dd-style">{item.length}</dd>
                <dt>Usage examples</dt> <dd className="dd-style">{item.description}</dd>
              </dl>
              <div style={{ marginLeft: "auto" }}>
                <TokenSnippetx code={item.copyLink} />
              </div>
            </GoabBlock>
          </GoabContainer>
        ))}
      </GoabGrid>
    );
  };

  return (
    <ComponentContent tocCssQuery="h2[id], h3[id]">
      <GoabText size="body-s" mt="none" mb="xs">Style guide</GoabText>
      <GoabText size="heading-xl" mb="m" mt="none">
        Motion
      </GoabText>
      <GoabText size="body-l" mt="none" mb="xl">
        Our motion system defines how interactions feel across government products. Motion provides clarity, reduces cognitive load, and directs attention to what matters.
      </GoabText>

      <GoabDivider mb="2xl" mt="2xl"></GoabDivider>

      <h2 id="overview">Overview</h2>
      <GoabText size="body-m" mt="l" mb="l">
        Use motion when it helps users understand what changed. Keep small interactions quick and subtle. Use slightly longer transitions when content is entering, leaving, or changing section of a page so the change is easier to follow.
      </GoabText>
      <GoabText size="body-m" mt="l" mb="l">
        Motion is designed as a system, combining easing, duration, and transition style to create a clear, consistent experience.
        <ul>
          <li><strong>Easing</strong> defines the feel of the change (how it accelerates and decelerates) so motion reads as natural and intentional.</li>
          <li><strong>Duration</strong> sets the pace so users have enough time to follow what changed, without slowing down their task.</li>
          <li><strong>Transitions</strong> define what changes and how (opacity, transform, or both), helping users understand where content came from and where it went.</li>
        </ul>
      </GoabText>
      <GoabText size="body-m" mt="l" mb="l">
        We currently support one motion scheme: Expressive, shared across both Public and Workspace applications.
      </GoabText>
      <GoabText size="body-m" mt="l" mb="l">
        The key difference lies in duration and how content behave:
        <ul>
          <li><strong>Public-facing services</strong>: Emphasize clarity and guidance by using longer durations. This will make transitions more noticeable and easier to follow.</li>
          <li><strong>Workspace tools (internal-facing)</strong>: Keep service workers efficient by ensuring transitions are subtle and never slow down workflows with short and medium durations.</li>
        </ul>
      </GoabText>
      <GoabText size="body-m" mt="l" mb="2xl">
        While consistency should be maintained within each product, advanced use cases may adjust durations to highlight key moments or reduce friction.
      </GoabText>

      <h2 id="principles">Principles</h2>
      <GoabText size="heading-m" mt="m" mb="m">Purposeful</GoabText>
      <GoabText size="body-m" mt="none" mb="l">
        Motion should always have a reason for being there. It can help people notice what changed, highlight what matters, and give feedback as they move through the experience.
      </GoabText>
      <GoabText size="heading-m" mt="m" mb="m">Natural</GoabText>
      <GoabText size="body-m" mt="none" mb="l">
        Motion should feel familiar. When movement reflects how things behave in the real world, it feels more intuitive and comfortable to follow.
      </GoabText>
      <GoabText size="heading-m" mt="m" mb="m">Smooth</GoabText>
      <GoabText size="body-m" mt="none" mb="2xl">
        Motion should blend into the experience instead of competing with it. A little goes a long way, so it is best to use just enough to support understanding without becoming distracting.
      </GoabText>

      <h2 id="easing">Easing</h2>
      <GoabText size="body-m" mt="l" mb="l">
        Easing controls how motion accelerates and decelerates during a transition. It affects how clear and predictable state changes feel. Use the curves below to keep motion consistent across products:
        <ul>
          <li><strong>expressive easing</strong> is the default for larger page-level transitions</li>
          <li><strong>productive easing</strong> supports small component-level state changes.</li>
        </ul>
      </GoabText>

      <h3 id="curve-type">Types of curves</h3>
      
      {easeData.map(item => (
        <GoabContainer mb="l">
          <GoabBlock maxWidth="100%" width="100%" direction="row" gap="m">
            <GoabBlock maxWidth="100%" width="100%" direction={isDesktopContent ? "row" : "column"} gap="l">
              <div className="motion-card-image card-image" style={{ maxWidth:"120px" }}>
                  <img src={item.imageURL}></img>
              </div>
              <div>
                  <GoabText size="body-m" mt="none" mb="s">
                      <strong>{item.name}</strong>  <br/><code className="token-name">--{item.copyLink}</code>
                  </GoabText>
                  <GoabText size="body-m" mt="m" mb="m">
                      {item.description}
                  </GoabText>
                  <GoabText size="body-s" mt="s" mb="none">
                      {item.easeType}
                  </GoabText>
              </div>
            </GoabBlock>
            <div style={{marginLeft: "auto"}}>
              <TokenSnippetx code={item.copyLink}/>
            </div>
          </GoabBlock>
        </GoabContainer>
      ))}

      <h3 id="usage-guidelines">Usage guidelines</h3>
      <GoabText size="heading-s" mt="l" mb="l">
        Ease in
      </GoabText>
      <GoabText size="body-m" mt="l" mb="l">
        <ul>
          <li>Default for content leaving the screen or transitioning out of view.</li>
          <li>Starts subtly and accelerates toward the end so elements clear quickly after an action.</li>
          <li>Use for modal exit, drawer dismissal, collapsing panels, and content removal.</li>
        </ul>
      </GoabText>
      
      <GoabText size="heading-s" mt="l" mb="l">
        Ease out
      </GoabText>
      <GoabText size="body-m" mt="l" mb="l">
        <ul>
          <li>Default for content entering the screen or transitioning into view.</li>
          <li>Starts quickly and slows at the end so motion settles gently and feels easier to follow.</li>
          <li>Use for page-level transitions, modal entry, opening drawers, and navigation panel expansion.</li>
        </ul>
      </GoabText>
    
      <h2 id="duration">Duration</h2>
      <GoabText size="body-m" mt="l" mb="l">
        Duration is how long a transition takes, setting the pace of the interface and helps users understand what changed. They are tuned differently for Public and Workspace contexts:
        <ul>
          <li><strong>Short (15-180ms)</strong>: Micro-interactions and small state UI transitions in workspace tools.</li>
          <li><strong>Medium (250-350ms)</strong>: Component transitions, such as side navigation, drawer panels, and other mid-level changes in workspace tools.</li>
          <li><strong>Long (400ms+)</strong>: Page-level transitions and large content changes in public-facing applications.</li>
        </ul>
      </GoabText>
      
      <h3 id="duration-lengths">Duration lengths</h3>
      {isDesktopContent ? renderDurationDesktop() : renderDurationMobile()}

      <h3 id="duration-lengths">Page transitions</h3>
      {isDesktopContent ? (
        <GoabxTable>
          <thead>
            <tr>
              <th>Transition name</th>
              <th>Properties changed</th>
              <th>Duration</th>
              <th>Curve</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td><code>page-fade</code></td>
                <td>opacity</td>
                <td>short-1</td>
                <td>expressive</td>
                <td><TokenSnippetx code="goa-transition-page-fade" /></td>
              </tr>
              <tr>
                <td><code>content-move-fade</code></td>
                <td>opacity, <br/>transform</td>
                <td>short-2</td>
                <td>expressive</td>
                <td><TokenSnippetx code="goa-transition-content-move-fade" /></td>
              </tr>
          </tbody>
        </GoabxTable>
      ) : (
        <GoabGrid minChildWidth="16rem" gap="xs">
          <GoabContainer>
            <GoabBlock width="100%">
              <dl>
                <dd className="dd-style item-name"><code>page-fade</code></dd>
                <dt>Properties changed</dt><dd className="dd-style">opacity</dd>
                <dt>Duration</dt> <dd className="dd-style">short-1</dd>
                <dt>Curve</dt> <dd className="dd-style">expressive</dd>
              </dl>
              <div style={{ marginLeft: "auto" }}>
                <TokenSnippetx code="goa-transition-page-fade" />
              </div>
            </GoabBlock>
          </GoabContainer>
          <GoabContainer>
            <GoabBlock width="100%">
              <dl>
                <div>
                </div><dd className="dd-style item-name"><code>content-move-fade</code></dd>
                <dt>Properties changed</dt><dd className="dd-style">opacity, transform</dd>
                <dt>Duration</dt> <dd className="dd-style">short-2</dd>
                <dt>Curve</dt> <dd className="dd-style">expressive</dd>
              </dl>
              <div style={{ marginLeft: "auto" }}>
                <TokenSnippetx code="goa-transition-content-move-fade" />
              </div>
            </GoabBlock>
          </GoabContainer>
        </GoabGrid>
      )}

      <h2 id="accessibility">Accessibility</h2>
      <GoabText size="body-m" mt="l" mb="2xl">
        While animations can make a product eye-catching and interesting, it has the potential to cause real issues for users. Some people might feel dizzy or nauseous when confronted with certain types of motion. Take the following accessibility guidelines into account when working with motion to provide a great user experience:
        <ul>
          <li><strong>Minimize flashing</strong>: Web pages should not contain anything that flashes more than three times in any one-second period, as it can trigger epileptic physical reactions especially for users who have vestibular disorders. If you do need to include flashing content, ensure that it is below the general flash and red flash thresholds.</li>
          <li><strong>Design alternatives for reduced motion</strong>: Users should have control on how they view animations. They should have the ability to disable animations unless they are essential to the functionality or information being conveyed. Use the <code>prefers-reduced-motion</code> CSS media query to check if someone has asked for less animation. If they have, make sure that your product respects those settings.</li>
        </ul>
      </GoabText>
    </ComponentContent>
  );
}
