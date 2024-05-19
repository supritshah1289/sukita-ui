import { Suspense } from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { store } from "./redux/store";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
  </Provider>
);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./app/App";
// import registerServiceWorker from "./registerServiceWorker";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { store } from "./redux/store";
// import { Provider } from "react-redux";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/*" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </Provider>
// );

// registerServiceWorker();
