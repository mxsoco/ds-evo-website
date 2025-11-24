import { useState, useEffect } from "react";
import {
  GoabText,
  GoabPageBlock,
  GoabBlock,
  GoabGrid,
  GoabLink,
  GoabOneColumnLayout,
} from "@abgov/react-components";
import CardLite from "../components/card-lite/CardLite";
import { useMenu } from "../contexts/MenuContext";
import { PageHeader } from "../components/PageHeader";
import "./index.css";

export function HomePage() {

  const { isMobile } = useMenu();
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const tablet = width < 1200;
      setIsTablet(tablet);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      <div className="ds-hero-banner">
        <PageHeader title="Design system" />

        {isMobile ? (
          <div className="ds-homepage-header-sm">
            <div>
              <h1>Introducing the New Design System</h1>
              <GoabText size="body-m" mt="l" mb="none">Build on the research and experience of other service teams by using the DDD components and templates.</GoabText>
            </div>
          </div>
        ) : (
          <>
          <GoabPageBlock width="1200px">
            <GoabBlock
              gap="2xl"
              direction={isTablet ? "column" : "row"}
              alignment={isTablet ? "left" : "center"}
            >
              <div className="card-image" style={{ flex: 1 }}>
                <img src="/images/home/hero-banner-graphic.svg"></img>
              </div>
              <div style={{ flex: 2 }}>
                <h1>Introducing the New Design System</h1>
                <GoabText size="body-m" mt="xl" mb="none">Build on the research and experience of other service teams by using the DDD components and templates.</GoabText>
              </div>
            </GoabBlock>
          </GoabPageBlock>
          </>
        )}
      </div>
      
      <GoabOneColumnLayout>
        <section className="ds-main-content">
          <GoabPageBlock width="1200px">
            <GoabBlock
              gap="2xl"
              mt={isTablet ? "3xl" : "4xl"}
              mb={isTablet ? "3xl" : "4xl"}
              direction={isTablet ? "column" : "row"}
              alignment={isTablet ? "left" : "center"}
            >
              <div style={{ flex: 1 }}>
                <GoabText size="heading-xl" mt="none">Build your service using the design system</GoabText>
                <GoabText size="body-m">Our accessible, brand-compliant components and templates help you launch faster while staying aligned with the current standard.</GoabText>
                <GoabLink trailingIcon="chevron-forward">
                  <a href="#url">
                    Start using the design system
                  </a>
                </GoabLink>
              </div>
              <div
                className="card-image"
                style={isTablet ? { flex: 1 } :{ flex: 2 }}
              >
                <img src="/images/home/splash-reel.png"></img>
              </div>
            </GoabBlock>

            <GoabText size="heading-xl">Select your service pattern</GoabText>

            <GoabGrid
              gap="xl"
              mt="xl"
              mb={isTablet ? "3xl" : "4xl"}
              alignment="center"
              minChildWidth="210px"
            >
              <CardLite
                imageURL="/images/home/public-form-thumb.png"
                title="Public form"
                description="A pattern optimized for clarity and error prevention for public-facing applications. It includes templates for page types: Start, Task list, Question, Review, and Result."
                linkTo="/public-form"
              />
              <CardLite
                imageURL="/images/home/workspace-thumb.png"
                title="Workspace"
                description="A pattern optimized for efficiently managing cases, records, and tasks. It includes layout, multiple data views, detail views, drawers, modals and notifications."
                linkTo="/workspace"
              />
            </GoabGrid>

            <GoabText size="heading-xl">Research tools</GoabText>
            <GoabText size="body-m">Conduct research with your users to validate your design decisions. Test your assumptions, gather insights, and ensure your service meets real user needs.</GoabText>

            <GoabGrid
              gap="xl"
              mt="xl"
              mb={isTablet ? "3xl" : "4xl"}
              alignment="center"
              minChildWidth="210px"
            >
              <CardLite
                imageURL="/images/home/primary-users-thumb.png"
                title="Card sort"
                description="Understand how users naturally group and label information in your service. Does your team share a mental model with your users?"
                linkTo="/card-sort"
              />
              <CardLite
                imageURL="/images/home/storyboard-thumb.png"
                title="Test form content"
                description="Turn your form designs into coded prototypes and test them with users rapidly. Are you asking the right questions to collect the information you need?"
                linkTo="/test-form"
              />
              <CardLite
                imageURL="/images/home/main-pages-thumb.png"
                title="Time on task"
                description="Measure how long it takes users to complete key tasks in your service. Are your users working efficiently or struggling?"
                linkTo="/time-on-task"
              />
            </GoabGrid>

            <GoabText size="heading-xl">Understand your service</GoabText>
            <GoabText size="body-m">Complete activities to better understand the service you are designing for. Identify common users, pages, and service types within your digital service.</GoabText>

            <GoabGrid
              gap="xl"
              mt="xl"
              mb={isTablet ? "3xl" : "4xl"}
              alignment="center"
              minChildWidth="210px"
            >
              <CardLite
                imageURL="/images/home/primary-users-thumb.png"
                title="Identify the primary users and their main tasks"
                description="Share the primary users and their main tasks in your digital service. Do you know your users?"
                linkTo="/primary-users"
              />
              <CardLite
                imageURL="/images/home/storyboard-thumb.png"
                title="Identify the main pages"
                description="Share the most used pages from your digital service. What page or pages define your service?"
                linkTo="/storyboard"
              />
              <CardLite
                imageURL="/images/home/main-pages-thumb.png"
                title="Create a short storyboard"
                description="You can only use 3 pages from your product to make a storyboard of your digital service, what do you show?"
                linkTo="/main-pages"
              />
            </GoabGrid>
          </GoabPageBlock>
        </section>
      </GoabOneColumnLayout>
    </>
  );
}