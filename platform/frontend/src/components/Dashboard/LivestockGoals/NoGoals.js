import React from "react";
import { useNavigate } from "react-router-dom";

import addBig from "../../../assets/svg/add-big.svg";

function NoGoals(props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-16 space-y-4 text-xl text-white">
      <img src={addBig} className="w-16 h-16" alt="add" />
      <p>No Goals Created</p>
      <button
        className="px-8 text-xl font-bold capitalize border-0 rounded-full btn bg-gGreen"
        onClick={() => props.setTabView("register")}
      >
        Create a Goal
      </button>
    </div>
  );
}

export default NoGoals;
