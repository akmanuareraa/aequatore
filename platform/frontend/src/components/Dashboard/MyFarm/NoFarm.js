import React from "react";

import addDocument from "../../../assets/svg/document-big.svg";

function NoFarm(props) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <img src={addDocument} alt="add document" className="w-32 h-32" />
      <div>
        <p className="text-center text-white text-md">
          No farm has been registered yet.
        </p>
        <p className="text-center text-white text-md">
          Please register a farm to get started.
        </p>
      </div>
      <button
        className="px-8 text-xl font-bold capitalize border-0 rounded-full btn bg-gGreen"
        onClick={() => props.setWindowState("newFarm")}
      >
        Register a Farm
      </button>
    </div>
  );
}

export default NoFarm;
