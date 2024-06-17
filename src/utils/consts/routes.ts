export const basePath =
  process.env.NODE_ENV === "production" ? process.env.PRODUCTION_PROJECT_ROOT : "/";

export const routesPaths = {
  signIn: `${basePath}`,
  signUp: `${basePath}signup`,
  dashboard: `${basePath}dashboard`,
  orders: `${basePath}dashboard/orders`,
  cars: `${basePath}dashboard/cars`,
  car: `${basePath}dashboard/car`,
  carId: `${basePath}dashboard/car/:carId`,
  points: `${basePath}dashboard/points`,
};
