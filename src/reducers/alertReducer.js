import { ALERT_SHOW, ALERT_HIDE } from "../actions";

const initialState = {
  show: false,
  message: null,
  type: "info",
  timeout: false,
};

const authReducer = (state = initialState, action) => {
  if (action.type === ALERT_SHOW) {
    const payload = action.payload;

    return {
      ...state,
      show: true,
      message: payload.message,
      type: payload.type ?? initialState.type,
      timeout: payload.timeout ?? initialState.timeout,
    };
  }

  if (action.type === ALERT_HIDE) {
    return {
      ...state,
      show: false,
    };
  }

  return state;
};

export default authReducer;
