import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
import {HYDRATE} from "next-redux-wrapper";

interface SettingsSliceState {
  loading: boolean,
}

const initialState: SettingsSliceState = {
  loading: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
})

export const settingsSelector = (state: RootState) => state.settings;

export const {setLoading  } = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer