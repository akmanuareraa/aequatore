import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import banker from "../../assets/svg/banker.svg";
import livestock from "../../assets/svg/livestock.svg";

function SignupRoleSelection(props) {
  const navigate = useNavigate();
  return (
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
            onClick={() => props.setWindowState("banker")}
          >
            <p className="py-2">Sign Up as a Banker</p>
          </button>
          <button
            className="px-12 py-2 text-lg font-bold text-black capitalize border-0 rounded-full w-[380px] h-fit btn bg-gGreen"
            onClick={() => navigate("/signin")}
          >
            <p className="py-2">Sign In as a Banker</p>
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
            onClick={() => props.setWindowState("livestock")}
          >
            <p className="py-2">Sign Up as a Livestock Owner</p>
          </button>
          <button
            className="px-12 py-2 text-lg font-bold text-black capitalize border-0 rounded-full w-[380px] h-fit btn bg-gGreen"
            onClick={() => navigate("/signin")}
          >
            <p className="py-2">Sign In as a Livestock Owner</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupRoleSelection;
