import React from "react";

import addBig from "../../../assets/svg/add-big.svg";

function NoAnimal(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-16 space-y-4 text-xl text-white">
      <img src={addBig} className="w-16 h-16" alt="add" />
      <p>No Animals registered.</p>
      <button
        className="px-8 text-xl font-bold capitalize border-0 rounded-full btn bg-gGreen"
        onClick={() => props.setWindowState("newFarm")}
      >
        Register an Animal
      </button>
    </div>
  );
}

export default NoAnimal;
