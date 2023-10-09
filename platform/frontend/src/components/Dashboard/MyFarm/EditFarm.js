import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../AppContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../services/firebase.config";

import moreInfo from "../../../assets/svg/more-info.svg";
import { toast } from "react-hot-toast";

function EditFarm(props) {
  const { appData, setAppData, getUserProfileFromId, updateFarmForUser } =
    useContext(AppContext);
  const collectionRef = collection(db, "users");
  const [formData, setFormData] = useState({});

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

  useEffect(() => {
    setFormData(appData.userProfile.farm);
    setAppData((prevState) => {
      return {
        ...prevState,
        currentHeaderTitle: "Edit Farm",
      };
    });
  }, []);

  const formValidation = () => {
    if (formData.farmName === "") {
      toast.error("Farm name cannot be empty!");
      return false;
    } else if (formData.farmOwner === "") {
      toast.error("Farm owner cannot be empty!");
      return false;
    } else if (formData.ownershipType === "") {
      toast.error("Ownership type cannot be empty!");
      return false;
    } else if (formData.govtRegistrationNumber === "") {
      toast.error("Govt. registration number cannot be empty!");
      return false;
    } else if (formData.unionId === "") {
      toast.error("Farm address cannot be empty!");
      return false;
    } else if (formData.unionName === "") {
      toast.error("Farm size cannot be empty!");
      return false;
    } else if (formData.licenseNumber === "") {
      toast.error("License number cannot be empty!");
      return false;
    } else if (formData.licenseExpiryDate === "") {
      toast.error("License expiry date cannot be empty!");
      return false;
    } else if (formData.regulatorName === "") {
      toast.error("Regulator name cannot be empty!");
      return false;
    } else if (formData.farmAddress === "") {
      toast.error("Farm address cannot be empty!");
      return false;
    } else if (formData.farmNumber === "") {
      toast.error("Farm number cannot be empty!");
      return false;
    } else if (formData.farmSize === "") {
      toast.error("Farm size cannot be empty!");
      return false;
    } else {
      return true;
    }
  };

  const submitForm = async () => {
    // console.log("formData", formData);
    try {
      if (!formValidation()) {
        return;
      }
      const updateResult = await updateFarmForUser(
        auth.currentUser.uid,
        formData
      );
      if (updateResult === true) {
        const userData = await getUserProfileFromId(auth.currentUser.uid);
        setAppData((prevState) => {
          return {
            ...prevState,
            userProfile: userData,
          };
        });
      } else {
        toast.error("Error updating farm. Try again.");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      {/* titlebar */}
      <div className="flex flex-row items-center justify-between mt-6">
        {/* title */}
        <p className="text-2xl font-bold text-white">New Farm Registration</p>
        {/* side button container */}
        <div className="flex flex-row items-center space-x-4">
          <button
            className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
            onClick={() => submitForm()}
          >
            Save
          </button>
          <button
            className="px-10 py-3 font-bold text-white capitalize bg-black border-4 border-white rounded-full text-md h-fit btn btn-sm hover:text-black"
            onClick={() => props.setWindowState("farmView")}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* sub-title */}
      <div>
        <p className="py-4 text-white">
          Please provide the below information about your new farm to register.
        </p>
      </div>

      <div className="flex flex-col pb-16 space-y-6">
        {/* form container */}
        <div className="px-6">
          {/* form title */}
          <div>
            <p className="pt-4 pb-2 text-xl font-bold text-white underline underline-offset-2">
              Farm Information
            </p>
          </div>

          <div className="p-0 m-0 divider before:bg-white/10 after:bg-white/10"></div>

          {/* inputs container */}
          <div className="grid items-end grid-cols-3 gap-x-14 w-fit gap-y-6">
            {/* farm name */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Farm Name
                </span>
              </label>
              <input
                type="text"
                placeholder="John's Farm "
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.farmName}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      farmName: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* farm owner */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Farm Owner
                </span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.farmOwner}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      farmOwner: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* ownership type */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Ownership Type
                </span>
              </label>
              <div className="dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.ownershipDropdownOpen ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        ownershipDropdownOpen: !prevState.ownershipDropdownOpen,
                      };
                    })
                  }
                >
                  {formData.ownershipType || "Ownership"}
                </button>
                {dropdownState.ownershipDropdownOpen && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() =>
                          handleOwnershipTypeChange("individual")
                        }
                      >
                        Individual
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => handleOwnershipTypeChange("joint")}
                      >
                        Joint
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* govt. registration number */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Govt. Registration Number
                </span>
              </label>
              <input
                type="text"
                placeholder="1A34GH8556HOP "
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.govtRegistrationNumber}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      govtRegistrationNumber: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* farming system */}
            {/* <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Farming System
                </span>
                <div
                  className={`tooltip ${
                    tooltipState.farmingSystemTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="Types of farming system should be chosen depending upon the geographical and local climatic conditions with keeping economics in mind. E.g. Loose Farming, Conventional barn system and free range system."
                  onMouseEnter={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        farmingSystemTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        farmingSystemTooltipHover: false,
                      };
                    });
                  }}
                >
                  <img
                    src={moreInfo}
                    alt="more info"
                    className="w-4 h-4 ml-2"
                  />
                </div>
              </label>
              <div className="dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.farmingSystemDropdownOpen
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        farmingSystemDropdownOpen:
                          !prevState.farmingSystemDropdownOpen,
                      };
                    })
                  }
                >
                  {formData.farmingSystem.length === 0
                    ? "Choose from below"
                    : formData.farmingSystem.join(", ")}
                </button>
                {dropdownState.farmingSystemDropdownOpen && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <div className="flex flex-row items-center rounded-none hover:text-white hover:bg-white/20 hover:m-0">
                        <input
                          type="checkbox"
                          checked={
                            formData.farmingSystem.includes("Zero-Gazing")
                              ? "checked"
                              : false
                          }
                          className="checkbox"
                          onChange={() =>
                            props.handleFarmingSystemChange("Zero-Gazing")
                          }
                        />
                        <button className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:m-0">
                          Zero-Gazing
                        </button>
                      </div>
                    </li>

                    <li>
                      <div className="flex flex-row items-center rounded-none hover:text-white hover:bg-white/20 hover:m-0">
                        <input
                          type="checkbox"
                          checked={
                            formData.farmingSystem.includes(
                              "Fenced Farming"
                            )
                              ? "checked"
                              : false
                          }
                          className="checkbox"
                          onChange={() =>
                            props.handleFarmingSystemChange("Fenced Farming")
                          }
                        />
                        <button className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:m-0">
                          Fenced Farming
                        </button>
                      </div>
                    </li>

                    <li>
                      <div className="flex flex-row items-center rounded-none hover:text-white hover:bg-white/20 hover:m-0">
                        <input
                          type="checkbox"
                          checked={
                            formData.farmingSystem.includes(
                              "Enclosed Ranching"
                            )
                              ? "checked"
                              : false
                          }
                          className="checkbox"
                          onChange={() =>
                            props.handleFarmingSystemChange("Enclosed Ranching")
                          }
                        />
                        <button className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:m-0">
                          Enclosed Ranching
                        </button>
                      </div>
                    </li>

                    <li>
                      <div className="flex flex-row items-center rounded-none hover:text-white hover:bg-white/20 hover:m-0">
                        <input
                          type="checkbox"
                          checked={
                            formData.farmingSystem.includes(
                              "Semi Intensive System"
                            )
                              ? "checked"
                              : false
                          }
                          className="checkbox"
                          onChange={() =>
                            props.handleFarmingSystemChange(
                              "Semi Intensive System"
                            )
                          }
                        />
                        <button className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:m-0">
                          Semi Intensive System
                        </button>
                      </div>
                    </li>

                    <li>
                      <div className="flex flex-row items-center rounded-none hover:text-white hover:bg-white/20 hover:m-0">
                        <input
                          type="checkbox"
                          checked={
                            formData.farmingSystem.includes(
                              "Extensive System"
                            )
                              ? "checked"
                              : false
                          }
                          className="checkbox"
                          onChange={() =>
                            props.handleFarmingSystemChange("Extensive System")
                          }
                        />
                        <button className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:m-0">
                          Extensive System
                        </button>
                      </div>
                    </li>

                    <li>
                      <div className="flex flex-row items-center rounded-none hover:text-white hover:bg-white/20 hover:m-0">
                        <input
                          type="checkbox"
                          checked={
                            formData.farmingSystem.includes(
                              "Intensive (Zero-Gazing)"
                            )
                              ? "checked"
                              : false
                          }
                          className="checkbox"
                          onChange={() =>
                            props.handleFarmingSystemChange(
                              "Intensive (Zero-Gazing)"
                            )
                          }
                        />
                        <button className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:m-0">
                          Intensive (Zero-Gazing)
                        </button>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </div> */}

            {/* cooperative union id */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Cooperative/Union ID
                </span>
                <div
                  className={`tooltip ${
                    tooltipState.unionIdTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="This field only applies to you if you belong to any cooperative (A cooperative is an autonomous association of persons united voluntarily to meet their common economic, social and cultural needs and aspirations through a jointly-owned and democratically-controlled enterprise). IF you belong to a cooperative, please indicate the unique identifier of that cooperative, it can be a registration or license number uniquely identifying the cooperative you associate with."
                  onMouseEnter={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        unionIdTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        unionIdTooltipHover: false,
                      };
                    });
                  }}
                >
                  <img
                    src={moreInfo}
                    alt="more info"
                    className="w-4 h-4 ml-2"
                  />
                </div>
              </label>
              <input
                type="text"
                placeholder="1A34GH8556HOP"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.unionId}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      unionId: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* coop union name */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Cooperative/Union Name
                </span>
              </label>
              <input
                type="text"
                placeholder="ABC Cooperative"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.unionName}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      unionName: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* form container */}
        <div className="px-6 pt-6">
          {/* form title */}
          <div>
            <p className="pt-4 pb-2 text-xl font-bold text-white underline underline-offset-2">
              Farm License Information
            </p>
          </div>

          <div className="p-0 m-0 divider before:bg-white/10 after:bg-white/10"></div>

          {/* inputs container */}
          <div className="grid items-end grid-cols-3 gap-x-14 w-fit gap-y-6">
            {/* license number */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  License Number
                </span>
              </label>
              <input
                type="text"
                placeholder="John's Farm "
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.licenseNumber}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      licenseNumber: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* license expiry date */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  License Expiry Date
                </span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.licenseExpiryDate}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      licenseExpiryDate: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* regulator name */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Regulator Name
                </span>
                <div
                  className={`tooltip ${
                    tooltipState.regulatorNameTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="The name of the regulator who released the license."
                  onMouseEnter={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        regulatorNameTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        regulatorNameTooltipHover: false,
                      };
                    });
                  }}
                >
                  <img
                    src={moreInfo}
                    alt="more info"
                    className="w-4 h-4 ml-2"
                  />
                </div>
              </label>
              <input
                type="text"
                placeholder="Regualtor Name"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.regulatorName}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      regulatorName: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* form container */}
        <div className="px-6 pt-6">
          {/* form title */}
          <div>
            <p className="pt-4 pb-2 text-xl font-bold text-white underline underline-offset-2">
              Farm Location & Size
            </p>
          </div>

          <div className="p-0 m-0 divider before:bg-white/10 after:bg-white/10"></div>

          {/* inputs container */}
          <div className="grid items-end grid-cols-3 gap-x-14 w-fit gap-y-6">
            {/* farm full address */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Farm Address
                </span>
              </label>
              <input
                type="text"
                placeholder="Global Address"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.farmAddress}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      farmAddress: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* farm number */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Farm Number
                </span>
                <div
                  className={`tooltip ${
                    tooltipState.farmNumberTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="The postal Number of farm similar to House number.                    "
                  onMouseEnter={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        farmNumberTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        farmNumberTooltipHover: false,
                      };
                    });
                  }}
                >
                  <img
                    src={moreInfo}
                    alt="more info"
                    className="w-4 h-4 ml-2"
                  />
                </div>
              </label>
              <input
                type="text"
                placeholder="Farm Number"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.farmNumber}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      farmNumber: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* farm size */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Farm Size (with unit)
                </span>
              </label>
              <input
                type="text"
                placeholder="2 Acre / 2 Hectare"
                className="w-[350px] text-md text-white border-white rounded-none bg-gGray input input-bordered px-4 py-6"
                value={formData.farmSize}
                onChange={(e) =>
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      farmSize: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFarm;
