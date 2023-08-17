import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderLite from "../../components/HeaderLite";

import banker from "../../assets/svg/banker.svg";
import livestock from "../../assets/svg/livestock.svg";
import backbutton from "../../assets/svg/left-arrow.svg";

function Signup(props) {
  const location = useLocation();
  const [windowState, setWindowState] = useState("role");
  return (
    <div className="flex flex-col h-screen">
      <HeaderLite />

      {windowState === "role" ? (
        <div className="flex flex-col items-center justify-center pt-12">
          {/* title */}
          <p className="text-5xl font-bold text-center text-white">Sign Up</p>
          {/* roles outer container */}
          <div className="flex flex-row justify-center pt-20 space-x-20">
            {/* banker role outer container */}
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* image and text container */}
              <div className="flex flex-col items-center justify-center p-8 border-2 border-white rounded-md bg-white/10">
                <img src={banker} alt="banker" className="w-20 h-20" />
                <p className="w-40 py-4 text-sm text-center text-white">
                  Sign up as a Banker, to manage loans and loan requests.
                </p>
              </div>
              {/* button */}
              <button
                className="px-12 py-2 text-lg font-bold text-black capitalize border-0 rounded-full w-[380px] h-fit btn bg-gGreen"
                onClick={() => setWindowState("banker")}
              >
                <p className="py-2">Sign Up as a Banker</p>
              </button>
            </div>
            {/* livestock role outer container */}
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* image and text container */}
              <div className="flex flex-col items-center justify-center p-8 border-2 border-white rounded-md bg-white/10">
                <img src={livestock} alt="banker" className="w-20 h-20" />
                <p className="w-40 py-4 text-sm text-center text-white">
                  Sign up as a Livestock Owner, to requests for loans.
                </p>
              </div>
              {/* button */}
              <button
                className="px-12 py-2 text-lg font-bold text-black capitalize border-0 rounded-full w-[380px] h-fit btn bg-gGreen"
                onClick={() => setWindowState("livestock")}
              >
                <p className="py-2">Sign Up as a Livestock Owner</p>
              </button>
            </div>
          </div>
        </div>
      ) : windowState === "banker" ? (
        // outer container
        <div className="flex items-center justify-center pt-12">
          {/* inner container */}
          <div className="flex flex-col w-[800px]">
            {/* title bar */}
            <div className="flex flex-row items-end justify-between">
              {/* title */}
              <div className="flex flex-col items-start">
                <p className="text-sm text-center text-white">Banker</p>
                <p className="text-5xl font-bold text-center text-white">
                  Sign Up
                </p>
              </div>

              {/* back button */}
              <img
                src={backbutton}
                alt="back button"
                className="w-10 h-10 cursor-pointer"
                onClick={() => setWindowState("role")}
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
                />
              </div>

              {/* password */}
              <div className=" form-control">
                <label className="label">
                  <span className="font-bold text-white label-text">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
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
                />
              </div>
            </div>

            {/* banker otp check */}
            <div className="flex flex-col w-full">
              <p className="py-8 pt-12 text-center text-white w-fit">
                An OTP has been sent to your provided email. The OTP will be
                valid for only 5 minutes.
              </p>
            </div>

            {/* otp input */}
            <div className="w-full max-w-xs pb-12 form-control">
              <label className="label">
                <span className="font-bold text-white label-text">OTP</span>
              </label>
              <input
                type="text"
                placeholder="Enter your email OTP"
                className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
              />
            </div>

            {/* submit button */}
            <button className="px-16 py-2 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn">
              Sign In
            </button>

            {/* forward to sign in */}
            <div>
              <p className="pt-4 text-sm text-white">
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
      ) : windowState === "livestock" ? (
        // should have the similar title with name, email, password, confirm password, age, income, household size, register button and forward to sign in

        // outer container
        <div className="flex items-center justify-center pt-12">
          {/* inner container */}
          <div className="flex flex-col w-[800px]">
            {/* title bar */}
            <div className="flex flex-row items-end justify-between">
              {/* title */}
              <div className="flex flex-col items-start">
                <p className="text-sm text-center text-white">
                  Livestock Owner
                </p>
                <p className="text-5xl font-bold text-center text-white">
                  Sign Up
                </p>
              </div>

              {/* back button */}
              <img
                src={backbutton}
                alt="back button"
                className="w-10 h-10 cursor-pointer"
                onClick={() => setWindowState("role")}
              />
            </div>
            <div className="divider before:bg-white/10 after:bg-white/10"></div>

            {/* basic details input container */}
            <div className="grid items-center justify-center w-full grid-cols-2 grid-rows-2 gap-y-4">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="font-bold text-white label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
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
                />
              </div>
              {/* password */}
              <div className=" form-control">
                <label className="label">
                  <span className="font-bold text-white label-text">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
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
                />
              </div>
              {/* income */}
              <div className=" form-control">
                <label className="label">
                  <span className="font-bold text-white label-text">
                    Income
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your income"
                  className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                />
              </div>
              {/* household size */}
              <div className=" form-control">
                <label className="label">
                  <span className="font-bold text-white label-text">
                    Household Size
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your household size"
                  className="w-[400px] max-w-xs text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                />
              </div>
            </div>

            {/* livestock details input container */}
            <div className="flex flex-col mt-12">
              {/* title bar */}
              <p className="text-3xl font-bold text-white">Add Livestock</p>
              <p className="text-sm text-white">
                Provide details about the livestock you own
              </p>

              {/* livestock input container */}
              {/* ...here */}
              
            </div>

            {/* submit button */}
            <button className="px-16 py-2 mt-12 text-lg text-black capitalize border-0 rounded-full w-fit bg-gGreen btn">
              Sign Up
            </button>
            {/* forward to sign in */}
            <div>
              <p className="pt-4 text-sm text-white">
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
      ) : null}
    </div>
  );
}

export default Signup;
