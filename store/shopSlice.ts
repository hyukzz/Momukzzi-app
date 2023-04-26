import { createSlice } from '@reduxjs/toolkit';

export interface ShopInfoState {
  shopInfo: any;
  shopImage: any;
  mapXY: { longitude: number; latitude: number };
  shopMapXY: { longitude: number; latitude: number };
  shuffleShop: any;
  isLocation: boolean;
  randomInt: number;
  isLoading: boolean;
}

const initialState: ShopInfoState = {
  shopInfo: null,
  shopImage: [],
  mapXY: { longitude: 0, latitude: 0 },
  shopMapXY: { longitude: 0, latitude: 0 },
  shuffleShop: [],
  isLocation: false,
  randomInt: 0,
  isLoading: true,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopInfo: (state, action) => {
      state.shopInfo = action.payload;
    },
    setShopImage: (state, action) => {
      state.shopImage = action.payload;
    },
    setMapXY: (state, action) => {
      state.mapXY = action.payload;
    },
    setShopMapXY: (state, action) => {
      state.shopMapXY = action.payload;
    },
    setShuffleShop: (state, action) => {
      state.shuffleShop = action.payload;
    },
    setIsLocation: (state, action) => {
      state.isLocation = action.payload;
    },
    setRandomInt: (state, action) => {
      state.randomInt = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setShopInfo,
  setMapXY,
  setShopImage,
  setShuffleShop,
  setIsLocation,
  setRandomInt,
  setIsLoading,
  setShopMapXY,
} = shopSlice.actions;

export const selectShopInfo = (state: { shop: ShopInfoState }) =>
  state.shop.shopInfo;
export const selectShopImage = (state: { shop: ShopInfoState }) =>
  state.shop.shopImage;
export const selectMapXY = (state: { shop: ShopInfoState }) => state.shop.mapXY;
export const selectShopMapXY = (state: { shop: ShopInfoState }) =>
  state.shop.shopMapXY;
export const selectShuffleShop = (state: { shop: ShopInfoState }) =>
  state.shop.shuffleShop;
export const selectIsLocation = (state: { shop: ShopInfoState }) =>
  state.shop.isLocation;
export const selectRandomInt = (state: { shop: ShopInfoState }) =>
  state.shop.randomInt;
export const selectIsLoading = (state: { shop: ShopInfoState }) =>
  state.shop.isLoading;

export default shopSlice.reducer;
