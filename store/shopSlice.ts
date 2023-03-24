import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ShopInfoState {
  shopInfo: any;
  mapXY: any;
  shuffleShop: any;
  isLocation: any;
}

const initialState: ShopInfoState = {
  shopInfo: [],
  mapXY: {},
  shuffleShop: [],
  isLocation: false,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopInfo: (state, action) => {
      state.shopInfo = action.payload;
    },
    setMapXY: (state, action) => {
      state.mapXY = action.payload;
    },
    setShuffleShop: (state, action) => {
      state.shuffleShop = action.payload;
    },
    setIsLocation: (state, action) => {
      state.isLocation = action.payload;
    },
  },
});

export const { setShopInfo, setMapXY, setShuffleShop, setIsLocation } =
  shopSlice.actions;

export const selectShopInfo = (state: any) => state.shop.shopInfo;
export const selectMapXY = (state: any) => state.shop.mapXY;
export const selectShuffleShop = (state: any) => state.shop.shuffleShop;
export const selectIsLocation = (state: any) => state.shop.isLocation;
export default shopSlice.reducer;
