import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";

function CreateNewGoal(props) {
  const { appData, setAppData, updateLivestockGoalsForUser } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [dropdownState, setDropdownState] = useState({
    goalType: false,
  });

  const [formData, setFormData] = useState({
    id: "",
    goalName: "",
    goalType: "",
    baseValue: "",
    targetValue: "",
    deadlineDate: "",
    comments: "",
  });

  const submitForm = async () => {
    // console.log("submitting form", formData);
    if (validateForm()) {
      // console.log("form validated");
      // generate a random number to use as UID
      const id = Math.floor(Math.random() * 1000000000);
      // console.log("id:", id);
      let tempFormData = formData;
      tempFormData.id = id;
      let tempArr = appData.userProfile.livestockGoals;
      tempArr.push(tempFormData);
      const updateResult = await updateLivestockGoalsForUser(tempArr);
      if (updateResult === true) {
        toast.success("Goal created successfully");
        props.setTabView("all");
      } else {
        toast.error("Error occured. Please try again..");
      }
    }
  };

  const validateForm = () => {
    // console.log("validating form");
    if (
      formData.goalName === "" ||
      formData.goalType === "" ||
      formData.baseValue === "" ||
      formData.targetValue === "" ||
      formData.deadlineDate === ""
    ) {
      toast.error("Please fill all the fields");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        <div className="flex flex-row items-center justify-between">
          {/* title */}
          <p className="text-2xl font-bold text-white">Create a Goal</p>
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
              onClick={() => {
                if (props.appData.userProfile.livestockGoals.length === 0) {
                  props.setTabView("no");
                } else {
                  props.setTabView("all");
                }
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-6 gap-y-8">
          {/* goal name - text input */}
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Goal Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter the goal name"
              className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              value={formData.goalName}
              onChange={(e) => {
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    goalName: e.target.value,
                  };
                });
              }}
            />
          </div>

          {/* goal type - dropdown */}
          <div className="col-span-2 form-control w-fit">
            <label className="label w-fit">
              <span className="font-bold text-white label-text">
                Choose Goal Type
              </span>
            </label>
            <div className=" dropdown">
              <button
                className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                  dropdownState.goalType ? "active" : ""
                }`}
                onClick={() =>
                  setDropdownState((prevState) => {
                    return {
                      ...prevState,
                      goalType: !prevState.goalType,
                    };
                  })
                }
              >
                {formData.goalType || "Choose Goal Type"}
              </button>
              {dropdownState.goalType && (
                <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                  <li>
                    <button
                      className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                      onClick={() => {
                        setFormData((prevState) => {
                          return {
                            ...prevState,
                            goalType: "Milk Production",
                          };
                        });
                        setDropdownState((prevState) => {
                          return {
                            ...prevState,
                            goalType: false,
                          };
                        });
                      }}
                    >
                      Milk Production
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                      onClick={() => {
                        setFormData((prevState) => {
                          return {
                            ...prevState,
                            goalType: "Weight Gain",
                          };
                        });
                        setDropdownState((prevState) => {
                          return {
                            ...prevState,
                            goalType: false,
                          };
                        });
                      }}
                    >
                      Weight Gain
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                      onClick={() => {
                        setFormData((prevState) => {
                          return {
                            ...prevState,
                            goalType: "Reproductive Objectives",
                          };
                        });
                        setDropdownState((prevState) => {
                          return {
                            ...prevState,
                            goalType: false,
                          };
                        });
                      }}
                    >
                      Reproductive Objectives
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* base value - text input */}
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Base Value
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter the base value"
              className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              value={formData.baseValue}
              onChange={(e) => {
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    baseValue: e.target.value,
                  };
                });
              }}
            />
          </div>

          {/* target value - text input */}
          <div className="col-span-2 form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Target Value
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter the target value"
              className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              value={formData.targetValue}
              onChange={(e) => {
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    targetValue: e.target.value,
                  };
                });
              }}
            />
          </div>

          {/* deadline date - text input */}
          <div className="col-span-3 form-control">
            <label className="label">
              <span className="font-bold text-white label-text">
                Deadline Date
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter the deadline date"
              className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              value={formData.deadlineDate}
              onChange={(e) => {
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    deadlineDate: e.target.value,
                  };
                });
              }}
            />
          </div>

          {/* select animal - dropdown */}
          {/* <div className="col-span-2 form-control w-fit">
            <label className="label">
              <span className="font-bold text-white label-text">
                Select Animal
              </span>
            </label>
            <div className=" dropdown">
              <button
                className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                  dropdownState.animal ? "active" : ""
                }`}
                onClick={() =>
                  setDropdownState((prevState) => {
                    return {
                      ...prevState,
                      animal: !prevState.animal,
                    };
                  })
                }
              >
                {formData.animal || "Choose Goal Type"}
              </button>
              {dropdownState.animal && (
                <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                  <li>
                    <button
                      className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                      onClick={() => {
                        setFormData((prevState) => {
                          return {
                            ...prevState,
                            animal: "Bovine",
                          };
                        });
                        setDropdownState((prevState) => {
                          return {
                            ...prevState,
                            animal: false,
                          };
                        });
                      }}
                    >
                      Bovine
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div> */}

          {/* comments about the goal - text area */}
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-white label-text">Comments</span>
            </label>
            <textarea
              type="text"
              placeholder="Enter any comments about the goal (optional)"
              className="w-[550px] h-[160px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              value={formData.comments}
              onChange={(e) => {
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    comments: e.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewGoal;
