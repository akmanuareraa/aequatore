// Import necessary modules
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const contractABI = require("./abi.json");

// ===================================
// zerodev init
// ===================================
const { ECDSAProvider } = require("@zerodev/sdk");
const { getCustodialOwner } = require("@zerodev/sdk");
const { LocalAccountSigner } = require("@alchemy/aa-core");
const {
  encodeFunctionData,
  parseAbi,
  createPublicClient,
  http,
} = require("viem");
const { polygonMumbai } = require("viem/chains");

let adminAddress = "";
let zdSdk = null;
const projectId = "d460dbe8-767b-4cfd-9da3-c1e86b16c089";
const owner = LocalAccountSigner.privateKeyToAccountSigner(
  "0x653d27da9215042c752f235c0a9567c9a58171a4fce3c3486f239fc406bab2ba"
);
const contractAddress = "0x44ABf0aD6D19371973d54809Aa4573757BBf69e7";
const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(
    "https://polygon-mumbai.infura.io/v3/f36f7f706a58477884ce6fe89165666c"
  ),
});
const zerodevInit = async (owner) => {
  const ecdsaProvider = await ECDSAProvider.init({
    projectId,
    owner,
  });
  const address = await ecdsaProvider.getAddress();
  console.log("Adress: ", address);
  console.log("ECDSA Initiated Successfully");
  return { address, ecdsaProvider };
};

const main = async () => {
  const owner = await getCustodialOwner("randomoipoip", {
    privateKey:
      "6e00d978e479307183ed06678fd4191f860ec2ad0eb49adbeef4591793086a7a",
    publicKey:
      "021ca32c58f43528c8c223249ecef8a6d3c0932ce5f22834cb0c003b53bb4fcc76",
    keyId: "837a492f-3c30-4f96-8be6-182aaeab7f4c",
  });
  console.log("Owner: ", owner);
  // const data = await publicClient.readContract({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: "getUser",
  //   args: ["0xf2f925d49fc07e64c3c2af195744361b985288e4"],
  // });
  // console.log("Data: ", data);
};
// ===================================
// ===================================

// Create express app
const app = express();
app.use(bodyParser.json());

// MongoDB and Mongoose setup
const mongoURI =
  "mongodb+srv://manuareraa:LmkPrGjlr4D6mtnS@cluster0.albnrik.mongodb.net/main";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected to the database!");
});

// Example GET endpoint
app.get("/items", (req, res) => {
  db.collection("items")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(result);
    });
});

// Example POST endpoint
app.post("/items", (req, res) => {
  db.collection("items").insertOne(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result.ops);
  });
});

// User Registration
app.post("/register", (req, res) => {
  const newUser = req.body;

  db.collection("users").insertOne(newUser, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res
      .status(201)
      .send({ message: "User registered successfully", user: result.ops });
  });
});

// User Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.collection("users").findOne({ username: username }, (err, user) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!user || user.password !== password) {
      res.status(401).send({ message: "Login failed" });
      return;
    }
    res.status(200).send({ message: "Login successful", user: user });
  });
});

// Start server
const PORT = 4565;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await zerodevInit();
  await main();
});
