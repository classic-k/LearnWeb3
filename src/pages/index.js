import { useState } from "react";
import Web3Modal from "web3modal";
import Wallet from "../services/wallet/wallet";
import { useDispatch, useSelector } from "react-redux";
import { connected as update } from "../state/action/wallet";
import Layout from "../components/layout";

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
  const pageTitle = "Crypto Related";
  const [connect, setConnect] = useState(connected);
  const [loading, setLoading] = useState(false);
  return (
    <Layout title={pageTitle}>
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
          <img className="image" src="./crypto-devs.svg" alt="Logo" />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
