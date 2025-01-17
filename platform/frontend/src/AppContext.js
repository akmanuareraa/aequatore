import React, { useState, useEffect, createContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./services/firebase.config";
import Web3 from "web3";

import { Web3Auth } from "@web3auth/modal";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import contractAbi from "./smart-contract/abi.json";
import testAbi from "./smart-contract/test.json";
import { ethers } from "ethers";

import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { encodeFunctionData, createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";

import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Breadcrumbs from "./components/Breadcrumbs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    status: "false",
    message: "",
  });

  const [appData, setAppData] = useState({
    userProfile: null,
    userEmail: null,
    currentHeaderTitle: "",
    breadCrumbs: [],
    web3auth: null,
    blockchain: {
      web3: null,
      address: "",
      balance: 0,
    },
    loggedIn: false,
    livestockOwners: [],
    contractAddress: "0x44ABf0aD6D19371973d54809Aa4573757BBf69e7",
    projectId: "d460dbe8-767b-4cfd-9da3-c1e86b16c089",
    // contractAddress: "0x4A6Ef32d5fc59584301642B7BF9feDb69B91F2A3",
  });

  const [miscData, setMiscData] = useState({
    applicationCount: 0,
  });

  const [web3authState, setWeb3AuthState] = useState(null);

  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(
      "https://polygon-mumbai.infura.io/v3/f36f7f706a58477884ce6fe89165666c"
    ),
  });

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
      uiConfig: {
        theme: "dark",
        loginMethodsOrder: [
          "google",
          "facebook",
          "email_passwordless",
          "twitter",
        ],
      },
    });

    // setWeb3AuthState(web3auth);

    setAppData((prevState) => {
      return {
        ...prevState,
        web3auth: web3auth,
      };
    });

    await web3auth.initModal();

    console.log("Model initialized..", web3auth.connected);

    if (web3auth.connected === true) {
      setAppData((prevState) => {
        return {
          ...prevState,
          loggedIn: true,
        };
      });
      return true;
    }
  };

  useEffect(() => {
    initWeb3Auth();
  }, []);

  // aa
  const getUserProfileFromId = async (id) => {
    console.log("Fetching user profile from id...", appData.userEmail);
    const collectionRef = collection(db, "users");
    const userDataQuery = query(
      collectionRef,
      where("userUid", "==", appData.userEmail)
    );
    const userDataSnapshot = await getDocs(userDataQuery);
    let uData = null;

    if (!userDataSnapshot.empty) {
      userDataSnapshot.forEach((doc) => {
        const userData = doc.data();
        // console.log("userData:", userData);
        uData = userData;
      });
      return uData;
    } else {
      // console.log("No matching documents found for the user.");
      return null;
    }
  };

  // aa
  const updateFarmForUser = async (userId, formData) => {
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userEmail)
    );

    try {
      const result = await updateFarmInContract(JSON.stringify(formData));
      if (result === true) {
        // Fetch the data
        const querySnapshot = await getDocs(q);

        for (const queryDoc of querySnapshot.docs) {
          // Access the document reference
          const documentRef = doc(db, "users", queryDoc.id);
          formData.createdAt = serverTimestamp();

          // Update the document with new data
          await updateDoc(documentRef, {
            farm: {
              ...formData,
            },
          });
          // console.log("Document successfully updated!");
          toast.success("Farm registered successfully!");
          return true; // Indicate success for at least one document
        }

        // If the loop completes without returning, no documents matched the query
        toast.error("No matching documents found!");
        return false;
      } else {
        toast.error("Error updating farm data in contract");
        return false;
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error updating document!");
      return false;
    }
  };

  // aa
  const signupLivestockOwner = async (formData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.email
      );

      // Signed in
      // const user = userCredential.user;
      const collectionRef = collection(db, "users");

      const docRef = await addDoc(collectionRef, {
        userUid: formData.email,
        name: formData.name,
        email: formData.email,
        age: formData.age,
        income: formData.income,
        householdSize: formData.householdSize,
        role: "livestockOwner",
        createdAt: serverTimestamp(),
        farm: {},
        animals: [],
        livestockGoals: [],
        walletAddress: appData.blockchain.address,
      });

      // console.log("Document written with ID: ", docRef.id);

      const result = await updateUserDataInContract({
        uid: formData.email,
        name: formData.name,
        email: formData.email,
        age: formData.age,
        income: formData.income,
        householdSize: formData.householdSize,
        farm: "",
        animals: "",
        livestockGoals: "",
      });

      console.log("result", result);

      if (result === true) {
        toast.success("Signup Successful");
        navigate("/signin");
        return true; // Success
      } else {
        toast.error("Error updating user data in contract");

        // Delete the Firestore document since the contract update failed
        const documentPath = `users/${docRef.id}`; // Replace with your document path
        const documentReference = doc(db, documentPath);

        try {
          await deleteDoc(documentReference);
          await deleteUser(auth.currentUser);
          // console.log("Firestore document deleted.");
        } catch (error) {
          console.error("Error deleting Firestore document: ", error);
        }

        return false; // Failure
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);

      return false; // Failure
    }
  };

  // aa
  const signInUser = async (email) => {
    try {
      console.log("Signing In AC...", email);
      const collectionRef = collection(db, "users");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        email
      );
      const user = userCredential.user;

      console.log("User sign in response: ", userCredential);

      const userDataQuery = query(collectionRef, where("userUid", "==", email));
      const userDataSnapshot = await getDocs(userDataQuery);

      console.log("userDataSnapshot", userDataSnapshot, user.uid);

      if (!userDataSnapshot.empty) {
        userDataSnapshot.forEach(async (doc) => {
          const userData = doc.data();
          // console.log("userData:", userData);
          if (userData.role === "livestockOwner") {
            toast.success("Signed in successfully");
            setAppData((prevState) => ({
              ...prevState,
              userProfile: userData,
              userId: auth.currentUser.uid,
            }));
            navigate("/dashboard/my-farm");
          } else if (userData.role === "banker") {
            await fetchAllLivestockOwners();
            toast.success("Signed in successfully");
            setAppData((prevState) => ({
              ...prevState,
              userProfile: userData,
              userId: auth.currentUser.uid,
              currentHeaderTitle: "Banker Dashboard",
            }));
            navigate("/dashboard/banker");
          }
        });

        setAppData((prevState) => {
          return {
            ...prevState,
            userEmail: email,
          };
        });

        return true; // Signed in successfully
      } else {
        // console.log("No matching documents found for the user.");
        toast.error("Incorrect Credentials");
        return false; // No matching documents found
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Incorrect Credentials");
      console.error(errorMessage);
      return false; // Error occurred during sign-in
    }
  };

  // aa
  const deleteFarmForUser = async () => {
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userEmail)
    );

    try {
      const result = await updateFarmInContract("");
      if (result === true) {
        // Fetch the data
        const querySnapshot = await getDocs(q);

        for (const queryDoc of querySnapshot.docs) {
          // Access the document reference
          const documentRef = doc(db, "users", queryDoc.id);

          // Update the document with new data
          await updateDoc(documentRef, {
            farm: {},
          });
          // console.log("Document successfully updated!");
          toast.success("Farm deleted successfully!");
          setAppData((prevState) => ({
            ...prevState,
            userProfile: {
              ...prevState.userProfile,
              farm: {},
            },
          }));
          return true; // Indicate success for at least one document
        }

        // If the loop completes without returning, no documents matched the query
        toast.error("No matching documents found!");
        return false;
      } else {
        toast.error("Error updating farm data in contract");
        return false;
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error updating document!");
      return false;
    }
  };

  // aa
  const addAnimalForUser = async (animalData) => {
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userEmail)
    );

    try {
      const result = await updateAnimalsInContract(JSON.stringify(animalData));
      if (result === true) {
        // Fetch the data
        const querySnapshot = await getDocs(q);

        for (const queryDoc of querySnapshot.docs) {
          // Access the document reference
          const documentRef = doc(db, "users", queryDoc.id);

          // Update the document with new data
          await updateDoc(documentRef, {
            animals: animalData,
          });

          const newUserData = await getUserProfileFromId(appData.userId);
          setAppData((prevState) => ({
            ...prevState,
            userProfile: newUserData,
          }));
          // console.log("Data updated successfully!");
          toast.success("Data updated successfully!");
          return true; // Indicate success for at least one document
        }
      } else {
        // console.error("Error updating animals data in contract", error);
        toast.error("Error updating animals data in contract");
        return false;
      }

      // If the loop completes without returning, no documents matched the query
      toast.error("No matching documents found!");
      return false;
    } catch (error) {
      // console.error("Error updating data: ", error);
      toast.error("Error updating data");
      return false;
    }
  };

  // aa
  const updateLivestockValueForUser = async (value) => {
    setLoading({ status: true, message: "Updating livestock value..." });
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userEmail)
    );

    try {
      const result = await updateLivestockValueInContract(
        JSON.stringify(value)
      );
      if (result === true) {
        // Fetch the data
        const querySnapshot = await getDocs(q);

        for (const queryDoc of querySnapshot.docs) {
          // Access the document reference
          const documentRef = doc(db, "users", queryDoc.id);

          // Update the document with new data
          await updateDoc(documentRef, {
            livestockValue: value,
          });

          const newUserData = await getUserProfileFromId(appData.userId);
          setAppData((prevState) => ({
            ...prevState,
            userProfile: newUserData,
          }));
          // console.log("Data updated successfully!");
          // toast.success("Data updated successfully!");
          setLoading({ status: false, message: "" });
          return true; // Indicate success for at least one document
        }

        // If the loop completes without returning, no documents matched the query
        toast.error("No matching documents found!");
        setLoading({ status: false, message: "" });
        return false;
      } else {
        toast.error("Error updating livestock value data in contract");
        setLoading({ status: false, message: "" });
        return false;
      }
    } catch (error) {
      console.error("Error updating data: ", error);
      toast.error("Error updating data");
      setLoading({ status: false, message: "" });
      return false;
    }
  };

  // aa
  const initializeWeb3 = async () => {
    // console.log("Initializing Web3...");
    if (window.ethereum) {
      // console.log("MetaMask found");
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access
        // console.log("Requesting account access...");
        await window.ethereum.enable();

        // console.log("Fetching accounts...");
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();

        // Check if connected to the Polygon testnet
        if (parseInt(chainId) !== 80001) {
          // console.log(
          //   "Not connected to Polygon testnet",
          //   accounts,
          //   parseInt(chainId)
          // );
          try {
            // Add the Polygon testnet
            // console.log("Adding Polygon testnet...");
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881", // Polygon Mumbai testnet
                  chainName: "Polygon Mumbai Testnet",
                  nativeCurrency: {
                    name: "Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                },
              ],
            });
          } catch (error) {
            // console.error("Error adding Polygon testnet:", error);
          }
        }

        // Check MATIC balance
        try {
          // console.log("Checking balance...", accounts, chainId);
          const balance = await web3.eth.getBalance(accounts[0]);
          // console.log(
          //   "Balance:",
          //   balance,
          //   web3.utils.fromWei(balance, "ether")
          // );
          setAppData((prevState) => {
            return {
              ...prevState,
              blockchain: {
                ...prevState.blockchain,
                web3: web3,
                address: accounts[0],
                balance: web3.utils.fromWei(balance, "ether"),
              },
            };
          });
          if (parseInt(balance) <= 0) {
            alert("Balance too low. Please add funds.");
          }
        } catch (error) {
          // console.error("Error checking balance:", error);
        }
      } catch (error) {
        // console.error("Error connecting to MetaMask:", error);
      }
    } else {
      // console.error("MetaMask not found");
    }
  };

  // aa
  const disconnectWallet = async () => {
    setAppData((prevState) => {
      return {
        ...prevState,
        blockchain: {
          ...prevState.blockchain,
          web3: null,
          address: "",
          balance: 0,
        },
      };
    });
  };

  // aa
  const sendOtp = async (email) => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Enrico Cardinalli",
            email: "enricocardinali810@gmail.com",
          },
          to: [
            {
              email: email,
              name: "Banker",
            },
          ],
          subject: "OTP Verification for Login",
          htmlContent: "Welcome to Aequatore, your OTP for loggin in is " + otp,
        },
        {
          headers: {
            accept: "application/json",
            "api-key":
              "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",
            "content-type": "application/json",
          },
        }
      );
      // console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        setAppData((prevState) => {
          return {
            ...prevState,
            otp: otp,
          };
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("error", error);
      return false;
    }
  };

  // aa
  const signupBanker = async (formData) => {
    try {
      // console.log("formData", formData);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.email
      );

      // console.log("userCredential", userCredential);

      // Signed in
      const user = userCredential.user;
      const collectionRef = collection(db, "users");

      const docRef = await addDoc(collectionRef, {
        userUid: formData.email,
        email: formData.email,
        role: "banker",
        createdAt: serverTimestamp(),
      });

      // console.log("Document written with ID: ", docRef.id);
      // console.log("dtb", user.uid, formData.email);
      const result = await updateBankerDataInContract(
        formData.email,
        formData.email
      );
      if (result === true) {
        toast.success("Signup Successful");
        navigate("/signin");

        return true; // Success
      } else {
        toast.error("Error updating banker data in contract");

        // Delete the Firestore document since the contract update failed
        const documentPath = `users/${docRef.id}`; // Replace with your document path
        const documentReference = doc(db, documentPath);

        try {
          await deleteDoc(documentReference);
          await deleteUser(auth.currentUser);
          // console.log("Firestore document deleted.");
        } catch (error) {
          // console.error("Error deleting Firestore document: ", error);
        }

        return false; // Failure
      }
    } catch (error) {
      // console.log("error", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);

      return false; // Failure
    }
  };

  // aa
  const fetchAllLivestockOwners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      const livestockOwners = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is the document data
        if (doc.data().role === "livestockOwner") {
          livestockOwners.push(doc.data());
        }
      });
      // console.log("livestockOwners", livestockOwners);
      setAppData((prevState) => {
        return {
          ...prevState,
          livestockOwners: livestockOwners,
        };
      });
    } catch (error) {
      // console.log("Error getting documents: ", error);
    }
  };

  // aa
  const updateUserDataInContract = async (userData) => {
    const {
      uid,
      name,
      email,
      age,
      income,
      householdSize,
      farm,
      animals,
      livestockGoals,
    } = userData;

    try {
      try {
        const signer = await ECDSAProvider.init({
          projectId: appData.projectId,
          owner: getRPCProviderOwner(appData.web3auth.provider),
        });

        const address = await signer.getAddress();
        console.log("Address: ", address);

        const { hash } = await signer.sendUserOperation({
          target: appData.contractAddress,
          data: encodeFunctionData({
            abi: contractAbi,
            functionName: "updateUser",
            args: [
              uid,
              name,
              email,
              age,
              income,
              householdSize,
              farm,
              animals,
              livestockGoals,
              "0",
            ],
          }),
          // value: value,
        });
        const txnHash = await signer.waitForUserOperationTransaction(hash);
        console.log("txnHash", txnHash);
        return true;
      } catch (error) {
        console.log("SF error", error);
      }
    } catch (error) {
      console.log("Error updating user data in contract:", error);
      toast.error(
        "Error updating user data in contract. Please try again later."
      );
      return false;
    }
  };

  // aa
  const updateFarmInContract = async (farmData) => {
    try {
      const signer = await ECDSAProvider.init({
        projectId: appData.projectId,
        owner: getRPCProviderOwner(appData.web3auth.provider),
      });

      const address = await signer.getAddress();
      console.log("Address: ", address);

      const { hash } = await signer.sendUserOperation({
        target: appData.contractAddress,
        data: encodeFunctionData({
          abi: contractAbi,
          functionName: "updateFarm",
          args: [farmData],
        }),
      });

      const txnHash = await signer.waitForUserOperationTransaction(hash);
      console.log("txnHash", txnHash);

      return true;
    } catch (error) {
      console.log("Error updating farm data in contract:", error);
      toast.error(
        "Error updating farm data in contract. Please try again later."
      );
      return false;
    }
  };

  // aa
  const updateAnimalsInContract = async (animalsData) => {
    try {
      const signer = await ECDSAProvider.init({
        projectId: appData.projectId,
        owner: getRPCProviderOwner(appData.web3auth.provider),
      });

      const address = await signer.getAddress();
      console.log("Address: ", address);

      const animalsDataString = JSON.stringify(animalsData);

      const { hash } = await signer.sendUserOperation({
        target: appData.contractAddress,
        data: encodeFunctionData({
          abi: contractAbi,
          functionName: "updateAnimals",
          args: [animalsDataString],
        }),
      });

      const txnHash = await signer.waitForUserOperationTransaction(hash);
      console.log("txnHash", txnHash);

      return true;
    } catch (error) {
      console.log("Error updating animals data in contract:", error);
      toast.error(
        "Error updating animals data in contract. Please try again later."
      );
      return false;
    }
  };

  // aa
  const updateLivestockValueInContract = async (value) => {
    try {
      // Initialize the signer using ECDSAProvider
      const signer = await ECDSAProvider.init({
        projectId: appData.projectId,
        owner: getRPCProviderOwner(appData.web3auth.provider),
      });

      // Get the signer's address
      const address = await signer.getAddress();
      console.log("Address: ", address);

      // Send the user operation with the encoded function data
      const { hash } = await signer.sendUserOperation({
        target: appData.contractAddress,
        data: encodeFunctionData({
          abi: contractAbi,
          functionName: "updateLivestockValue",
          args: [value],
        }),
        // value: value, // Uncomment and set if needed
      });

      // Wait for the transaction to be mined
      const txnHash = await signer.waitForUserOperationTransaction(hash);
      console.log("txnHash", txnHash);

      return true;
    } catch (error) {
      console.log("Error updating livestock value in contract:", error);
      toast.error(
        "Error updating livestock value in contract. Please try again later."
      );
      return false;
    }
  };

  // aa
  const updateBankerDataInContract = async (uid, email) => {
    try {
      // Initialize the signer using ECDSAProvider
      const signer = await ECDSAProvider.init({
        projectId: appData.projectId,
        owner: getRPCProviderOwner(appData.web3auth.provider),
      });

      // Get the signer's address
      const address = await signer.getAddress();
      console.log("Address: ", address);

      // Send the user operation with the encoded function data
      const { hash } = await signer.sendUserOperation({
        target: appData.contractAddress,
        data: encodeFunctionData({
          abi: contractAbi,
          functionName: "updateBanker",
          args: [email, email],
        }),
        // value: value, // Uncomment and set if needed
      });

      // Wait for the transaction to be mined
      const txnHash = await signer.waitForUserOperationTransaction(hash);
      console.log("txnHash", txnHash);

      return true;
    } catch (error) {
      console.log("Error updating banker data in contract:", error);
      toast.error(
        "Error updating banker data in contract. Please try again later."
      );
      return false;
    }
  };

  const getBankerDataFromContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract(
        appData.contractAddress,
        contractAbi,
        provider
      );
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      const result = await contractWithSigner.bankers(
        appData.blockchain.address
      );
      // console.log("result", result);
      return result;
    } catch (error) {
      // console.log("Error getting banker data from contract:", error);
      toast.error("Error getting banker data from contract");
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        appData,
        setAppData,
        getUserProfileFromId,
        updateFarmForUser,
        signupLivestockOwner,
        signInUser,
        deleteFarmForUser,
        addAnimalForUser,
        initializeWeb3,
        disconnectWallet,
        sendOtp,
        signupBanker,
        fetchAllLivestockOwners,
        updateUserDataInContract,
        updateFarmInContract,
        updateAnimalsInContract,
        updateLivestockValueForUser,
        initWeb3Auth,
      }}
    >
      <Toaster />
      <div className="flex flex-row h-screen">
        <Navbar />
        {loading.status === true ? <Loading message={loading.message} /> : null}
        <div className="flex flex-col w-full overflow-x-hidden bg-black">
          <Header />
          <div className="h-4"></div>
          {/* <Breadcrumbs /> */}
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};
