import "./index.css";
import Wallet from "../../../services/wallet/wallet";
import Web3Modal from "web3modal";
import { bytecode, CONTRACT } from "../../constants/constants";
import { useEffect, useState } from "react";
import { utils } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { connected as update } from "../../../state/action/wallet";

function NFTMint() {
  const wallet = useSelector((state) => state.wallet);
  const connect = wallet.connected;
  const signer = wallet.signer;
  const addr = wallet.address;
  const dispatch = useDispatch();
  const [isOwner, setIsOwner] = useState(false);
  const [connected, setConnected] = useState(connect);
  const [address, setAddress] = useState(addr);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [tokenIDs, setTokenIDs] = useState("");
  const [contract, setContract] = useState();
  const [loading, setLoading] = useState(false);

  const abi = bytecode["abi"];

  const getSigner = async () => {
    try {
      const web3ModalRef = new Web3Modal({
        network: "ropsten",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      const signer = await Wallet.connect(web3ModalRef, true);
      setLoading(true);
      const addr = await signer.getAddress();
      dispatch(update(signer, addr));
      setConnected(true);

      setAddress(addr);
      const con = Wallet.getContract(CONTRACT, abi, signer);
      setContract(con);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getCon = () => {
    const con = Wallet.getContract(CONTRACT, abi, signer);
    console.log(con);
    setContract(con);
  };
  const presaleMint = async () => {
    try {
      if (presaleEnded) {
        window.alert("Presale ended only public mint available");
        return;
      }
      const tx = await contract.presaleMint({
        value: utils.parseEther("0.01"),
        gasLimit: 250000,
      });
      setLoading(true);

      await tx.wait();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const publicMint = async () => {
    try {
      const tx = await contract.mint({
        value: utils.parseEther("0.01"),
        gasLimit: 250000,
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const startPresale = async () => {
    try {
      const tx = await contract.startPresale();

      await tx.wait();
      await checkPresale();
    } catch (err) {
      console.log(err);
    }
  };
  const checkPresale = async () => {
    try {
      const started = await contract.presaleStarted();

      await getOwner();

      setPresaleStarted(started);
    } catch (err) {
      console.log(err);
    }
  };

  const checkPresaleEnded = async () => {
    try {
      const ended = await contract.presaleEnded();
      const status = ended.lt(Math.floor(Date.now() / 1000));

      setPresaleEnded(status);
    } catch (err) {
      console.log(err);
    }
  };
  const getOwner = async () => {
    try {
      const _owner = await contract.owner();

      setIsOwner(_owner.toLowerCase() === address.toLocaleLowerCase());
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTokenIDs = async () => {
    try {
      const _token = await contract.tokenIds();

      setTokenIDs(_token.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const renderButton = () => {
    if (!connected) {
      return (
        <button onClick={getSigner} className="button">
          Connect your wallet
        </button>
      );
    }

    if (loading) {
      return <button className="button">Loading...</button>;
    }

    if (connected && isOwner && !presaleStarted) {
      return (
        <button className="button" onClick={startPresale}>
          Start Presale!
        </button>
      );
    }

    if (connected && !presaleStarted) {
      return (
        <div>
          <div className="description">Presale hasnt started!</div>
        </div>
      );
    }

    // If presale started, but hasn't ended yet, allow for minting during the presale period
    if (presaleStarted && !presaleEnded) {
      return (
        <div>
          <div className="description">
            Presale has started!!! If your address is whitelisted, Mint a Crypto
            Dev 🥳
          </div>
          <button className="button" onClick={presaleMint}>
            Presale Mint 🚀
          </button>
        </div>
      );
    }

    // If presale started and has ended, its time for public minting
    if (presaleStarted && presaleEnded) {
      return (
        <button className="button" onClick={publicMint}>
          Public Mint 🚀
        </button>
      );
    }
  };
  useEffect(() => {
    if (connected) {
      if (!contract) {
        getCon();
      }
      const _presaleStarted = checkPresale();
      if (_presaleStarted) {
        checkPresaleEnded();
      }

      fetchTokenIDs();
      const presaleEndedInterval = setInterval(async function () {
        const _presaleStarted = await checkPresale();
        if (_presaleStarted) {
          const _presaleEnded = await checkPresaleEnded();
          if (_presaleEnded) {
            clearInterval(presaleEndedInterval);
          }
        }
      }, 5 * 1000);

      setInterval(async function () {
        await fetchTokenIDs();
      }, 5 * 1000);
    }
  });
  return (
    <div>
      <div className="main">
        <div>
          <h1 className="title">Welcome to Crypto Devs!</h1>
          <div className="description">
            Its an NFT collection for developers in Crypto.
          </div>
          <div className="description">{tokenIDs}/20 have been minted</div>
          {renderButton()}
        </div>
        <div>
          <img className="image" src="./crypto-devs.svg" alt="Logo" />
        </div>
      </div>

      <footer className="footer">Made with &#10084; by Crypto Devs</footer>
    </div>
  );
}

export default NFTMint;
