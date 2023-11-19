import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";
import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { encodeFunctionData, createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";

import { WALLET_ADAPTERS, CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import addGreen from "../../assets/svg/add-green.svg";
import backbutton from "../../assets/svg/left-arrow.svg";
import removeGreen from "../../assets/svg/remove-green.svg";
import contractAbi from "../../smart-contract/abi.json";

function LivestockSignup(props) {
  const {
    appData,
    setAppData,
    signupLivestockOwner,
    initializeWeb3,
    disconnectWallet,
    initWeb3Auth,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    income: "",
    householdSize: "",
  });

  const handleFormSubmit = async () => {
    try {
      const validations = [
        [formData.name, "Please enter your name"],
        [formData.email, "Please enter your email"],
        [formData.password, "Please provide a password"],
        [formData.age, "Please enter your age"],
        [formData.income, "Please enter your income"],
        [formData.householdSize, "Please enter your household size"],
      ];

      console.log("validations", appData.web3auth);

      const result = await appData.web3auth.connect();

      console.log("result", result);

      setAppData((prevState) => {
        return {
          ...prevState,
          web3Provider: result,
        };
      });
      
      const web3authResult = await initWeb3Auth();
      if (web3authResult === true) {
        const signupResult = await signupLivestockOwner(formData);
        console.log("signupResult", signupResult);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex items-center justify-center pt-12">
      {/* inner container */}
      <div className="flex flex-col w-[800px]">
        {/* =========================================== */}
        {/* copied */}
        {/* title bar */}
        <div className="flex flex-row items-end justify-between">
          {/* title */}
          <div className="flex flex-col items-start">
            <p className="text-sm text-center text-white">Livestock Owner</p>
            <p className="text-5xl font-bold text-center text-white">Sign Up</p>
          </div>

          {/* back button */}
          <img
            src={backbutton}
            alt="back button"
            className="w-10 h-10 cursor-pointer"
            onClick={() => props.setWindowState("role")}
          />
        </div>
        <div className="divider before:bg-white/10 after:bg-white/10"></div>

        {/* basic details input container */}
        <div className="grid items-center justify-center w-full grid-cols-2 grid-rows-2 mb-8 gap-y-4">
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>

          {/* email */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>

          {/* age */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Age</span>
            </label>
            <input
              type="text"
              placeholder="Enter your age"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
              }}
            />
          </div>
          {/* income */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Income</span>
            </label>
            <input
              type="text"
              placeholder="Enter your income"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.income}
              onChange={(e) => {
                setFormData({ ...formData, income: e.target.value });
              }}
            />
          </div>
          {/* household size */}
          <div className="col-span-2 form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Household Size
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your household size"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.householdSize}
              onChange={(e) => {
                setFormData({ ...formData, householdSize: e.target.value });
              }}
            />
          </div>
        </div>

        {/* ======================================= */}
        {/* submit button */}
        <button
          className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
          onClick={async () => {
            console.log("sign up clicked");
            await handleFormSubmit();
          }}
        >
          Sign Up
        </button>

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
