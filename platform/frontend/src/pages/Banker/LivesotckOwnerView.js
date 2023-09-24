import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function LivesotckOwnerView(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("liv", appData.livestockOwnerInView);
  }, [appData.livestockOwnerInView]);

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        <div className="flex flex-row items-center justify-between">
          {/* title */}
          <p className="text-2xl font-bold text-white">Livestock Owner</p>
          {/* side button container */}
          <div className="flex flex-row items-center space-x-4">
            <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => navigate("/dashboard/banker")}
            >
              Back
            </button>
          </div>
        </div>

        {/* details */}
        <div className="grid grid-cols-3 p-4 mt-6 gap-y-8">
          {/* name */}
          <div className="flex flex-col space-y-0">
            <p className="text-xs font-bold text-white">Name</p>
            <p className="text-2xl font-bold text-white">
              {appData.livestockOwnerInView.name}
            </p>
          </div>

          {/* age */}
          <div className="flex flex-col space-y-0">
            <p className="text-xs font-bold text-white">Age</p>
            <p className="text-2xl font-bold text-white">
              {appData.livestockOwnerInView.age}
            </p>
          </div>

          {/* email */}
          <div className="flex flex-col space-y-0">
            <p className="text-xs font-bold text-white">Email</p>
            <p className="text-2xl font-bold text-white">
              {appData.livestockOwnerInView.email}
            </p>
          </div>

          {/* income */}
          <div className="flex flex-col space-y-0">
            <p className="text-xs font-bold text-white">Income</p>
            <p className="text-2xl font-bold text-white">
              {appData.livestockOwnerInView.income}
            </p>
          </div>

          {/* household size */}
          <div className="flex flex-col space-y-0">
            <p className="text-xs font-bold text-white">Household Size</p>
            <p className="text-2xl font-bold text-white">
              {appData.livestockOwnerInView.householdSize}
            </p>
          </div>

          {/* animal population */}
          <div className="flex flex-col space-y-0">
            <p className="text-xs font-bold text-white">Animal Population</p>
            <p className="text-2xl font-bold text-white">
              {appData.livestockOwnerInView.animals.length}
            </p>
          </div>

          <div className="col-span-3 p-0 m-0 divider before:bg-white/10 after:bg-white/10"></div>

          <p className="col-span-3 text-3xl font-bold text-white">
            Loan Details
          </p>

          {/* loan amount */}
          <div className="flex flex-col col-span-3 space-y-0">
            <p className="text-xs font-bold text-white">Loan Amount Granted</p>
            <p className="text-2xl font-bold text-white">0</p>
          </div>

          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => {}}
          >
            Grant Loan
          </button>
        </div>
      </div>
    </div>
  );
}

export default LivesotckOwnerView;
