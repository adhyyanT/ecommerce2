import { getCart } from '@/api/cartApi';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: 0,
};

interface CartType {
  count: string;
}

export const fetchCart = createAsyncThunk('cart/getCart', async () => {
  const res: CartType[] = await getCart();
  let count: number = 0;
  res.map((prod) => {
    count += parseInt(prod.count);
  });
  return count;
});

export const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addProduct: (state, action: PayloadAction<number>) => {
      state.cart += action.payload;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.cart -= action.payload;
    },
    resetCart: (state) => {
      state.cart = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, resetCart } = cartSlice.actions;
