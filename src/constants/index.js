// export const API_BASE_URL = "http://localhost:8080";
// export const API_BASE_URL = "https://localhost:8443";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;


export const OAUTH2_REDIRECT_URI = import.meta.env.VITE_OAUTH_REDIRECT_URI;
// export const OAUTH2_REDIRECT_URI =
//   "https://lekha-ui.vercel.app/oauth2/redirect";

// https://lekha-ui.vercel.app/

export const REDIRECT_URI=import.meta.env.VITE_GOOGLE_REDIRECT_AUTH_URI

export const GOOGLE_AUTH_URL =
  // eslint-disable-next-line prefer-template
  API_BASE_URL + REDIRECT_URI + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  // eslint-disable-next-line prefer-template
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  // eslint-disable-next-line prefer-template
  API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
