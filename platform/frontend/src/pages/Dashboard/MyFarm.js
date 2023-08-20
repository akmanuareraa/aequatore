import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import moreInfo from "../../assets/svg/more-info.svg";
import NoFarm from "../../components/Dashboard/MyFarm/NoFarm";
import NewFarm from "../../components/Dashboard/MyFarm/NewFarm";
import FarmView from "../../components/Dashboard/MyFarm/FarmView";

function MyFarm(props) {
  const [windowState, setWindowState] = useState("farmView");
  const [formData, setFormData] = useState({
    farmName: "",
    farmOwner: "",
    ownershipType: "",
    govtRegNumber: "",
    farmingSystem: [],
    unionId: "",
    unionName: "",
    licenseNumber: "",
    licenseExpiryDate: "",
    regulatorName: "",
    farmAddress: "",
    farmNumber: "",
    farmSize: "",
  });
  const [dropdownState, setDropdownState] = useState({
    ownershipDropdownOpen: false,
    farmingSystemDropdownOpen: false,
  });
  const [tooltipState, setTooltipState] = useState({
    farmingSystemTooltipHover: false,
    unionIdTooltipHover: false,
    regulatorNameTooltipHover: false,
    farmNumberTooltipHover: false,
  });

  const handleOwnershipTypeChange = (value) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        ownershipType: value,
      };
    });
    setDropdownState((prevState) => {
      return {
        ...prevState,
        ownershipDropdownOpen: false,
      };
    });
  };

  const handleFarmingSystemChange = (value) => {
    let tempArr = formData.farmingSystem;
    console.log("s-s-s-s-s-s");
    console.log("tempArr", tempArr);
    if (tempArr.includes(value)) {
      console.log("removing", value);
      tempArr = tempArr.filter((item) => item !== value);
    } else {
      console.log("adding", value);
      tempArr.push(value);
    }
    console.log("tempArr", tempArr);
    console.log("-f-f-f-f-f-");
    setFormData((prevState) => {
      return {
        ...prevState,
        farmingSystem: tempArr,
      };
    });
  };

  const submitForm = () => {
    console.log(formData);
  };

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      {windowState === "newFarm" ? (
        <NewFarm
          formData={formData}
          setFormData={setFormData}
          dropdownState={dropdownState}
          setDropdownState={setDropdownState}
          tooltipState={tooltipState}
          setTooltipState={setTooltipState}
          handleOwnershipTypeChange={handleOwnershipTypeChange}
          handleFarmingSystemChange={handleFarmingSystemChange}
          submitForm={submitForm}
          setWindowState={setWindowState}
        />
      ) : windowState === "noFarm" ? (
        <NoFarm setWindowState={setWindowState} />
      ) : windowState === "farmView" ? (
        <FarmView />
      ) : null}
    </div>
  );
}

export default MyFarm;
