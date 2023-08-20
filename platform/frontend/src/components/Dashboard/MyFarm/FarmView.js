import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FarmView(props) {
  const navigate = useNavigate();
  const [tabView, setTabView] = useState("information");
  return (
    <div>
      {/* titlebar */}
      <div className="flex flex-row items-center justify-between">
        {/* title */}
        <p className="text-2xl font-bold text-white">John's Farm</p>
        {/* side button container */}
        <div className="flex flex-row items-center space-x-4">
          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => props.submitForm()}
          >
            Edit Farm
          </button>
          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => props.submitForm()}
          >
            Zones
          </button>
          <button
            className="px-10 py-3 font-bold capitalize bg-black border-4 rounded-full text-red border-red text-md h-fit btn btn-sm hover:text-black hover:bg-red hover:border-red"
            onClick={() => props.setWindowState("noFarm")}
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
          <p className="text-lg font-bold text-white">John's Farm</p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Farm Owner</p>
          <p className="text-lg font-bold text-white">John Doe</p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Govt. Registry</p>
          <p className="text-lg font-bold text-white">1234567</p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Cooperative/Union ID</p>
          <p className="text-lg font-bold text-white">ABC4589663</p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
          <p className="text-xs text-white">Cooperative/Union Name</p>
          <p className="text-lg font-bold text-white">ABC Cooperative</p>
        </div>

        {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

        <div className="flex flex-col items-center w-full space-y-1">
          <p className="text-xs text-white">Date of Registration</p>
          <p className="text-lg font-bold text-white">08-12-2020</p>
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
                <p className="text-lg font-bold text-white">John Doe</p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Ownership Type</p>
                <p className="text-lg font-bold text-white">Personal</p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1">
                <p className="text-xs text-white">Farming System</p>
                <p className="text-lg font-bold text-white">Organic</p>
              </div>

              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40 "></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Cooperative/Union ID</p>
                <p className="text-lg font-bold text-white">ABC4589663</p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Cooperative/Union Name</p>
                <p className="text-lg font-bold text-white">ABC Cooperative</p>
              </div>
            </div>
          ) : tabView === "license" ? (
            // license info
            <div className="grid items-center justify-center grid-cols-3 p-4 py-6 rounded-md gap-y-2 bg-gLightGray/30">
              {/* farm name */}
              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">License Number</p>
                <p className="text-lg font-bold text-white">1234567890</p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">License Expiry Date</p>
                <p className="text-lg font-bold text-white">08-12-2020</p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1">
                <p className="text-xs text-white">Regulator Name</p>
                <p className="text-lg font-bold text-white">DAA</p>
              </div>

              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40 "></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">
                  Regualtor Representative Name
                </p>
                <p className="text-lg font-bold text-white">David Joe</p>
              </div>
            </div>
          ) : tabView === "location" ? (
            <div className="grid items-center justify-center grid-cols-3 p-4 py-6 rounded-md gap-y-2 bg-gLightGray/30">
              {/* farm name */}
              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Address</p>
                <p className="text-lg font-bold text-center text-white">
                  123 Main St.
                  <br />
                  New York, NY 10030
                  <br />
                  United States
                </p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Country</p>
                <p className="text-lg font-bold text-white">United States</p>
              </div>

              {/* <div className="divider divider-horizontal before:bg-white/40 after:bg-white/40"></div> */}

              <div className="flex flex-col items-center w-full space-y-1">
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
              </div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Number</p>
                <p className="text-lg font-bold text-white">5231945681</p>
              </div>

              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40 "></div>
              <div className="px-8 divider before:bg-white/40 after:bg-white/40"></div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Size</p>
                <p className="text-lg font-bold text-white">2 Acre</p>
              </div>

              <div className="flex flex-col items-center w-full space-y-1 border-r-2 border-white/40">
                <p className="text-xs text-white">Farm Geofence</p>
                <p className="text-lg font-bold text-white">Mapped</p>
              </div>
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
            onClick={() => {}}
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
              <p className="text-4xl font-bold text-white">20</p>
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
              <p className="text-4xl font-bold text-white">20</p>
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
