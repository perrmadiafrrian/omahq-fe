import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  menuState: menuReducer,
  auth: authReducer,
});

export default rootReducer;
