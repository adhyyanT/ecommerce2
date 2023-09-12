import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cartSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import darkModeSlice from './features/darkModeSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    mode: darkModeSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
