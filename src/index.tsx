import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "@abgov/web-components";

// Import all page components
import { HomePage } from './routes/home';
import { ComponentsRouter } from "./versioned-router";

// Tokens Page
import DesignTokensOverviewPage from "./routes/design-tokens/DesignTokens";

// Examples Pages
import ComponentNotFound from "./routes/not-found/NotFound";
import ExamplePageTemplate from "./routes/examples/ExamplePageTemplate";
import ExamplesLayout from "./routes/examples/ExamplesLayout";
import ExamplesOverviewPage from "./routes/examples/ExamplesOverview";
import { LanguageVersionContext, LanguageVersionProvider } from "./contexts/LanguageVersionContext";

// Get Started
import GetStartedOverviewPage from "./routes/get-started/GetStartedOverview";
import GetStartedLayout from "./routes/get-started/GetStartedLayout";

// Foundation
import FoundationsLayout from "./routes/foundations/FoundationsLayout";
import MotionPage from "./routes/foundations/motion";

import App from './App';

import './App.css';
import {NotificationProvider} from "./contexts/NotificationContext";
import {DeviceWidthProvider} from "./contexts/DeviceWidthContext";
import {NotificationAdmin} from "./routes/NotificationAdmin";
import {ErrorBoundary} from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
      <ErrorBoundary>
      <Router>
          <NotificationProvider>
            <DeviceWidthProvider>
              <Routes>
                  <Route path="/" element={<App />}>
                      <Route path="/" element={<HomePage />} />

                      {/* Content Pages*/}
                      <Route path="get-started" element={<GetStartedLayout />}>
                        <Route index element={<GetStartedOverviewPage />} />
                      </Route>
                      {/* Content Pages*/}
                      <Route path="foundations" element={<FoundationsLayout />}>
                        <Route path="/foundations/motion" element={<MotionPage />} />
                      </Route>

                      <Route path="tokens" element={<DesignTokensOverviewPage />} errorElement={<ComponentNotFound />}/>
                      
                      {/* Component Pages*/}
                      <Route path="/button" element={<ComponentsRouter /> } />
                      <Route path={"notification-admin"} element={<NotificationAdmin/>}/>

                      {/* Examples Pages */}
                      <Route path="/examples" element={<ExamplesLayout />}>
                        <Route index element={<ExamplesOverviewPage />} />
                      </Route>
                      <Route path="/examples/:slug" element={<ExamplePageTemplate />} />
                  </Route>
              </Routes>
            </DeviceWidthProvider>
          </NotificationProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);