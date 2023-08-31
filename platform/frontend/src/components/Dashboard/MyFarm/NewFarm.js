import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";

import moreInfo from "../../../assets/svg/more-info.svg";

function NewFarm(props) {
  const { appData, setAppData } = useContext(AppContext);

  useEffect(() => {
    setAppData((prevState) => {
      return {
        ...prevState,
        currentHeaderTitle: "New Farm",
        breadCrumbs: [
          {
            label: "My Farm",
            link: "/dashboard/my-farm",
          },
          {
            label: "New Farm",
            link: "/dashboard/my-farm",
          },
        ],
      };
    });
  }, []);

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
            onClick={() => props.submitForm()}
          >
            Register
          </button>
          <button
            className="px-10 py-3 font-bold text-white capitalize bg-black border-4 border-white rounded-full text-md h-fit btn btn-sm hover:text-black"
            onClick={() => props.setWindowState("noFarm")}
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
                value={props.formData.farmName}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                value={props.formData.farmOwner}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                    props.dropdownState.ownershipDropdownOpen ? "active" : ""
                  }`}
                  onClick={() =>
                    props.setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        ownershipDropdownOpen: !prevState.ownershipDropdownOpen,
                      };
                    })
                  }
                >
                  {props.formData.ownershipType || "Ownership"}
                </button>
                {props.dropdownState.ownershipDropdownOpen && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() =>
                          props.handleOwnershipTypeChange("Personal")
                        }
                      >
                        Personal
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() =>
                          props.handleOwnershipTypeChange("Community")
                        }
                      >
                        Community
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() =>
                          props.handleOwnershipTypeChange("Corporate")
                        }
                      >
                        Corporate
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
                value={props.formData.govtRegistrationNumber}
                onChange={(e) =>
                  props.setFormData((prevState) => {
                    return {
                      ...prevState,
                      govtRegistrationNumber: e.target.value,
                    };
                  })
                }
              />
            </div>

            {/* farming system */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Farming System
                </span>
                <div
                  className={`tooltip ${
                    props.tooltipState.farmingSystemTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="Types of farming system should be chosen depending upon the geographical and local climatic conditions with keeping economics in mind. E.g. Loose Farming, Conventional barn system and free range system."
                  onMouseEnter={() => {
                    props.setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        farmingSystemTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    props.setTooltipState((prevState) => {
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
                    props.dropdownState.farmingSystemDropdownOpen
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    props.setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        farmingSystemDropdownOpen:
                          !prevState.farmingSystemDropdownOpen,
                      };
                    })
                  }
                >
                  {props.formData.farmingSystem.length === 0
                    ? "Choose from below"
                    : props.formData.farmingSystem.join(", ")}
                </button>
                {props.dropdownState.farmingSystemDropdownOpen && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    {/* zer-gazing, fenched farming, enclosed ranching, semi intensive system, extensive system, intensive (Zero-gazing) */}
                    <li>
                      <div className="flex flex-row items-center rounded-none hover:text-white hover:bg-white/20 hover:m-0">
                        <input
                          type="checkbox"
                          checked={
                            props.formData.farmingSystem.includes("Zero-Gazing")
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
                            props.formData.farmingSystem.includes(
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
                            props.formData.farmingSystem.includes(
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
                            props.formData.farmingSystem.includes(
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
                            props.formData.farmingSystem.includes(
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
                            props.formData.farmingSystem.includes(
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
            </div>

            {/* cooperative union id */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Cooperative/Union ID
                </span>
                <div
                  className={`tooltip ${
                    props.tooltipState.unionIdTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="This field only applies to you if you belong to any cooperative (A cooperative is an autonomous association of persons united voluntarily to meet their common economic, social and cultural needs and aspirations through a jointly-owned and democratically-controlled enterprise). IF you belong to a cooperative, please indicate the unique identifier of that cooperative, it can be a registration or license number uniquely identifying the cooperative you associate with."
                  onMouseEnter={() => {
                    props.setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        unionIdTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    props.setTooltipState((prevState) => {
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
                value={props.formData.unionId}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                value={props.formData.unionName}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                value={props.formData.licenseNumber}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                value={props.formData.licenseExpiryDate}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                    props.tooltipState.regulatorNameTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="The name of the regulator who released the license."
                  onMouseEnter={() => {
                    props.setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        regulatorNameTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    props.setTooltipState((prevState) => {
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
                value={props.formData.regulatorName}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                value={props.formData.farmAddress}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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
                    props.tooltipState.farmNumberTooltipHover === true
                      ? "tooltip-open"
                      : ""
                  } tooltip-right`}
                  data-tip="The postal Number of farm similar to House number.                    "
                  onMouseEnter={() => {
                    props.setTooltipState((prevState) => {
                      return {
                        ...prevState,
                        farmNumberTooltipHover: true,
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    props.setTooltipState((prevState) => {
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
                value={props.formData.farmSize}
                onChange={(e) =>
                  props.setFormData((prevState) => {
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

export default NewFarm;
