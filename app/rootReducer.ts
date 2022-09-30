import { combineReducers } from 'redux';
import {settingsReducer} from "../features/settings/settingsSlice";
import {appsReducer} from "../features/apps/appsSlice";

export default combineReducers({
  settings: settingsReducer,
  apps: appsReducer,
});