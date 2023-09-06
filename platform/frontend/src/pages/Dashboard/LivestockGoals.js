import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import NoGoals from "../../components/Dashboard/LivestockGoals/NoGoals";
import AllGoals from "../../components/Dashboard/LivestockGoals/AllGoals";
import CreateNewGoal from "../../components/Dashboard/LivestockGoals/CreateNewGoal";

function LivestockGoals(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const [tabView, setTabView] = useState("no");

  useEffect(() => {
    if (appData.userProfile.livestockGoals.length === 0) {
      setTabView("no");
    } else {
      setTabView("all");
    }
  }, [appData.userProfile]);

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {tabView === "all" ? (
          <>
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
                  onClick={() => {
                    setTabView("register");
                  }}
                >
                  Create a Goal
                </button>
              </div>
            </div>
            <AllGoals />
          </>
        ) : tabView === "register" ? (
          <CreateNewGoal setTabView={setTabView} appData={appData} />
        ) : tabView === "no" ? (
          <>
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
                  onClick={() => {
                    setTabView("register");
                  }}
                >
                  Create a Goal
                </button>
              </div>
            </div>
            <NoGoals setTabView={setTabView} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LivestockGoals;
