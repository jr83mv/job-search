import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Sentry from "@sentry/react";
import './i18n'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
Sentry.init({
  dsn: "https://f46fdab67bcd4da3b4893e1f935644ac@o4505470554603520.ingest.sentry.io/4505471056347136",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", ],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0 
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
