import { providers, Contract, utils } from "ethers";

export default class Wallet {
  static signer;
  static contract;

  static async connect(modal, signer = false) {
    try {
      const web_provider = await modal.connect();
      const provider = new providers.Web3Provider(web_provider);
      const network = await provider.getNetwork();

      if (network.chainId !== 3) {
        console.log("Contract is on ropsten network");
        throw new Error("Change to ropsten network");
      }
      if (signer) {
        signer = provider.getSigner();
        this.signer = signer;
        return signer;
      }

      return provider;
    } catch (err) {
      console.log(err);
    }
  }

  static isAddress(address) {
    return utils.isAddress(address);
  }
  static getContract(address, abi, signer) {
    try {
      const contract = new Contract(address, abi, signer);
      this.contract = contract;
      return contract;
    } catch (err) {
      console.log(err);
    }
  }
}
