import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
import {HYDRATE} from "next-redux-wrapper";

interface AppsSliceState {
  data: any,
  orientation: string,
  device: string
}

const initialState: AppsSliceState = {
  data: null,
  orientation: 'portrait',
  device: 'IPhone'
}

export const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload.data;
    },
    setOrientation(state, action) {
      state.orientation = action.payload.orientation;
    },
    setDevice(state, action) {
      state.device = action.payload.device;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.apps.data;
    },
  },
})

export const appsSelector = (state: RootState) => state.apps;

export const selectData = (state: RootState) => state.apps.data;

export const {setData, setOrientation, setDevice} = appsSlice.actions

export const appsReducer = appsSlice.reducer