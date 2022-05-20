// React redux details
import { createStore } from "redux";
import reducers from "../reducers";
//import { persistStore } from "redux-persist";
export const store = createStore(reducers);
//export const persister = persistStore(store);
