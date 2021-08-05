import { TOGGLE_DARKMODE, TOGGLE_MENU } from "../actions";

const initialState = { opened: false, dark_mode: false };

const menuReducer = (state = initialState, action) => {
  if (action.type === TOGGLE_MENU) {
    return {
      ...state,
      opened: !state.opened,
    };
  }

  if (action.type === TOGGLE_DARKMODE) {
    return {
      ...state,
      dark_mode: !state.dark_mode,
    };
  }

  return state;
};

export default menuReducer;
