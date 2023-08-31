import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterAnimal(props) {
  const navigate = useNavigate();
  const [accordianState, setAccordianState] = useState({
    one: false,
    two: false,
    three: false,
  });

  const [dropdownState, setDropdownState] = useState({
    species: false,
    speciesType: false,
  });

  const [formData, setFormData] = useState({
    generalInformation: {
      species: "",
      speciesType: "",
    },
  });

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        <div className="flex flex-row items-center justify-between">
          {/* title */}
          <p className="text-2xl font-bold text-white">Register an Animal</p>
          {/* side button container */}
          <div className="flex flex-row items-center space-x-4">
            <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              //   onClick={() => props.submitForm()}
            >
              Save
            </button>
            <button
              className="px-10 py-3 font-bold text-white capitalize bg-black border-4 border-white rounded-full text-md h-fit btn btn-sm hover:text-black"
              onClick={() => navigate("/dashboard/animals")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* accordian container */}
      <div className="p-2 mt-4">
        {/* general information container */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center w-full px-4 py-4 space-x-4 rounded-sm bg-white/10">
            <p className="w-full text-white ">General Information</p>
          </div>
          <div className="grid grid-cols-3 px-4 py-4 pb-10 gap-y-6">
            {/* species */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Species
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.species ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        species: !prevState.species,
                      };
                    })
                  }
                >
                  {formData.generalInformation.species || "Choose Species"}
                </button>
                {dropdownState.species && (
                  <ul className="my-2 text-white shadow menu dropdown-content bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                species: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              species: false,
                            };
                          });
                        }}
                      >
                        Bovine
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                species: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              species: false,
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
            </div>

            {/* species type */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Species Type
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.speciesType ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        speciesType: !prevState.speciesType,
                      };
                    })
                  }
                >
                  {formData.generalInformation.speciesType ||
                    "Choose Species Type"}
                </button>
                {dropdownState.speciesType && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                speciesType: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              speciesType: false,
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
            </div>

            {/* choose gender */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Gender
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.gender ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        gender: !prevState.gender,
                      };
                    })
                  }
                >
                  {formData.generalInformation.gender || "Choose Gender"}
                </button>
                {dropdownState.gender && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                gender: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              gender: false,
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
            </div>

            {/* choose breed */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Breed
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.breed ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        breed: !prevState.breed,
                      };
                    })
                  }
                >
                  {formData.generalInformation.breed || "Choose Breed"}
                </button>
                {dropdownState.breed && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                breed: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              breed: false,
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
            </div>

            {/* choose class */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Class
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.class ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        class: !prevState.class,
                      };
                    })
                  }
                >
                  {formData.generalInformation.class || "Choose Class"}
                </button>
                {dropdownState.class && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                class: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              class: false,
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
            </div>

            {/* choose animal category */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Animal Category
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.animalCategory ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        animalCategory: !prevState.animalCategory,
                      };
                    })
                  }
                >
                  {formData.generalInformation.animalCategory ||
                    "Choose Animal Category"}
                </button>
                {dropdownState.animalCategory && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                animalCategory: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              animalCategory: false,
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
            </div>
          </div>
        </div>

        {/* animal identification container */}
        <div className="flex flex-col w-full mt-8">
          <div className="flex flex-row items-center w-full px-4 py-4 space-x-4 rounded-sm bg-white/10">
            <p className="w-full text-white ">Animal Identification</p>
          </div>
          <div className="grid grid-cols-3 px-4 py-2 gap-y-6">
            {/* animal name - text input */}
            <div className="py-12 pt-4 form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Animal Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter animal name"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* government registration number - text input */}
            <div className="py-12 pt-4 form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Government Registration Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Reg. No."
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* date of registration - text input */}
            <div className="py-12 pt-4 form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Date of Registration
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter date of registration"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>
          </div>
        </div>

        {/* tag details container */}
        <div className="flex flex-col w-full mt-6">
          <div className="flex flex-row items-center w-full px-4 py-4 space-x-4 rounded-sm bg-white/10">
            <p className="w-full text-white ">Tag Details</p>
          </div>
          {/* <div className="pr-12 divider before:bg-white after:bg-white"></div> */}
          <div className="grid grid-cols-3 px-4 pt-8 pb-12 gap-y-6">
            {/* identification method - dropdown */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Identification Method
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.identificationMethod ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        identificationMethod: !prevState.identificationMethod,
                      };
                    })
                  }
                >
                  {formData.generalInformation.identificationMethod ||
                    "Choose Identification Method"}
                </button>
                {dropdownState.identificationMethod && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                identificationMethod: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              identificationMethod: false,
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
            </div>

            {/* tag category - dropdown */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Choose Category
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.tagCategory ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        tagCategory: !prevState.tagCategory,
                      };
                    })
                  }
                >
                  {formData.generalInformation.tagCategory ||
                    "Choose Tag Category"}
                </button>
                {dropdownState.tagCategory && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                tagCategory: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              tagCategory: false,
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
            </div>

            {/* id number - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  ID Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter ID number"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* chip number - text input */}
            <div className=" form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Chip Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter chip number"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* position - text input */}
            <div className=" form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Position
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter position"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* tag color - text input */}
            <div className=" form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Tag Color
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter tag color"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>
          </div>
        </div>

        {/* birth and origin details container with
        date of birth - text input
        animal origin - dropdown
        farm of origin - text input
        conception method - dropdown */}
        <div className="flex flex-col w-full mt-6">
          <div className="flex flex-row items-center w-full px-4 py-4 space-x-4 rounded-sm bg-white/10">
            <p className="w-full text-white ">Birth and Origin Details</p>
          </div>
          {/* <div className="pr-12 divider before:bg-white after:bg-white"></div> */}
          <div className="grid grid-cols-3 px-4 pt-8 pb-12 gap-y-6">
            {/* date of birth - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Date of Birth
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter date of birth"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* animal origin - dropdown */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Animal Origin
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.animalOrigin ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        animalOrigin: !prevState.animalOrigin,
                      };
                    })
                  }
                >
                  {formData.generalInformation.animalOrigin ||
                    "Choose Animal Origin"}
                </button>
                {dropdownState.animalOrigin && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                animalOrigin: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              animalOrigin: false,
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
            </div>

            {/* farm of origin - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Farm of Origin
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter farm of origin"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* conception method - dropdown */}
            <div className="form-control w-fit">
              <label className="label w-fit">
                <span className="font-bold text-white label-text">
                  Conception Method
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.conceptionMethod ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        conceptionMethod: !prevState.conceptionMethod,
                      };
                    })
                  }
                >
                  {formData.generalInformation.conceptionMethod ||
                    "Choose Conception Method"}
                </button>
                {dropdownState.conceptionMethod && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                conceptionMethod: "Bovine",
                              },
                            };
                          });
                          setDropdownState((prevState) => {
                            return {
                              ...prevState,
                              conceptionMethod: false,
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
            </div>
          </div>
        </div>

        {/* parentage/pedigree information with
        sire - text input
        dam - text input
        surrogate id - text input */}
        <div className="flex flex-col w-full mt-6">
          <div className="flex flex-row items-center w-full px-4 py-4 space-x-4 rounded-sm bg-white/10">
            <p className="w-full text-white ">Parentage/Pedigree Information</p>
          </div>
          {/* <div className="pr-12 divider before:bg-white after:bg-white"></div> */}
          <div className="grid grid-cols-3 px-4 pt-8 pb-12 gap-y-6">
            {/* sire - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">Sire</span>
              </label>
              <input
                type="text"
                placeholder="Enter sire"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* dam - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">Dam</span>
              </label>
              <input
                type="text"
                placeholder="Enter dam"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* surrogate id - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Surrogate ID
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter surrogate id"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>
          </div>
        </div>

        {/* owner and breed association details with
        stock brand number - text input
        owner - text input
        breeder/supplier - text input
        reg. no. in a breed association - text input
        name of breed association */}
        <div className="flex flex-col w-full mt-6">
          <div className="flex flex-row items-center w-full px-4 py-4 space-x-4 rounded-sm bg-white/10">
            <p className="w-full text-white ">
              Owner and Breed Association Details
            </p>
          </div>
          {/* <div className="pr-12 divider before:bg-white after:bg-white"></div> */}
          <div className="grid grid-cols-3 px-4 pt-8 pb-12 gap-y-6">
            {/* stock brand number - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Stock Brand Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter stock brand number"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* owner - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">Owner</span>
              </label>
              <input
                type="text"
                placeholder="Enter owner"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>

            {/* breeder/supplier - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Breeder/Supplier
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter breeder/supplier"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>
          </div>
        </div>

        {/* additional information with
        additonal notes - text input */}
        <div className="flex flex-col w-full mt-6">
          <div className="flex flex-row items-center w-full px-4 py-4 space-x-4 rounded-sm bg-white/10">
            <p className="w-full text-white ">Additional Information</p>
          </div>
          {/* <div className="pr-12 divider before:bg-white after:bg-white"></div> */}
          <div className="grid grid-cols-3 px-4 pt-8 pb-12 gap-y-6">
            {/* additonal notes - text input */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Additional Notes
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter additional notes"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAnimal;
