const basePath = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_PROJECT_ROOT : "/";

export const routesPaths = {
  signIn: `${basePath}`,
  signUp: `${basePath}signup`,
  home: `${basePath}home`,
};
