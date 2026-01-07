import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useState, useMemo } from "react";
import { GoabBlock, GoabSkeleton, GoabLink, GoabPageBlock, GoabDivider } from "@abgov/react-components";
import {SupportInfo} from "../../components/support-info/SupportInfo";
import { fetchExampleMetadataFromProject } from "../../utils";
import { ExampleHeader } from "../../components/example-header/ExampleHeader";


export default function ExamplePageTemplate() {
  const { slug } = useParams(); // assumes route like /examples/:slug
  const [example, setExample] = useState<any>(null);

  // Dynamic import based on slug
  const ExampleComponent = useMemo(() => {
    if (!slug) return () => <div>Invalid slug</div>;
    return lazy(() =>
      import(`../../examples/${slug}.tsx`).catch(() =>
        import("../../routes/examples/FallbackExample")
      )
    );
  }, [slug]);
  console.log("Loaded example metadata:", example);
  useEffect(() => {
    if (!slug) return;
    console.log("Looking for slug:", slug);
    fetchExampleMetadataFromProject().then(data => {
      console.log("Fetched metadata:", data);
      const match = data.find((item: any) => item.slug === slug);
      console.log("Matched example:", match);
      setExample(match);
    }).catch(error => {
      console.error("Error fetching metadata:", error);
    });
  }, [slug]);
  return (
    <main
      className="main">
      <GoabPageBlock width="1200px">
        <GoabBlock mb="l" mt="xl">
          <GoabLink leadingIcon="chevron-back" mt="l" mb={"none"}>
            <Link to="/examples">Back to Examples</Link>
          </GoabLink>
        </GoabBlock>
        {!example ? (
          <GoabBlock gap="none" direction="column" mb="xl" mt="none">
            <GoabSkeleton type="header" size="4" />
            <GoabBlock gap="none" direction="column">
              <GoabSkeleton type="text-small" size="4" />
              <GoabSkeleton type="text-small" size="4" />
            </GoabBlock>
          </GoabBlock>
        ) : (
          <ExampleHeader
            name={example.name}
            description={example.description}
            githubLink={example.url ?? ""}
            figmaLink={example.designComponentFigmaUrl}
            tags={example.tags}
          />
        )}

        <Suspense fallback={<GoabSkeleton type="card" size="3" />}>
          <ExampleComponent />
        </Suspense>
        <GoabDivider mt="3xl"></GoabDivider>
        <SupportInfo />
      </GoabPageBlock>
    </main>
  );
}