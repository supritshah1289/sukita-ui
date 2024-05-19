// export const API_BASE_URL = "http://localhost:8080";
// export const API_BASE_URL = "https://localhost:8443";
export const API_BASE_URL = "https://supritshah.com";
export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";
// export const OAUTH2_REDIRECT_URI =
//   "https://lekha-ui.vercel.app/oauth2/redirect";

// https://lekha-ui.vercel.app/

export const GOOGLE_AUTH_URL =
  // eslint-disable-next-line prefer-template
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  // eslint-disable-next-line prefer-template
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  // eslint-disable-next-line prefer-template
  API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
