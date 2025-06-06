export const orderStatus = {
  IDLE: "idle",
  SHIPPED: "shipped",
  ARIVED: "arrived",
} as const;

export type OrderStatus = (typeof orderStatus)[keyof typeof orderStatus];

export const SHOP_NOW_LIMIT = 20 as const;
export const PRODUCTS_LIMIT = 10 as const;
export const CATEGORIES_LIMIT = 10 as const;
export const USERS_LIMIT = 10 as const;
export const ORDERS_LIMIT = 10 as const;

export enum Role {
  // eslint-disable-next-line no-unused-vars
  ADMIN = 1000,
  // eslint-disable-next-line no-unused-vars
  USER = 2500,
  // eslint-disable-next-line no-unused-vars
  WRITER = 3000,
  // eslint-disable-next-line no-unused-vars
  ORDER_REPORTER = 4000,
}
