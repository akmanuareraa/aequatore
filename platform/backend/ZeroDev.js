const { ECDSAProvider } = require("@zerodev/sdk");
const { LocalAccountSigner } = require("@alchemy/aa-core");
const {
  encodeFunctionData,
  parseAbi,
  createPublicClient,
  http,
} = require("viem");
const { polygonMumbai } = require("viem/chains");

// ZeroDev Project ID
const projectId = "d460dbe8-767b-4cfd-9da3-c1e86b16c089";

// The "owner" of the AA wallet, which in this case is a private key
const owner = LocalAccountSigner.privateKeyToAccountSigner(
  "0x653d27da9215042c752f235c0a9567c9a58171a4fce3c3486f239fc406bab2ba"
);

// The NFT contract we will be interacting with
const contractAddress = "0x44ABf0aD6D19371973d54809Aa4573757BBf69e7";
// const contractABI = parseAbi([
//   "function mint(address _to) public",
//   "function balanceOf(address owner) external view returns (uint256 balance)",
// ]);
const publicClient = createPublicClient({
  chain: polygonMumbai,
  // the API is rate limited and for demo purposes only
  // in production, replace this with your own node provider (e.g. Infura/Alchemy)
  transport: http(
    "https://polygon-mumbai.infura.io/v3/f36f7f706a58477884ce6fe89165666c"
  ),
});

const zerodevInit = async () => {
  const ecdsaProvider = await ECDSAProvider.init({
    projectId,
    owner,
  });
  const address = await ecdsaProvider.getAddress();
  return { ecdsaProvider, address };
};

module.exports = zerodevInit;

// const main = async () => {
//   // Create the AA wallet
//   const ecdsaProvider = await ECDSAProvider.init({
//     projectId,
//     owner,
//   });
//   const address = await ecdsaProvider.getAddress();
//   console.log("My address:", address);

//   // Mint the NFT
//   const { hash } = await ecdsaProvider.sendUserOperation({
//     target: contractAddress,
//     data: encodeFunctionData({
//       abi: contractABI,
//       functionName: "mint",
//       args: [address],
//     }),
//   });
//   await ecdsaProvider.waitForUserOperationTransaction(hash);

//   // Check how many NFTs we have
//   const balanceOf = await publicClient.readContract({
//     address: contractAddress,
//     abi: contractABI,
//     functionName: "balanceOf",
//     args: [address],
//   });
//   console.log(`NFT balance: ${balanceOf}`);
// };

// main().then(() => process.exit(0));
