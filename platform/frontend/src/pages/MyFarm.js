import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import addDocument from "../assets/svg/document-big.svg";

function MyFarm(props) {
  return (
    <div className="w-full h-full p-4 bg-black">
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
        <button className="px-8 text-xl font-bold capitalize border-0 rounded-full btn bg-gGreen">
          Register a Farm
        </button>
      </div>
    </div>
  );
}

export default MyFarm;
