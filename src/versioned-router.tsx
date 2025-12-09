import { Route, Routes, useParams } from "react-router-dom";
import ComponentsPage from "./routes/components/Components";
import ComponentNotFoundPage from "./routes/not-found/NotFound";
import ButtonPage from "./routes/components/Button";
import {
  VERSIONED_REACT_URL_SEGMENT,
} from "./components/version-language-switcher/version-language-constants";

const ComponentRoute: React.FC<{
  versionedPaths: Record<string, React.ReactElement>;
}> = ({ versionedPaths }: { versionedPaths: Record<string, React.ReactElement> }) => {
  const { component } = useParams<{ component: string }>();
  return versionedPaths[component as keyof typeof versionedPaths] || <ComponentNotFoundPage />;
};

const VersionedComponentRoute: React.FC<{
  versionedPaths: Record<string, React.ReactElement>;
}> = ({ versionedPaths }: { versionedPaths: Record<string, React.ReactElement> }) => {
  const { version, component } = useParams<{ version: string; component: string }>();
  if (!version || !component) {
    return <ComponentNotFoundPage />;
  }
  const supportedVersions = [VERSIONED_REACT_URL_SEGMENT];
  if (!supportedVersions.includes(version)) {
    return <ComponentNotFoundPage />;
  }

  const getReactPage = (componentName: keyof typeof versionedPaths) => {
    return versionedPaths[componentName] || <ComponentNotFoundPage />;
  };

  return getReactPage(component as keyof typeof versionedPaths);
};

export const ComponentsRouter = () => {
  const componentPaths: Record<string, React.ReactElement> = {
    "button": <ButtonPage />,
  };

  return (
    <Routes>
      <Route path="/" element={<ComponentsPage />} errorElement={<ComponentNotFoundPage />}>
        {/* Non-versioned paths components */}
        <Route index element={<ButtonPage />} />
        <Route path=":component" element={<ComponentRoute versionedPaths={componentPaths} />} />

        {/* Versioned paths components */}
        <Route path=":version/:component" element={<VersionedComponentRoute versionedPaths={componentPaths}/>} />

      </Route>
    </Routes>
  );
};
