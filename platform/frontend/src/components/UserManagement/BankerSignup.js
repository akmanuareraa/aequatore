import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { toast } from "react-hot-toast";

import backbutton from "../../assets/svg/left-arrow.svg";

function BankerSignup(props) {
  const navigate = useNavigate();
  const {
    appData,
    setAppData,
    sendOtp,
    initializeWeb3,
    disconnectWallet,
    signupBanker,
    initWeb3Auth,
  } = useContext(AppContext);
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
  });
  const [otp, setOtp] = useState("");

  const validateForm = () => {
    if (formData.email === "") {
      toast.error("Please enter your email");
      return false;
    } else if (formData.confirmEmail === "") {
      toast.error("Please confirm your email");
      return false;
    } else if (formData.email !== formData.confirmEmail) {
      toast.error("Emails do not match");
      return false;
    } else {
      return true;
    }
  };

  const submitForm = async () => {
    // console.log("formData:", formData);
    if (validateForm()) {
      try {
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
          const signUpResult = await signupBanker(formData);
          console.log("signupResult", signUpResult);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center pt-12">
      {/* inner container */}
      <div className="flex flex-col w-[800px]">
        {/* title bar */}
        <div className="flex flex-row items-end justify-between">
          {/* title */}
          <div className="flex flex-col items-start">
            <p className="text-sm text-center text-white">Banker</p>
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

        {/* email and password input container */}
        <div className="grid items-center justify-center w-full grid-cols-2 grid-rows-1 gap-y-4">
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.email}
              onChange={(e) => {
                setPhase(1);
                setFormData((prevState) => {
                  return { ...prevState, email: e.target.value };
                });
              }}
            />
          </div>

          {/* confirm email */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Confirm Email
              </span>
            </label>
            <input
              type="text"
              placeholder="Re-Enter your email"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.confirmEmail}
              onChange={(e) => {
                setPhase(1);
                setFormData((prevState) => {
                  return { ...prevState, confirmEmail: e.target.value };
                });
              }}
            />
          </div>
        </div>

        <button
          className="px-16 py-2 mt-12 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
          onClick={() => {
            submitForm();
          }}
        >
          Sign Up
        </button>

        {/* forward to sign in */}
        <div>
          <p className="pt-12 text-sm text-white">
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

export default BankerSignup;
