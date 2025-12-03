import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "@abgov/web-components";

// Import all page components
import { HomePage } from './routes/home';
import { ComponentsRouter } from "./versioned-router";

import App from './App';

import './App.css';
import {NotificationProvider} from "./contexts/NotificationContext";
import {NotificationAdmin} from "./routes/NotificationAdmin";
import {ErrorBoundary} from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
          <NotificationProvider>
              <Routes>
                  <Route path="/" element={<App />}>
                      <Route path="/" element={<HomePage />} />
                      
                      {/* Component Pages*/}
                      <Route path="/button" element={<ComponentsRouter /> } />
                      <Route path={"notification-admin"} element={<NotificationAdmin/>}/>
                  </Route>
              </Routes>
          </NotificationProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
);