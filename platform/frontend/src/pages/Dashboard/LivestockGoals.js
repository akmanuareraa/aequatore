import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoGoals from "../../components/Dashboard/LivestockGoals/NoGoals";
import AllGoals from "../../components/Dashboard/LivestockGoals/AllGoals";
import CreateNewGoal from "../../components/Dashboard/LivestockGoals/CreateNewGoal";

function LivestockGoals(props) {
  const navigate = useNavigate();
  const [tabView, setTabView] = useState("all");
  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        <div className="flex flex-row items-center justify-between">
          {/* title */}
          <p className="text-2xl font-bold text-white">Livestock Goals</p>
          {/* side button container */}
          <div className="flex flex-row items-center space-x-4">
            {/* <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => props.submitForm()}
            >
              Create a Group
            </button> */}
            <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => navigate("/dashboard/livestock-goals/create")}
            >
              Create a Goal
            </button>
          </div>
        </div>
        {tabView === "all" ? (
          <AllGoals />
        ) : tabView === "register" ? (
          <CreateNewGoal />
        ) : tabView === "no" ? (
          <NoGoals />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LivestockGoals;
