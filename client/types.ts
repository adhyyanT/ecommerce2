export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type Product = {
  p_id: number;
  p_title: string;
  p_image: string;
  p_price: number;
  p_desc: string;
};

export type SingleProductType = {
  id: number;
  title: string;
  image: string;
  price: number;
  desc: string;
};
export type MainNavItem = NavItem;

export type CartType = {
  product_id: number;
  count: number;
  title: string;
  desc: string;
  price: number;
  image: string;
};
export type AllOrderType = {
  order_id: number;
  product_id: number;
  createdAt: string;
};

export interface ErrorType {
  errorCode?: number;
}
export interface OrderDetailsType extends ErrorType {
  item_id: number;
  count: number;
  price: number;
  image: string;
  title: string;
}
