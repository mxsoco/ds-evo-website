import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "@abgov/web-components";

// Import all page components
import { HomePage } from './routes/home';
import { ComponentsRouter } from "./versioned-router";

// Tokens Page
import DesignTokensOverviewPage from "./routes/design-tokens/index";
import DesignTokenLayout from "./routes/design-tokens/DesignTokenLayout";
import BorderWidthPage from "./routes/design-tokens/border-width/BorderWidth";

// Examples Pages
import ExamplePageTemplate from "./routes/examples/ExamplePageTemplate";
import ComponentNotFound from "./routes/not-found/NotFound";
import { LanguageVersionContext, LanguageVersionProvider } from "./contexts/LanguageVersionContext";
import ExamplesLayout from "./routes/examples/ExamplesLayout";
import ExamplesOverviewPage from "./routes/examples/ExamplesOverview";

// Get Started
import GetStartedOverviewPage from "./routes/get-started/GetStartedOverview";
import GetStartedLayout from "./routes/get-started/GetStartedLayout";

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

                      <Route path="tokens" element={<DesignTokenLayout />} errorElement={<ComponentNotFound />}>
                        <Route index element={<DesignTokensOverviewPage />}/>
                        <Route path={"border-width"} element={<BorderWidthPage/>}/>
                      </Route>
                      
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
  </React.StrictMode>,
);