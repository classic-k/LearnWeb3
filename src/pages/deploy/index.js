import { deploy } from "../../utils/Utils";
import { useEffect, useState } from "react";
import { ABIs } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import Wallet from "../../services/wallet/wallet";
import { connected as walconnect } from "../../state/action/wallet";
import Web3Modal from "web3modal";
import Layout from "../../components/layout";

function Deploy() {
  const wallet = useSelector((state) => state.wallet);
  const [connected, setConnected] = useState(wallet.connected);
  const dispatch = useDispatch();
  const abis = Object.keys(ABIs);
  const [address, setAddress] = useState(wallet.address);
  const dep = async () => {
    const abi = document.querySelector(".abi_sel");
    const ind = abi.options.selectedIndex;
    const val = abi.options[ind].value.trim();
    const bytecode = ABIs[val];

    const txt = document.querySelector(".con_args");
    const txt_val = txt.value.trim().split(",");
    //console.log(val, txt_val);
    const instance = await deploy(bytecode, address, txt_val);
    console.log(instance);
  };

  useEffect(() => {});
  const getSigner = async () => {
    const web3Modal = new Web3Modal({
      network: "ropsten",
      disableInjectedProvider: false,
      providerOptions: {},
    });
    const signer = await Wallet.connect(web3Modal, true);
    const addr = await signer.getAddress();

    if (Wallet.isAddress(addr)) {
      setAddress(addr);
      setConnected(true);
      dispatch(walconnect(signer, addr));
    }
  };
  return (
    <Layout title="Deployment">
      <div className="dep">
        <div>
          {!connected && (
            <>
              <h4>Import Existing Wallet or create new Wallet</h4>
              <button className="button" onClick={getSigner}>
                Connect
              </button>
            </>
          )}
          <button onClick={dep} className="button">
            Deploy
          </button>
        </div>
        <div>
          Available Contracts{" "}
          <select className="abi_sel txt">
            <option key="-1">Select ABI</option>
            {abis.map((val, ind) => {
              return (
                <option value={val} key={ind}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <textarea
            className="con_args txt"
            placeholder="Enter constructor arguments seperated by comma"
            rows="10"
            cols="25"
          ></textarea>
        </div>
      </div>
    </Layout>
  );
}

export default Deploy;
