export type RegisterBody = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
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
  search?: string;
  filters?: string;
};

export type SearchBody = {
  search: string;
  filters?: string[];
};

export type ProductIdParams = {
  productId: number;
};
export type emailType = {
  products: EmailProductType[];
  emailId: string;
  total: number;
};
export type EmailProductType = { title: string; price: number; count: number };
