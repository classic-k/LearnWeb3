import * as ActionTypes from "../types/wallet";

//import Wallet from "../../services/wallet/wallet";

export const connected = (data, addr) => {
  return { type: ActionTypes.CONNECT_SUCCESS, signer: data, address: addr };
};
