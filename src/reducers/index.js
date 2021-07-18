import { combineReducers } from "redux";
import menuReducer from "./menuReducer";

const rootReducer = combineReducers({
  menuState: menuReducer,
});

export default rootReducer;
