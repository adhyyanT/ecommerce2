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
  title: number;
  desc: number;
  price: number;
  image: number;
};
