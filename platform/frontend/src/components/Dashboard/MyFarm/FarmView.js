import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";

function FarmView(props) {
  const { appData, setAppData, deleteFarmForUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [tabView, setTabView] = useState("information");

  const deleteFarm = async () => {
    const deleteStatus = await deleteFarmForUser(appData.userProfile.userUid);
    if (deleteStatus === true) {
      navigate("/dashboard/my-farm");
    }
  };
  return (
    <div>
      {/* titlebar */}
      <div className="flex flex-row items-center justify-between">
        {/* title */}
        <p className="text-2xl font-bold text-white">
          {" "}
          {appData.userProfile.name}
          's Farm
        </p>
        {/* side button container */}
        <div className="flex flex-row items-center space-x-4">
          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => props.setWindowState("editFarm")}
          >
            Edit Farm
          </button>
          {/* <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => props.submitForm()}
          >
            Zones
          </button> */}
          <button
            className="px-10 py-3 font-bold capitalize bg-black border-4 rounded-full text-red border-red text-md h-fit btn btn-sm hover:text-black hover:bg-red hover:border-red"
            onClick={() => deleteFarm()}
          >
            Delete Farm
          </button>
        </div>
      </div>

      {/* basic details bar */}
      <div className="grid items-center justify-center grid-cols-6 p-4 py-6 mt-6 bg-gLightGray/30">
        {/* farm name */}
        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Farm Name</p>
          <p className="text-lg font-bold text-white">
            {appData.userProfile.farm.farmName}
          </p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Farm Owner</p>
          <p className="text-lg font-bold text-white">
            {appData.userProfile.farm.farmOwner}
          </p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Govt. Registry</p>
          <p className="text-lg font-bold text-white">
            {appData.userProfile.farm.farmOwner}
          </p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Cooperative/Union ID</p>
          <p className="text-lg font-bold text-white">
            {appData.userProfile.farm.unionId}
          </p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Cooperative/Union Name</p>
          <p className="text-lg font-bold text-white">
            {appData.userProfile.farm.unionName}
          </p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1">
          <p className="text-xs text-white">Date of Registration</p>
          <p className="text-lg font-bold text-white">
            {appData.userProfile.farm.createdAt
              ? new Date(
                  appData.userProfile.farm.createdAt.seconds * 1000
                ).toLocaleDateString("en-GB")
              : "--"}
          </p>
        </div>
      </div>

      {/* tab view */}
      <div className="flex flex-col p-4 mt-6 bg-gLightGray/30">
        {/* tab */}
        <div className="rounded-md tabs tabs-boxed bg-gLightGray/20">
          <a
            className={
              tabView === "information"
                ? "text-white tab tab-active"
                : "text-white tab"
            }
            onClick={() => setTabView("information")}
          >
            Information
          </a>

          <a
            className={
              tabView === "license"
                ? "text-white tab tab-active"
                : "text-white tab"
            }
            onClick={() => setTabView("license")}
          >
            License Info
          </a>
          <a
            className={
              tabView === "location"
                ? "text-white tab tab-active"
                : "text-white tab"
            }
            onClick={() => setTabView("location")}
          >
            Location and Size
          </a>
        </div>

        {/* tab content */}
        <div className="mt-4">
          {tabView === "information" ? (
            // farm information
            <div className="grid items-center justify-center grid-cols-3 p-4 py-6 rounded-md gap-y-2 bg-gLightGray/30">
              {/* farm name */}
              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Owner</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.farmOwner}
                </p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Ownership Type</p>
                <p className="text-lg font-bold text-white capitalize">
                  {appData.userProfile.farm.ownershipType}
                </p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              {/* <div className="flex flex-col items-center w-full space-y-1">
                <p className="text-xs text-white">Farming System</p>
                <p className="text-lg font-bold text-white">Organic</p>
              </div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-white/40">
                <p className="text-xs text-white">Cooperative/Union ID</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.unionId}
                </p>
              </div>

              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40 "></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Cooperative/Union Name</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.unionName}
                </p>
              </div>
            </div>
          ) : tabView === "license" ? (
            // license info
            <div className="grid items-center justify-center grid-cols-3 p-4 py-6 rounded-md gap-y-2 bg-gLightGray/30">
              {/* farm name */}
              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">License Number</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.licenseNumber}
                </p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">License Expiry Date</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.licenseExpiryDate}
                </p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1">
                <p className="text-xs text-white">Regulator Name</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.regulatorName}
                </p>
              </div>

              {/* <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40 "></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div> */}

              {/* <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">
                  Regulator Representative Name
                </p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.regulatorRepName}
                </p>
              </div> */}
            </div>
          ) : tabView === "location" ? (
            // location and size
            <div className="grid items-center justify-center grid-cols-3 p-4 py-6 rounded-md gap-y-2 bg-gLightGray/30">
              {/* farm name */}
              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Address</p>
                <p className="text-lg font-bold text-center text-white">
                  {appData.userProfile.farm.farmAddress}
                </p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              {/* <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Country</p>
                <p className="text-lg font-bold text-white">United States</p>
              </div> */}

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              {/* <div className="flex flex-col items-center w-full space-y-1">
                <p className="text-xs text-white">Province/State</p>
                <p className="text-lg font-bold text-white">Manhattan</p>
              </div>

              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40 "></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Village/Town/City</p>
                <p className="text-lg font-bold text-white">New York</p>
              </div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Postal/Zip Code</p>
                <p className="text-lg font-bold text-white">123456</p>
              </div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Number</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.farmNumber}
                </p>
              </div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Size</p>
                <p className="text-lg font-bold text-white">
                  {appData.userProfile.farm.farmSize}
                </p>
              </div>

              {/* <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40 "></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div> */}

              {/* <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Geofence</p>
                <p className="text-lg font-bold text-white">Mapped</p>
              </div> */}
            </div>
          ) : null}
        </div>
      </div>

      {/* farm animals */}
      <div className="my-10">
        {/* title bar */}
        <div className="flex flex-row justify-between">
          <p className="text-2xl font-bold text-white">Farm Animals</p>
          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => navigate("/dashboard/animals/register")}
          >
            Add Animal
          </button>
        </div>

        {/* animal data */}
        <div className="flex flex-row items-center space-x-8">
          {/* male */}
          <div className="flex flex-row items-center justify-center p-8 space-x-8 rounded-md bg-gLightGray/30 w-fit">
            <div className="flex flex-col items-center justify-center">
              <p className="text-white">Male</p>
              <p className="text-4xl font-bold text-white">
                {appData.userProfile.livestock.length === 0 ? 0 : "value"}
              </p>
            </div>
            <button
              className="text-black capitalize bg-white border-0 rounded-sm btn btn-sm"
              onClick={() => navigate("/dashboard/animals")}
            >
              View
            </button>
          </div>

          {/* female */}
          <div className="flex flex-row items-center justify-center p-8 space-x-8 rounded-md bg-gLightGray/30 w-fit">
            <div className="flex flex-col items-center justify-center">
              <p className="text-white">Female</p>
              <p className="text-4xl font-bold text-white">
                {appData.userProfile.livestock.length === 0 ? 0 : "value"}
              </p>
            </div>
            <button
              className="text-black capitalize bg-white border-0 rounded-sm btn btn-sm"
              onClick={() => navigate("/dashboard/animals")}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmView;
