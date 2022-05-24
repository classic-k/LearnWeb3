import Web3 from "web3";
import { INFURA } from "../constant";
export const copyToClipboard = (str) => {
  return _cp(str);
};

const _cp = async (str) => {
  let res = await navigator.clipboard.writeText(str);
  console.log(res);
  return res;
};

export const deploy = async (bytecode, address, args = []) => {
  try {
    console.log(args);
    const W3 = new Web3(INFURA);
    const acc = W3.eth.accounts.privateKeyToAccount(
      "743fb6894c15d921247f5bcc092a5adf6d01197304c80eedb0a9fbeec5ae34b0"
    );
    W3.eth.accounts.wallet.add(acc);
    const gasPrice = W3.eth.gas_price;
    const abi = bytecode.abi;
    const datas = { data: bytecode.object, arguments: args };
    const web3_con = new W3.eth.Contract(abi);

    const { send } = web3_con.deploy(datas);

    const sopt = Object.assign(
      {},
      { gasPrice: gasPrice, gas: 5000000, from: acc.address }
    );
    const instance = await send(sopt);
    console.log(instance);
    return instance;
  } catch (err) {
    console.log(err);
  }
};

export const connect = async () => {
  if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      console.log("Connected");
    });

    const accs = await window.ethereum.request({ method: "eth_accounts" });
    return accs;
  } else {
    console.log("cannot connect");
  }
};

export const read_file = async (filename) => {
  let result = await fetch(filename);
  let res = await result.json();
  return res;
};

export const write_file = (filename, datas) => {
  window.fs
    .writeFile(filename, datas, {
      encoding: "utf8",
    })
    .then(() => {
      console.log("👍");
    });
};
