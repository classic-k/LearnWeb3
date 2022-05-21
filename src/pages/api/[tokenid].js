export default function handler(req, res) {
  const img =
    "https://raw.githubusercontent.com/LearnWeb3DAO/NFT-Collection/main/my-app/public/cryptodevs/";
  const tokenId = req.query.tokenid;
  const url = img + tokenId + ".svg";

  res.status(200).json({
    image: url,
    name: "Crypto Dev #" + tokenId,
    description: "Crypto Dev is a collection of developers in crypto",
  });
}
