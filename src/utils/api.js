import Web3 from "web3";
import { INFURA as url } from "../constant";

export const getContract = (address, abi) => {
  try {
    const web3 = new Web3(url);
    const gasPrice = web3.eth.gas_price;
    const contract = new web3.eth.Contract(abi, address, {
      gasPrice: gasPrice,
    });
    const acc = web3.eth.accounts.create();
    web3.eth.accounts.wallet.add(acc);
    contract.defaultAccount = acc.address;
    return contract;
  } catch (err) {
    console.log(err);
    return;
  }
};
