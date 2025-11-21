import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "@abgov/web-components";

// Import all page components
import { HomePage } from './routes/home';

import App from './App';

import './App.css';
import {NotificationProvider} from "./contexts/NotificationContext";
import {NotificationAdmin} from "./routes/NotificationAdmin";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Router>
        <NotificationProvider>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path={"notification-admin"} element={<NotificationAdmin/>}/>
                </Route>
            </Routes>
        </NotificationProvider>
    </Router>
  </React.StrictMode>,
);