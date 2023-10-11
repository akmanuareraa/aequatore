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
import contractAbi from "./smart-contract/abi.json";
import testAbi from "./smart-contract/test.json";

import { ethers } from "ethers";

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
    currentHeaderTitle: "",
    breadCrumbs: [],
    blockchain: {
      web3: null,
      address: "",
      balance: 0,
    },
    livestockOwners: [],
    contractAddress: "0x44ABf0aD6D19371973d54809Aa4573757BBf69e7",
    // contractAddress: "0x4A6Ef32d5fc59584301642B7BF9feDb69B91F2A3",
  });

  const [miscData, setMiscData] = useState({
    applicationCount: 0,
  });

  const getUserProfileFromId = async (id) => {
    const collectionRef = collection(db, "users");
    const userDataQuery = query(collectionRef, where("userUid", "==", id));
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

  const updateFarmForUser = async (userId, formData) => {
    // Construct the query
    const q = query(collection(db, "users"), where("userUid", "==", userId));

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

  const signupLivestockOwner = async (formData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Signed in
      const user = userCredential.user;
      const collectionRef = collection(db, "users");

      const docRef = await addDoc(collectionRef, {
        userUid: user.uid,
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
        uid: user.uid,
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

  const signInUser = async (email, password) => {
    try {
      const collectionRef = collection(db, "users");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDataQuery = query(
        collectionRef,
        where("userUid", "==", user.uid)
      );
      const userDataSnapshot = await getDocs(userDataQuery);

      if (!userDataSnapshot.empty) {
        userDataSnapshot.forEach(async (doc) => {
          const userData = doc.data();
          // console.log("userData:", userData);
          if (userData.role === "livestockOwner") {
            if (userData.walletAddress === appData.blockchain.address) {
              toast.success("Signed in successfully");
              setAppData((prevState) => ({
                ...prevState,
                userProfile: userData,
                userId: auth.currentUser.uid,
              }));
              navigate("/dashboard/my-farm");
            } else {
              await signOut(auth);
              toast.error("Please connect to the correct wallet");
            }
          } else if (userData.role === "banker") {
            if (userData.walletAddress === appData.blockchain.address) {
              await fetchAllLivestockOwners();
              toast.success("Signed in successfully");
              setAppData((prevState) => ({
                ...prevState,
                userProfile: userData,
                userId: auth.currentUser.uid,
                currentHeaderTitle: "Banker Dashboard",
              }));
              navigate("/dashboard/banker");
            } else {
              await signOut(auth);
              toast.error("Please connect to the correct wallet");
            }
          }
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

  const deleteFarmForUser = async () => {
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userId)
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

  const addAnimalForUser = async (animalData) => {
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userId)
    );

    try {
      const result = await updateAnimalsInContract(JSON.stringify(animalData));
      const receipt = await wait(result);
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

  const updateLivestockGoalsForUser = async (goalsData) => {
    setLoading({ status: true, message: "Updating livestock goals..." });
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userId)
    );

    try {
      const result = await updateLivestockGoalsInContract(
        JSON.stringify(goalsData)
      );
      if (result === true) {
        // Fetch the data
        const querySnapshot = await getDocs(q);

        for (const queryDoc of querySnapshot.docs) {
          // Access the document reference
          const documentRef = doc(db, "users", queryDoc.id);

          // Update the document with new data
          await updateDoc(documentRef, {
            livestockGoals: goalsData,
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
        toast.error("Error updating livestock goals data in contract");
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

  const updateLivestockValueForUser = async (value) => {
    setLoading({ status: true, message: "Updating livestock value..." });
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userId)
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

  const signupBanker = async (formData) => {
    try {
      // console.log("formData", formData);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // console.log("userCredential", userCredential);

      // Signed in
      const user = userCredential.user;
      const collectionRef = collection(db, "users");

      const docRef = await addDoc(collectionRef, {
        userUid: user.uid,
        email: formData.email,
        role: "banker",
        createdAt: serverTimestamp(),
        walletAddress: appData.blockchain.address,
      });

      // console.log("Document written with ID: ", docRef.id);
      // console.log("dtb", user.uid, formData.email);
      const result = await updateBankerDataInContract(user.uid, formData.email);
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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract(
        appData.contractAddress,
        contractAbi,
        provider
      );
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      const result = await contractWithSigner.updateUser(
        uid,
        name,
        email,
        age,
        income,
        householdSize,
        farm,
        animals,
        livestockGoals,
        "0"
      );
      const receipt = await result.wait();
      console.log("receipt", receipt);
      console.log("result", result);
      // console.log("Farm data updated successfully!");
      if (receipt.status === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error updating user data in contract:", error);
      // toast.error("Error updating user data in contract");
      return false;
    }
  };

  const updateFarmInContract = async (farmData) => {
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
      const result = await contractWithSigner.updateFarm(farmData);
      const receipt = await result.wait();
      // console.log("receipt", receipt);
      // console.log("result", result);
      // console.log("Farm data updated successfully!");
      if (receipt.status === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("Error updating farm data in contract:", error);
      // toast.error("Error updating farm data in contract");
      return false;
    }
  };

  const updateAnimalsInContract = async (animalsData) => {
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
      const result = await contractWithSigner.updateAnimals(
        JSON.stringify(animalsData)
      );
      const receipt = await result.wait();
      // console.log("receipt", receipt);
      // console.log("result", result);
      // console.log("Farm data updated successfully!");
      if (receipt.status === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("Error updating animals data in contract:", error);
      // toast.error("Error updating animals data in contract");
      return false;
    }
  };

  const updateLivestockGoalsInContract = async (livestockGoalsData) => {
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
      const result = await contractWithSigner.updateLivestockGoals(
        livestockGoalsData
      );
      const receipt = await result.wait();
      // console.log("receipt", receipt);
      // console.log("result", result);
      // console.log("Farm data updated successfully!");
      if (receipt.status === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("Error updating livestock goals data in contract:", error);
      // toast.error("Error updating livestock goals data in contract");
      return false;
    }
  };

  const updateLivestockValueInContract = async (value) => {
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
      const result = await contractWithSigner.updateLivestockValue(
        value
      );
      const receipt = await result.wait();
      // console.log("receipt", receipt);
      // console.log("result", result);
      // console.log("Farm data updated successfully!");
      if (receipt.status === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("Error updating livestock goals data in contract:", error);
      // toast.error("Error updating livestock goals data in contract");
      return false;
    }
  };

  const updateBankerDataInContract = async (uid, email) => {
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
      const result = await contractWithSigner.updateBanker(uid, email);
      const receipt = await result.wait();
      // console.log("receipt", receipt);
      // console.log("result", result);
      // console.log("Farm data updated successfully!");
      if (receipt.status === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("Error updating banker data in contract:", error);
      // toast.error("Error updating banker data in contract");
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
        updateLivestockGoalsForUser,
        initializeWeb3,
        disconnectWallet,
        sendOtp,
        signupBanker,
        fetchAllLivestockOwners,
        updateUserDataInContract,
        updateFarmInContract,
        updateAnimalsInContract,
        updateLivestockGoalsInContract,
        updateLivestockValueForUser,
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
