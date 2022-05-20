import * as ActionTypes from "../types/wallet";

const INITIAL_STATE = {
  connected: false,
  signer: {},
  address: "",
};

const wallet = (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CONNECT_SUCCESS:
      const signer = action.signer;
      const addr = action.address;
      states = Object.assign({}, states, {
        connected: true,
        signer: signer,
        address: addr,
      });
      return states;

    default:
      return states;
  }
};
export { wallet };
