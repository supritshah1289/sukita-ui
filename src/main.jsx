import { Suspense } from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './hooks/AuthProvider';

import App from './app';
import { store } from "./redux/store";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <HelmetProvider>
    <BrowserRouter>
    <AuthProvider>
      <Suspense>
        <App />
      </Suspense>
    </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
  </Provider>
);
