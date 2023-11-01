import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";

import { WALLET_ADAPTERS, CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import addGreen from "../../assets/svg/add-green.svg";
import backbutton from "../../assets/svg/left-arrow.svg";
import removeGreen from "../../assets/svg/remove-green.svg";

function LivestockSignup(props) {
  const [web3authState, setWeb3AuthState] = useState(null);

  const initWeb3Auth = async () => {
    const chainConfig = {
      chainNamespace: "eip155",
      chainId: "0x13881",
      rpcTarget: "https://rpc-mumbai.maticvigil.com",
      displayName: "Polygon Testnet",
      blockExplorer: "https://polygon.etherscan.io",
      ticker: "MATIC",
      tickerName: "Polygon",
    };

    // Initialize within useEffect()
    const web3auth = new Web3Auth({
      clientId:
        "BCrXbYHPmzm1hH6BkBVOY7IxIHWszd61qZxjk2RbHsMsvE3I0nIddBisLanMV2Kr6nE2iAD6mRdAnYrmLzXpKD8", // Get your Client ID from the Web3Auth Dashboard
      web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
      chainConfig,
    });

    // ===
    // const privateKeyProvider = new EthereumPrivateKeyProvider({
    //   config: { chainConfig },
    // });

    // const openloginAdapter = new OpenloginAdapter({
    //   adapterSettings: {
    //     uxMode: "redirect", // redirect or popup
    //     loginConfig: {
    //       jwt: {
    //         verifier: "aequatore-web3auth-firebase", // name of the verifier created on Web3Auth Dashboard
    //         typeOfLogin: "jwt",
    //         clientId:
    //           "BCrXbYHPmzm1hH6BkBVOY7IxIHWszd61qZxjk2RbHsMsvE3I0nIddBisLanMV2Kr6nE2iAD6mRdAnYrmLzXpKD8",
    //       },
    //     },
    //   },
    //   privateKeyProvider,
    // });

    // web3auth.configureAdapter(openloginAdapter);

    setWeb3AuthState(web3auth);

    await web3auth.initModal();

    console.log("Model initialized..");
  };

  useEffect(() => {
    initWeb3Auth();
  }, []);

  const {
    appData,
    setAppData,
    signupLivestockOwner,
    initializeWeb3,
    disconnectWallet,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    income: "",
    householdSize: "",
  });

  // const [livestockList, setLivestockList] = useState([
  //   { name: "", population: "" },
  // ]);

  // const handleLivestockChange = (index, field, value) => {
  //   const updatedList = [...livestockList];
  //   updatedList[index][field] = value;
  //   setLivestockList(updatedList);
  // };

  // const addLivestockBlock = () => {
  //   setLivestockList([...livestockList, { name: "", population: "" }]);
  // };

  // const removeLivestockBlock = (index) => {
  //   const updatedList = [...livestockList];
  //   updatedList.splice(index, 1);
  //   setLivestockList(updatedList);
  // };

  const handleFormSubmit = async () => {
    try {
      const validations = [
        [formData.name, "Please enter your name"],
        [formData.email, "Please enter your email"],
        [formData.password, "Please provide a password"],
        [formData.confirmPassword, "Please confirm your password"],
        [
          formData.password === formData.confirmPassword,
          "Passwords do not match",
        ],
        [
          formData.password.length >= 6,
          "Password must be atleast 6 characters",
        ],
        [formData.age, "Please enter your age"],
        [formData.income, "Please enter your income"],
        [formData.householdSize, "Please enter your household size"],
      ];

      // const signupResult = await signupLivestockOwner(formData);
      console.log("signupResult", signupResult);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex items-center justify-center pt-12">
      {/* inner container */}
      <div className="flex flex-col w-[800px]">
        

        {/* submit button */}
        <button
          className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
          onClick={async () => {
            console.log("sign up clicked");
            await web3authState.connect();
            // if (
            //   appData.blockchain.address === "" ||
            //   appData.blockchain.address === undefined
            // ) {
            //   toast.error("Please connect your wallet");
            //   return;
            // } else {
            //   handleFormSubmit();
            // }
          }}
        >
          Sign Up
        </button>
        {/* <button
          className="btn"
          onClick={async () => {
            const userDets = await web3authState.getUserInfo();
            console.log("userDets", userDets);
            // const provider = await web3authState.provider();
            console.log("provider", web3authState.provider);

            try {
              const web3 = new Web3(web3authState.provider);

              // Get user's Ethereum public address
              const address = (await web3.eth.getAccounts())[0];

              // Get user's balance in ether
              const balance = web3.utils.fromWei(
                await web3.eth.getBalance(address), // Balance is in wei
                "ether"
              );

              // return balance;
              console.log("balance", balance, address);
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          Get User Info
        </button> */}
        {/* forward to sign in */}
        <div>
          <p className="pt-4 pb-16 text-sm text-white">
            Already have an account?{" "}
            <span
              className="font-bold text-white underline hover:cursor-pointer underline-offset-2"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LivestockSignup;
