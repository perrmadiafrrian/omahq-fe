import { purgeStoredState } from "redux-persist";
import { persistConfig } from "../configureStore";

const PersistorPurge = () => {
  purgeStoredState(persistConfig);
};

export default PersistorPurge;
