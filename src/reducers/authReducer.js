import { AUTH_SET, AUTH_INVALIDATE } from "../actions";

const initialState = {
  is_auth: false,
  access_token: null,
  refresh_token: null,
  id_token: null,
  data: null,
};

const authReducer = (state = initialState, action) => {
  if (action.type === AUTH_SET) {
    const payload = action.payload;

    return {
      ...state,
      is_auth: payload.is_auth,
      access_token: `${payload.token_type} ${payload.access_token}`,
      refresh_token: payload.refresh_token,
      id_token: payload.id_token,
      data: payload.data,
    };
  }

  if (action.type === AUTH_INVALIDATE) {
    return {
      ...state,
      ...initialState,
    };
  }

  return state;
};

export default authReducer;
