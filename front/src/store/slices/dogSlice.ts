import { createSlice } from '@reduxjs/toolkit';
import type { IDog } from '../../type.ts';

interface IState {
  dogArr: IDog[],
  favoriteList: IDog[],
  isLoading: boolean,
}

const initialState: IState = {
  dogArr: [],
  favoriteList: JSON.parse(String(localStorage.getItem('FavoriteDogs'))) || [],
  isLoading: false,
};

const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {
    loadingDogs(state) {
      state.isLoading = true;
    },
    loadingDogsSuccessful(state, action: { type: string, payload: IDog[] }) {
      state.dogArr = [...state.dogArr, ...action.payload];
      state.isLoading = false;
    },
    loadingDogsError(state, action: { payload: string, type: string }) {
      state.isLoading = false;
      console.log(action.payload);
    },

    likeDog(state, action: { payload: IDog, type: string }) {
      if (state.favoriteList.find((value) => value.id === action.payload.id) !== undefined) {
        state.favoriteList = state.favoriteList.filter((value) => value.id !== action.payload.id);
      } else {
        state.favoriteList = [...state.favoriteList, action.payload];
      }

      localStorage.setItem('FavoriteDogs', JSON.stringify(state.favoriteList));
    },
  },
});

export const { loadingDogs, loadingDogsSuccessful, loadingDogsError, likeDog } = dogSlice.actions;
export default dogSlice.reducer;