import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function BankerDashboard(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        <div className="flex flex-row items-center justify-between">
          {/* title */}
          <p className="text-2xl font-bold text-white">Livestock Owners</p>
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
              onClick={() => navigate("/dashboard/animals/register")}
            >
              Register an Animal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankerDashboard;
