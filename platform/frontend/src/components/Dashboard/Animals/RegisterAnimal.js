import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

function RegisterAnimal(props) {
  const navigate = useNavigate();
  const { appData, addAnimalForUser } = useContext(AppContext);

  const [dropdownState, setDropdownState] = useState({
    species: false,
    subSpecies: false,
  });

  const [formData, setFormData] = useState({
    id: "",
    generalInformation: {
      species: "",
      subSpecies: "",
      gender: "",
      class: "",
    },
    animalIdentification: {
      animalName: "",
      governmentRegistrationNumber: "",
      dateOfRegistration: "",
    },
    identification: {
      rfid: "",
      earTag: "",
      biometricMarkers: "",
    },
    birthAndOriginInfo: {
      dateOfBirth: "",
      countryOfOrigin: "",
      farmOfOrigin: "",
      conceptionMethod: "",
    },
    parentageOrPedigree: {
      sire: "",
      dam: "",
      surrogateId: "",
    },
    ownerAndBreedInfo: {
      stockBrandNumber: "",
      owner: "",
      breederOrSupplier: "",
    },
    additionalNotes: "",
    animalValue: ""
  });

  const submitForm = async () => {
    if (validateForm() === false) {
      toast.error("Please fill all the fields");
      return;
    } else {
      try {
        // console.log("formData", formData);
        let tempAnimalData = formData;
        let tempAnimalsArray = appData.userProfile.animals;
        let randomId = Math.floor(Math.random() * 1000000000);
        tempAnimalData.id = randomId;
        tempAnimalsArray.push(tempAnimalData);
        const addResult = await addAnimalForUser(tempAnimalsArray);
        if (addResult === true) {
          navigate("/dashboard/animals");
        } else {
          toast.error("Error adding animal. Try again.");
        }
      } catch (error) {
        // console.log(error);
        toast.error("Error adding animal. Try again.");
      }
    }
  };

  const validateForm = () => {
    if (
      formData.generalInformation.species === "" ||
      formData.generalInformation.subSpecies === "" ||
      formData.generalInformation.gender === "" ||
      formData.generalInformation.class === "" ||
      formData.animalIdentification.animalName === "" ||
      formData.animalIdentification.governmentRegistrationNumber === "" ||
      formData.animalIdentification.dateOfRegistration === "" ||
      formData.identification.rfid === "" ||
      formData.identification.earTag === "" ||
      formData.identification.biometricMarkers === "" ||
      formData.birthAndOriginInfo.dateOfBirth === "" ||
      formData.birthAndOriginInfo.countryOfOrigin === "" ||
      formData.birthAndOriginInfo.farmOfOrigin === "" ||
      formData.birthAndOriginInfo.conceptionMethod === "" ||
      formData.parentageOrPedigree.sire === "" ||
      formData.parentageOrPedigree.dam === "" ||
      formData.parentageOrPedigree.surrogateId === "" ||
      formData.ownerAndBreedInfo.stockBrandNumber === "" ||
      formData.ownerAndBreedInfo.owner === "" ||
      formData.ownerAndBreedInfo.breederOrSupplier === ""
    ) {
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
          <p className="text-2xl font-bold text-white">Register an Animal</p>
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
                  // cattle, sheep, equines, goats, poultry, leporids
                  <ul className="my-2 text-white shadow menu dropdown-content bg-gGray border-[1px] border-white p-0 w-[350px]">
                    {/* cattle, sheep, equines, goats, poultry, leporids */}

                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                species: "Cattle",
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
                        Cattle
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
                                species: "Sheep",
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
                        Sheep
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
                                species: "Equines",
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
                        Equines
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
                                species: "Goats",
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
                        Goats
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
                                species: "Poultry",
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
                        Poultry
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
                                species: "Leporids",
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
                        Leporids
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
                  Choose Sub-Species
                </span>
              </label>
              <div className=" dropdown">
                <button
                  className={`dropdown-trigger px-4 py-[17px] text-white capitalize border-white rounded-none border-1 btn bg-gGray h-fit hover:bg-black hover:text-white w-[350px] justify-start ${
                    dropdownState.subSpecies ? "active" : ""
                  }`}
                  onClick={() =>
                    setDropdownState((prevState) => {
                      return {
                        ...prevState,
                        subSpecies: !prevState.subSpecies,
                      };
                    })
                  }
                >
                  {formData.generalInformation.subSpecies ||
                    "Choose Sub-Species"}
                </button>
                {dropdownState.subSpecies && (
                  <ul className="my-2 text-white shadow menu dropdown-content z-[1] bg-gGray border-[1px] border-white p-0 w-[350px]">
                    {formData.generalInformation.species === "Cattle" ? (
                      // Boran, Zebu, N'Dama, Ankole-Watusi, Sanga, Brahman, Tuli, Senepol, Other
                      <>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                            onClick={() => {
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Boran",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Boran
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
                                    subSpecies: "Zebu",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Zebu
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
                                    subSpecies: "N'Dama",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            N'Dama
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
                                    subSpecies: "Ankole-Watusi",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Ankole-Watusi
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
                                    subSpecies: "Sanga",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Sanga
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
                                    subSpecies: "Brahman",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Brahman
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
                                    subSpecies: "Tuli",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Tuli
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
                                    subSpecies: "Senepol",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Senepol
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
                                    subSpecies: "Other",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Other
                          </button>
                        </li>
                      </>
                    ) : formData.generalInformation.species === "Sheep" ? (
                      // Djallonké Sheep, Red Maasai, Zulu, Sahel, West African Dwarf, Damara Afar, Ethiopian Highland, Namaqua, N'Dama, other
                      <>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                            onClick={() => {
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Djallonké Sheep",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Djallonké Sheep
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
                                    subSpecies: "Red Maasai",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Red Maasai
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
                                    subSpecies: "Zulu",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Zulu
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
                                    subSpecies: "Sahel",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Sahel
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
                                    subSpecies: "West African Dwarf",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            West African Dwarf
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
                                    subSpecies: "Damara Afar",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Damara Afar
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
                                    subSpecies: "Ethiopian Highland",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Ethiopian Highland
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
                                    subSpecies: "Namaqua",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            Namaqua
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
                                    subSpecies: "N'Dama",
                                  },
                                };
                              });
                              setDropdownState((prevState) => {
                                return {
                                  ...prevState,
                                  subSpecies: false,
                                };
                              });
                            }}
                          >
                            N'Dama
                          </button>
                        </li>
                      </>
                    ) : formData.generalInformation.species === "Equines" ? (
                      // horses, donkeys, mules
                      <>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Horses",
                                  },
                                };
                              })
                            }
                          >
                            Horses
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Donkeys",
                                  },
                                };
                              })
                            }
                          >
                            Donkeys
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Mules",
                                  },
                                };
                              })
                            }
                          >
                            Mules
                          </button>
                        </li>
                      </>
                    ) : formData.generalInformation.species === "Goats" ? (
                      // Boer Goat, Red Sokoto, West African Dwarf, Maasai, Nubian, Sahel, Mubende, Maradi, Galla, Kiko, other
                      <>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Boer Goat",
                                  },
                                };
                              })
                            }
                          >
                            Boer Goat
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Red Sokota",
                                  },
                                };
                              })
                            }
                          >
                            Red Sokota
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "West African Dwarf",
                                  },
                                };
                              })
                            }
                          >
                            West African Dwarf
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Maasai",
                                  },
                                };
                              })
                            }
                          >
                            Maasai
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Nubian",
                                  },
                                };
                              })
                            }
                          >
                            Nubian
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Sahel",
                                  },
                                };
                              })
                            }
                          >
                            Sahel
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Mubende",
                                  },
                                };
                              })
                            }
                          >
                            Mubende
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "maradi",
                                  },
                                };
                              })
                            }
                          >
                            Maradi
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "galla",
                                  },
                                };
                              })
                            }
                          >
                            Galla
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "kiko",
                                  },
                                };
                              })
                            }
                          >
                            Kiko
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "other",
                                  },
                                };
                              })
                            }
                          >
                            Other
                          </button>
                        </li>
                      </>
                    ) : formData.generalInformation.species === "Poultry" ? (
                      <>
                        {/* Kuroiler, Potchefstroom Koekoek, Naked Neck, Rhode Island Red, Bovan Goldline, Australorp, Sasso Sussex */}
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Kuroiler",
                                  },
                                };
                              })
                            }
                          >
                            Kuroiler
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Potchefstroom Koekoek",
                                  },
                                };
                              })
                            }
                          >
                            Potchefstroom Koekoek
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Naked Neck",
                                  },
                                };
                              })
                            }
                          >
                            Naked Neck
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Rhode Island Red",
                                  },
                                };
                              })
                            }
                          >
                            Rhode Island Red
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Bovan Goldline",
                                  },
                                };
                              })
                            }
                          >
                            Bovan Goldline
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Australorp",
                                  },
                                };
                              })
                            }
                          >
                            Australorp
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Sasso Sussex",
                                  },
                                };
                              })
                            }
                          >
                            Sasso Sussex
                          </button>
                        </li>
                      </>
                    ) : formData.generalInformation.species === "Leporids" ? (
                      <>
                        {/* Californian, New Zealand White, Chinchilla, Flemish Giant, Rex, Hyla */}
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Californian",
                                  },
                                };
                              })
                            }
                          >
                            Californian
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "New Zealand White",
                                  },
                                };
                              })
                            }
                          >
                            New Zealand White
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Chinchilla",
                                  },
                                };
                              })
                            }
                          >
                            Chinchilla
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Flemish Giant",
                                  },
                                };
                              })
                            }
                          >
                            Flemish Giant
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Rex",
                                  },
                                };
                              })
                            }
                          >
                            Rex
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            onClick={() =>
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  generalInformation: {
                                    ...prevState.generalInformation,
                                    subSpecies: "Hyla",
                                  },
                                };
                              })
                            }
                          >
                            Hyla
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button
                            className="w-full px-4 py-4 text-left rounded-none"
                            disabled
                          >
                            Choose Species First
                          </button>
                        </li>
                      </>
                    )}
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
                                gender: "Female",
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
                        Female
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
                                gender: "Male",
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
                        Male
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* choose breed */}
            {/* <div className="form-control w-fit">
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
            </div> */}

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
                    {/* agricultural use, transportation, milk, meat, or wool production */}
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                class: "Agricultural Use",
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
                        Agricultural Use
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
                                class: "Transportation",
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
                        Transportation
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
                                class: "Milk",
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
                        Milk
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              generalInformation: {
                                ...prevState.generalInformation,
                                class: "Meat",
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
                        Meat
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
                                class: "Wool Production",
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
                        Wool Production
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* choose animal category */}
            {/* <div className="form-control w-fit">
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
            </div> */}
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
                value={formData.animalIdentification.animalName}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      animalIdentification: {
                        ...prevState.animalIdentification,
                        animalName: e.target.value,
                      },
                    };
                  });
                }}
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
                value={
                  formData.animalIdentification.governmentRegistrationNumber
                }
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      animalIdentification: {
                        ...prevState.animalIdentification,
                        governmentRegistrationNumber: e.target.value,
                      },
                    };
                  });
                }}
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
                value={formData.animalIdentification.dateOfRegistration}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      animalIdentification: {
                        ...prevState.animalIdentification,
                        dateOfRegistration: e.target.value,
                      },
                    };
                  });
                }}
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
            {/* <div className="form-control w-fit">
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
            </div> */}

            {/* id number - text input */}
            {/* <div className="form-control">
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
            </div> */}

            {/* identification type - text input */}
            <div className=" form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Identification Type
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                value={"RFID Tag"}
                disabled
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-black input input-bordered disabled:bg-white/10 disabled:text-white"
              />
            </div>

            {/* position - text input */}
            <div className="col-span-2 form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Identification Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter identification number"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
                value={formData.identification.rfid}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      identification: {
                        ...prevState.identification,
                        rfid: e.target.value,
                      },
                    };
                  });
                }}
              />
            </div>

            {/* identification type - text input */}
            <div className=" form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Identification Type
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                value={"Ear Tag"}
                disabled
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-black input input-bordered disabled:bg-white/10 disabled:text-white"
              />
            </div>

            {/* position - text input */}
            <div className="col-span-2 form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Identification Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter identification number"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
                value={formData.identification.earTag}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      identification: {
                        ...prevState.identification,
                        earTag: e.target.value,
                      },
                    };
                  });
                }}
              />
            </div>

            {/* identification type - text input */}
            <div className=" form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Identification Type
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                value={"Biometric Markers"}
                disabled
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-black input input-bordered disabled:bg-white/10 disabled:text-white"
              />
            </div>

            {/* position - text input */}
            <div className="col-span-2 form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Identification Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter identification number"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
                value={formData.identification.biometricMarkers}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      identification: {
                        ...prevState.identification,
                        biometricMarkers: e.target.value,
                      },
                    };
                  });
                }}
              />
            </div>

            {/* tag color - text input */}
            {/* <div className=" form-control">
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
            </div> */}
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
                value={formData.birthAndOriginInfo.dateOfBirth}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      birthAndOriginInfo: {
                        ...prevState.birthAndOriginInfo,
                        dateOfBirth: e.target.value,
                      },
                    };
                  });
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Country of Origin
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Country of Origin"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
                value={formData.birthAndOriginInfo.countryOfOrigin}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      birthAndOriginInfo: {
                        ...prevState.birthAndOriginInfo,
                        countryOfOrigin: e.target.value,
                      },
                    };
                  });
                }}
              />
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
                value={formData.birthAndOriginInfo.farmOfOrigin}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      birthAndOriginInfo: {
                        ...prevState.birthAndOriginInfo,
                        farmOfOrigin: e.target.value,
                      },
                    };
                  });
                }}
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
                  {formData.birthAndOriginInfo.conceptionMethod ||
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
                              birthAndOriginInfo: {
                                ...prevState.birthAndOriginInfo,
                                conceptionMethod: "Natural Mating",
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
                        Natural Mating
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-4 py-4 text-left rounded-none hover:text-white hover:bg-white/20 hover:m-0"
                        onClick={() => {
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              birthAndOriginInfo: {
                                ...prevState.birthAndOriginInfo,
                                conceptionMethod: "Artificial Insemination",
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
                        Artificial Insemination
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
                value={formData.parentageOrPedigree.sire}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      parentageOrPedigree: {
                        ...prevState.parentageOrPedigree,
                        sire: e.target.value,
                      },
                    };
                  });
                }}
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
                value={formData.parentageOrPedigree.dam}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      parentageOrPedigree: {
                        ...prevState.parentageOrPedigree,
                        dam: e.target.value,
                      },
                    };
                  });
                }}
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
                value={formData.parentageOrPedigree.surrogateId}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      parentageOrPedigree: {
                        ...prevState.parentageOrPedigree,
                        surrogateId: e.target.value,
                      },
                    };
                  });
                }}
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
                value={formData.ownerAndBreedInfo.stockBrandNumber}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      ownerAndBreedInfo: {
                        ...prevState.ownerAndBreedInfo,
                        stockBrandNumber: e.target.value,
                      },
                    };
                  });
                }}
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
                value={formData.ownerAndBreedInfo.owner}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      ownerAndBreedInfo: {
                        ...prevState.ownerAndBreedInfo,
                        owner: e.target.value,
                      },
                    };
                  });
                }}
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
                value={formData.ownerAndBreedInfo.breederOrSupplier}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      ownerAndBreedInfo: {
                        ...prevState.ownerAndBreedInfo,
                        breederOrSupplier: e.target.value,
                      },
                    };
                  });
                }}
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
                value={formData.additionalNotes}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      additionalNotes: e.target.value,
                    };
                  });
                }}
              />
            </div>

            {/* animal value */}
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Animal Value
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter in Local Currency"
                className="w-[350px] px-4 py-6 text-white border-white rounded-none text-md bg-gGray input input-bordered"
                value={formData.animalValue}
                onChange={(e) => {
                  setFormData((prevState) => {
                    return {
                      ...prevState,
                      animalValue: e.target.value,
                    };
                  });
                }}
              />
              <div className="flex flex-row pt-2">
                <p className="font-bold underline">USD</p>
                <p className="">&nbsp;${formData.animalValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAnimal;
