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
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./services/firebase.config";
import Web3 from "web3";

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
  });

  const [miscData, setMiscData] = useState({
    applicationCount: 0,
  });

  const backendUrl = "http://localhost:3010";

  const getUserProfileFromId = async (id) => {
    const collectionRef = collection(db, "users");
    const userDataQuery = query(collectionRef, where("userUid", "==", id));
    const userDataSnapshot = await getDocs(userDataQuery);
    let uData = null;

    if (!userDataSnapshot.empty) {
      userDataSnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("userData:", userData);
        uData = userData;
      });
      return uData;
    } else {
      console.log("No matching documents found for the user.");
      return null;
    }
  };

  const updateFarmForUser = async (userId, formData) => {
    // Construct the query
    const q = query(collection(db, "users"), where("userUid", "==", userId));

    try {
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
        console.log("Document successfully updated!");
        toast.success("Farm registered successfully!");
        return true; // Indicate success for at least one document
      }

      // If the loop completes without returning, no documents matched the query
      toast.error("No matching documents found!");
      return false;
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

      console.log("Document written with ID: ", docRef.id);
      toast.success("Signup Successful");
      navigate("/signin");

      return true; // Success
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
          console.log("userData:", userData);
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
        console.log("No matching documents found for the user.");
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
      // Fetch the data
      const querySnapshot = await getDocs(q);

      for (const queryDoc of querySnapshot.docs) {
        // Access the document reference
        const documentRef = doc(db, "users", queryDoc.id);

        // Update the document with new data
        await updateDoc(documentRef, {
          farm: {},
        });
        console.log("Document successfully updated!");
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
        console.log("Data updated successfully!");
        toast.success("Data updated successfully!");
        return true; // Indicate success for at least one document
      }

      // If the loop completes without returning, no documents matched the query
      toast.error("No matching documents found!");
      return false;
    } catch (error) {
      console.error("Error updating data: ", error);
      toast.error("Error updating data");
      return false;
    }
  };

  const updateLivestockGoalsForUser = async (goalsData) => {
    // Construct the query
    const q = query(
      collection(db, "users"),
      where("userUid", "==", appData.userId)
    );

    try {
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
        console.log("Data updated successfully!");
        // toast.success("Data updated successfully!");
        return true; // Indicate success for at least one document
      }

      // If the loop completes without returning, no documents matched the query
      toast.error("No matching documents found!");
      return false;
    } catch (error) {
      console.error("Error updating data: ", error);
      toast.error("Error updating data");
      return false;
    }
  };

  const initializeWeb3 = async () => {
    console.log("Initializing Web3...");
    if (window.ethereum) {
      console.log("MetaMask found");
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access
        console.log("Requesting account access...");
        await window.ethereum.enable();

        console.log("Fetching accounts...");
        const accounts = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();

        // Check if connected to the Polygon testnet
        if (parseInt(chainId) !== 80001) {
          console.log(
            "Not connected to Polygon testnet",
            accounts,
            parseInt(chainId)
          );
          try {
            // Add the Polygon testnet
            console.log("Adding Polygon testnet...");
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
            console.error("Error adding Polygon testnet:", error);
          }
        }

        // Check MATIC balance
        try {
          console.log("Checking balance...", accounts, chainId);
          const balance = await web3.eth.getBalance(accounts[0]);
          console.log(
            "Balance:",
            balance,
            web3.utils.fromWei(balance, "ether")
          );
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
          console.error("Error checking balance:", error);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not found");
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
      console.log("response", response);
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
      console.log("error", error);
      return false;
    }
  };

  const signupBanker = async (formData) => {
    try {
      console.log("formData", formData);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("userCredential", userCredential);

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

      console.log("Document written with ID: ", docRef.id);
      toast.success("Signup Successful");
      navigate("/signin");

      return true; // Success
    } catch (error) {
      console.log("error", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);

      return false; // Failure
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
      }}
    >
      <Toaster />
      <div className="flex flex-row h-screen">
        <Navbar />
        {loading.status === "true" ? (
          <Loading message={loading.message} />
        ) : null}
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
