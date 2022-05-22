import { bytecode as whitelist } from "./whitelist/constants/constants";
import { bytecode as nftmint } from "./nftmint/constants/constants";
export const ABIs = { Whitelist: whitelist, Nftmint: nftmint };
export const chainID = 3;
const networks = { 1: "mainnet", 2: "koven", 3: "ropsten", 4: "rinksby" };
export const ADDRESS = "";
export const INFURA =
  "https://ropsten.infura.io/v3/d316b1478f9141ca9fa449271a7127a8";
export const network = networks[chainID];
