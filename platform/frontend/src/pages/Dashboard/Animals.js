import React, { useState } from "react";
import NoAnimal from "../../components/Dashboard/Animals/NoAnimal";
import AllAnimalView from "../../components/Dashboard/Animals/AllAnimalView";

function Animals(props) {
  const [tabView, setTabView] = useState("all");
  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        <div className="flex flex-row items-center justify-between">
          {/* title */}
          <p className="text-2xl font-bold text-white">Animals</p>
          {/* side button container */}
          <div className="flex flex-row items-center space-x-4">
            <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => props.submitForm()}
            >
              Create a Group
            </button>
            <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => props.submitForm()}
            >
              Register an Animal
            </button>
          </div>
        </div>

        <NoAnimal />

        <AllAnimalView />
      </div>
    </div>
  );
}

export default Animals;
