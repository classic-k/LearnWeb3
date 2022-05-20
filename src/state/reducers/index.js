import { combineReducers } from "redux";
import { wallet } from "./wallet";

//import { persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage/session";

const reducers = combineReducers({
  wallet,
});

/*  account: persistReducer(
    {
      key: "account",
      storage,
    },
    account
  ),*/
export default reducers;
