export type RegisterBody = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type AddtoCartParams = {
  productId: number;
};

export type RemoveFromCartParams = {
  cartId: number;
};
export type OrderDetailParams = {
  orderId: number;
};

export type StripeSessionType = {
  session_id: string;
  success?: string;
};

export type PaginationType = {
  page?: number;
  size?: number;
};

export type SearchBody = {
  search: string;
};
