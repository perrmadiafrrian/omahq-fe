import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
  menuState: menuReducer,
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;
