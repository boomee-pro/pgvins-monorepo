declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      EXPRESS_PORT: string;
      CLIENT_URL: string;
      DASHBOARD_URL: string;
      SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      FACEBOOK_ID: string;
      FACEBOOK_SECRET: string;
    }
  }
}

export {};
