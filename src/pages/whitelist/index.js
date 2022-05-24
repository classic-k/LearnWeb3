import Wallet from "../../services/wallet/wallet";
import Web3Modal from "web3modal";
import { bytecode, CONTRACT } from "../../whitelist/constants/constants";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connected as update } from "../../state/action/wallet";
import Layout from "../../components/layout";

function Whitelist() {
  const wallet = useSelector((state) => state.wallet);
  const cons = wallet.connected;
  const [signer, setSigner] = useState(wallet.signer);
  const dispatch = useDispatch();
  const [joinlist, setJoinlist] = useState(false);
  const [connected, setConnected] = useState(cons);
  const [numoflist, setNumoflist] = useState(0);
  const [loading, setJLoading] = useState(false);
  const [address, setAddress] = useState(wallet.address);
  const [contract, setContract] = useState();
  const opts = { gasLimit: 250000, gasPrice: 9000000000 };
  const abi = bytecode.abi;
  const addAddress = async () => {
    try {
      const tx = await contract.addAddressToWhite(address, opts);
      setJLoading(true);
      await tx.wait();
      setJLoading(false);
      await getList();
      setJoinlist(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getList = async () => {
    try {
      const list = await contract.numAddressesWhitelisted();
      setNumoflist(list);
    } catch (err) {
      console.log(err);
    }
  };

  const check = async () => {
    try {
      const chk = await contract.whitelistedAddresses(address);
      setJoinlist(chk);
    } catch (err) {
      console.log(err);
    }
  };

  const connect = async () => {
    try {
      const web3ModalRef = new Web3Modal({
        network: "ropsten",
        disableInjectedProvider: false,
        providerOptions: {},
      });
      const signee = await Wallet.connect(web3ModalRef, true);
      setSigner(signee);
      const addr = await signee.getAddress();
      dispatch(update(signee, addr));
      const con = Wallet.getContract(CONTRACT, abi, signee);
      setContract(con);

      setAddress(addr);
      setConnected(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getCon = () => {
    try {
      const con = Wallet.getContract(CONTRACT, abi, signer);
      setContract(con);
    } catch (err) {
      console.log(err);
    }
  };
  const renderButton = () => {
    if (connected) {
      if (joinlist) {
        return (
          <div className="description">Thanks for joining the Whitelist!</div>
        );
      } else if (loading) {
        return <button className="button">Loading...</button>;
      } else {
        return (
          <button onClick={addAddress} className="button">
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connect} className="button">
          Connect your wallet
        </button>
      );
    }
  };

  useEffect(() => {
    if (connected) {
      if (!contract) {
        getCon();
      }
      (async function () {
        await check();
        await getList();
      })();
    }
  });
  return (
    <Layout title="Whitelist Address">
      <div className="main">
        <div>
          <h1 className="title">Welcome to Crypto Devs!</h1>
          <div className="description">
            Its an NFT collection for developers in Crypto.
          </div>
          <div className="description">
            {numoflist} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div>
          <img className="image" src="./crypto-devs.svg" alt="Logo" />
        </div>
      </div>
    </Layout>
  );
}

export default Whitelist;
