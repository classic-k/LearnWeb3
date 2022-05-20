export const copyToClipboard = (str) => {
  return _cp(str);
};

const _cp = async (str) => {
  let res = await navigator.clipboard.writeText(str);
  console.log(res);
  return res;
};

export const deploy = async (bytecode, address, args = []) => {
  const gasPrice = window.W3.eth.gas_price;
  const abi = bytecode.abi;
  const datas = { data: bytecode.object, arguments: args };
  const web3_con = new window.W3.eth.Contract(abi);

  const { send } = await web3_con.deploy(datas);

  const sopt = Object.assign(
    {},
    { gasPrice: gasPrice, gas: 5000000, from: address }
  );
  const instance = await send(sopt);

  return instance;
};

export const connect = async (st_box) => {
  if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      window[st_box].textContent = "Connected";
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
