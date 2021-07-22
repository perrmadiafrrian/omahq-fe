import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}
