import { getContract } from "../../utils/api";
import { CONTRACT, bytecode } from "../../nftmint/constants/constants";
export const getID = async (id) => {
  try {
    id = parseInt(id);
    const contract = getContract(CONTRACT, bytecode.abi);
    const tokenID = await contract.methods.tokenIds().call();
    return id > 0 && id <= parseInt(tokenID);
  } catch (err) {
    console.log(err);
    return;
  }
};

export default async function Handler(req, res) {
  const tokenId = req.query.tokenid;
  const st = await getID(tokenId);

  if (!st) {
    res.status(400).json({
      message: "Invalid tokenID",
    });
    return;
  }

  const img =
    "https://raw.githubusercontent.com/LearnWeb3DAO/NFT-Collection/main/my-app/public/cryptodevs/";

  const url = img + tokenId + ".svg";

  res.status(200).json({
    image: url,
    name: "Crypto Dev #" + tokenId,
    description: "Crypto Dev is a collection of developers in crypto",
  });
}
