export const basePath =
  process.env.NODE_ENV === "production" ? process.env.PRODUCTION_PROJECT_ROOT : "/";

export const routesPaths = {
  signIn: `${basePath}`,
  signUp: `${basePath}signup`,
  dashboard: `${basePath}dashboard`,
  orders: `${basePath}dashboard/orders`,
  order: `${basePath}dashboard/orders/:id`,
  cars: `${basePath}dashboard/cars`,
  points: `${basePath}dashboard/points`,
};
