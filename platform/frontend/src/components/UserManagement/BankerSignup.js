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
  } = useContext(AppContext);
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");

  const validateForm = () => {
    if (formData.email === "") {
      toast.error("Please enter your email");
      return false;
    } else if (formData.confirmEmail === "") {
      toast.error("Please confirm your email");
      return false;
    } else if (formData.password === "") {
      toast.error("Please enter your password");
      return false;
    } else if (formData.confirmPassword === "") {
      toast.error("Please confirm your password");
      return false;
    } else if (formData.email !== formData.confirmEmail) {
      toast.error("Emails do not match");
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    } else {
      return true;
    }
  };

  const submitForm = async () => {
    console.log("formData:", formData);
    if (validateForm()) {
      try {
        const signUpResult = await signupBanker(formData);
        console.log("signUpResult:", signUpResult);
      } catch (error) {
        console.log(error);
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
        <div className="grid items-center justify-center w-full grid-cols-2 grid-rows-2 gap-y-4">
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

          {/* password */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.password}
              onChange={(e) => {
                setPhase(1);
                setFormData((prevState) => {
                  return { ...prevState, password: e.target.value };
                });
              }}
            />
          </div>

          {/* confirm password */}
          <div className=" form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Re-Enter your password"
              className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              value={formData.confirmPassword}
              onChange={(e) => {
                setPhase(1);
                setFormData((prevState) => {
                  return { ...prevState, confirmPassword: e.target.value };
                });
              }}
            />
          </div>
        </div>

        {/* otp input */}
        {phase === 2 ? (
          <>
            {/* banker otp check */}
            <div className="flex flex-col w-full">
              <p className="py-8 pt-12 text-center text-white w-fit">
                An OTP has been sent to your provided email. Do not refresh the
                page.
              </p>
            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="font-bold text-white label-text">OTP</span>
              </label>
              <input
                type="text"
                placeholder="Enter your email OTP"
                className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {phase === 2 ? (
                <p
                  className="mt-2 text-white underline underline-offset-2 hover:cursor-pointer"
                  onClick={async () => {
                    const sendResult = await sendOtp(formData.email);
                    if (sendResult === true) {
                      toast.success("OTP sent successfully");
                    } else {
                      toast.error(
                        "Error occured while sending email. Try again."
                      );
                    }
                  }}
                >
                  Resend OTP
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {/* submit button */}
        {phase === 1 ? (
          <button
            className="px-16 py-2 mt-12 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
            onClick={async () => {
              if (validateForm()) {
                const sendResult = await sendOtp(formData.email);
                if (sendResult === true) {
                  setPhase(2);
                } else {
                  toast.error("Error occured while sending email. Try again.");
                }
              }
            }}
          >
            Send OTP
          </button>
        ) : phase === 2 ? (
          <button
            className="px-16 py-2 mt-12 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
            onClick={() => {
              console.log("otp:", otp, appData.otp);
              if (parseInt(otp) === appData.otp) {
                setPhase(3);
                toast.success("OTP verified successfully");
              } else {
                toast.error("OTP does not match");
              }
            }}
          >
            Verify OTP
          </button>
        ) : phase === 3 ? (
          <button
            className="px-16 py-2 mt-12 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
            onClick={() => {
              if (appData.blockchain.address === "") {
                toast.error("Please connect wallet first");
                return;
              } else {
                submitForm();
              }
            }}
          >
            Sign Up
          </button>
        ) : null}

        {appData.blockchain.address === "" ? (
          <div className="flex flex-col mt-12 space-y-2">
            <p className="text-white">Wallet not Connected</p>
            <button
              className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
              onClick={() => {
                initializeWeb3();
              }}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="flex flex-col mt-12 space-y-2">
            <p className="text-white">{appData.blockchain.address}</p>
            <button
              className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn"
              onClick={() => {
                disconnectWallet();
              }}
            >
              Disconnect Wallet
            </button>
          </div>
        )}

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
