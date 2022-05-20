import "./index.css";
import { useState } from "react";
import Web3Modal from "web3modal";
import Wallet from "../../services/wallet/wallet";
import { useDispatch, useSelector } from "react-redux";
import { connected as update } from "../../state/action/wallet";
// 0x80B3E9425327b5f67316054D8b77d48d87F5da58

function Home() {
  const { connected } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const getSigner = async () => {
    try {
      const web3ModalRef = new Web3Modal({
        network: "ropsten",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      setLoading(true);
      const signer = await Wallet.connect(web3ModalRef, true);
      const addr = await signer.getAddress();
      dispatch(update(signer, addr));
      setConnect(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const [connect, setConnect] = useState(connected);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="main">
        <div>
          <h1 className="title">Welcome to Crypto Devs!</h1>
          <div className="description">Web 3 All Apps Test Run. Click men</div>

          {!connect && (
            <button className="button" onClick={getSigner}>
              Connect your wallet
            </button>
          )}
        </div>
        <div>
          <img className="image" src="./crypto-devs.svg" alt="Crypto-dev" />
        </div>
      </div>

      <footer className="footer">Made with &#10084; by Crypto Devs</footer>
    </div>
  );
}

export default Home;
