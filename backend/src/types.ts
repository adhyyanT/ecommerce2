type RegisterBody = {
  username: string;
  name: string;
  email: string;
  password: string;
};

type LoginBody = {
  username: string;
  password: string;
};

type AddtoCartParams = {
  productId: number;
};

type RemoveFromCartParams = {
  cartId: number;
};
