import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import toast from "react-hot-toast";

function LivestockValueView(props) {
  const { appData, setAppData, updateLivestockValueForUser } =
    useContext(AppContext);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // console.log("LivestockValueView", appData);
    if (
      appData.userProfile.livestockValue &&
      appData.userProfile.livestockValue >= 0
    ) {
    //   console.log("value found in BE");
      setValue(appData.userProfile.livestockValue);
    } else {
    //   console.log("value not found in BE");
    }
  }, [props]);

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      {/* titlebar */}
      <div className="flex flex-row items-center justify-between">
        {/* title */}
        <p className="text-2xl font-bold text-white">Livestock Value</p>
        {/* side button container */}
        <div className="flex flex-row items-center space-x-4">
          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={async () => {
              if (value === "" || value <= 0) {
                toast.error("Please enter a valid value");
                return;
              } else {
                const result = await updateLivestockValueForUser(value);
                if (result === true) {
                  toast.success("Livestock value updated successfully");
                } else {
                  toast.error("Error updating livestock value");
                }
              }
            }}
          >
            Save
          </button>
          {/* {editMode === true ? (
            <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => submitForm()}
            >
              Save
            </button>
          ) : null}
          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode === true ? "Cancel Edit" : "Edit"}
          </button> */}
          {/* <button
            className="px-10 py-3 font-bold capitalize bg-black border-4 rounded-full text-red border-red text-md h-fit btn btn-sm hover:text-black hover:bg-red hover:border-red"
            onClick={() => {}}
          >
            Delete
          </button> */}
          {/* <button
            className="px-10 py-3 font-bold text-white capitalize bg-black border-4 border-white rounded-full text-md h-fit btn btn-sm hover:text-black"
            onClick={() => {
              navigate("/dashboard/livestock-goals");
            }}
          >
            Back
          </button> */}
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        {/* live stock value */}
        <div className="flex flex-row items-center space-x-4">
          <div className="form-control">
            {/* <label className="label">
            <span className="font-bold text-white label-text">Goal Name</span>
          </label> */}
            <input
              type="text"
              placeholder="Enter the value"
              className="text-3xl w-[350px] h-fit px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <p className="text-xl font-bold">EUR</p>
        </div>

        <div className="flex flex-row items-center space-x-4 w-fit">
          <p className="text-3xl">{(value * 1.06).toFixed(2) || 0}</p>
          <p className="text-xl font-bold">USD</p>
        </div>
      </div>
    </div>
  );
}

export default LivestockValueView;
