import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

function AllAnimalView(props) {
  const navigate = useNavigate();
  const { appData, setAppData } = useContext(AppContext);
  const [animalCards, setAnimalCards] = useState([]);
  const [maleAnimalCards, setMaleAnimalCards] = useState([]);
  const [femaleAnimalCards, setFemaleAnimalCards] = useState([]);
  const [tabView, setTabView] = useState("all");
  const [population, setPopulation] = useState({
    total: 0,
    male: 0,
    female: 0,
  });

  const renderAnimalCards = () => {
    let tempArr = [];
    let maleTempArr = [];
    let femaleTempArr = [];
    let male = 0;
    let female = 0;
    setAnimalCards(tempArr);
    setMaleAnimalCards(maleTempArr);
    setFemaleAnimalCards(femaleTempArr);
    setPopulation(appData.userProfile.animals.length);
    appData.userProfile.animals.forEach((item, index) => {
      if (item.generalInformation.gender === "Male") {
        male++;
        let element = (
          <tr className="" key={index}>
            {/* <th>
              <input
                type="checkbox"
                // checked="checked"
                className="w-5 h-5 bg-white checkbox checkbox-success"
              />
            </th> */}
            <td>{item.id}</td>
            <td>{item.animalIdentification.animalName}</td>
            <td>{item.generalInformation.species}</td>
            <td> {item.generalInformation.subSpecies}</td>
            <td>{item.generalInformation.gender}</td>
            <td>{item.generalInformation.class}</td>
            <td>
              <button
                className="text-black capitalize border-0 btn btn-xs bg-gGreen"
                onClick={() => {
                  setAppData((prevState) => {
                    return {
                      ...prevState,
                      animalInView: item,
                    };
                  });
                  navigate("/dashboard/animals/view");
                }}
              >
                View
              </button>
            </td>
          </tr>
        );
        maleTempArr.push(element);
        tempArr.push(element);
        setMaleAnimalCards(maleTempArr);
        setAnimalCards(tempArr);
        setPopulation((prevState) => {
          return {
            ...prevState,
            male: male,
          };
        });
      } else if (item.generalInformation.gender === "Female") {
        female++;
        let element = (
          <tr className="" key={index}>
            {/* <th>
              <input
                type="checkbox"
                // checked="checked"
                className="w-5 h-5 bg-white checkbox checkbox-success"
              />
            </th> */}
            <td>{item.id}</td>
            <td>{item.animalIdentification.animalName}</td>
            <td>{item.generalInformation.species}</td>
            <td> {item.generalInformation.subSpecies}</td>
            <td>{item.generalInformation.gender}</td>
            <td>{item.generalInformation.class}</td>
            <td>
              <button
                className="text-black capitalize border-0 btn btn-xs bg-gGreen"
                onClick={() => {
                  setAppData((prevState) => {
                    return {
                      ...prevState,
                      animalInView: item,
                    };
                  });
                  navigate("/dashboard/animals/view");
                }}
              >
                View
              </button>
            </td>
          </tr>
        );
        femaleTempArr.push(element);
        tempArr.push(element);
        setFemaleAnimalCards(femaleTempArr);
        setAnimalCards(tempArr);
        setPopulation((prevState) => {
          return {
            ...prevState,
            female: female,
          };
        });
      }
    });
  };

  useEffect(() => {
    if (appData.userProfile.animals.length > 0) {
      renderAnimalCards();
    }
  }, [appData.userProfile]);

  return (
    <div className="flex flex-col p-4 mt-6 rounded-sm bg-gLightGray/30">
      {/* tab */}
      <div className="rounded-md tabs tabs-boxed bg-gLightGray/20">
        <a
          className={
            tabView === "all" ? "text-white tab tab-active" : "text-white tab"
          }
          onClick={() => setTabView("all")}
        >
          All ({animalCards.length})
        </a>

        <a
          className={
            tabView === "male" ? "text-white tab tab-active" : "text-white tab"
          }
          onClick={() => setTabView("male")}
        >
          Male ({maleAnimalCards.length})
        </a>
        <a
          className={
            tabView === "female"
              ? "text-white tab tab-active"
              : "text-white tab"
          }
          onClick={() => setTabView("female")}
        >
          Female ({femaleAnimalCards.length})
        </a>
      </div>
      {/* tab content */}
      <div className="mt-4 text-white">
        {tabView === "all" ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    {/* <th>
                      <input
                        type="checkbox"
                        // checked="checked"
                        className="w-5 h-5 bg-white checkbox checkbox-success"
                      />
                    </th> */}
                    <th className="text-white">ID</th>
                    <th className="text-white">Name</th>
                    <th className="text-white">Species</th>
                    <th className="text-white">Sub-Species</th>
                    <th className="text-white">Gender</th>
                    <th className="text-white">Class</th>
                    <th className="text-white"></th>
                  </tr>
                </thead>
                <tbody>{animalCards}</tbody>
              </table>
            </div>
          </>
        ) : tabView === "female" ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    {/* <th>
                      <input
                        type="checkbox"
                        // checked="checked"
                        className="w-5 h-5 bg-white checkbox checkbox-success"
                      />
                    </th> */}
                    <th className="text-white">ID</th>
                    <th className="text-white">Name</th>
                    <th className="text-white">Species</th>
                    <th className="text-white">Sub-Species</th>
                    <th className="text-white">Gender</th>
                    <th className="text-white">Class</th>
                    <th className="text-white"></th>
                  </tr>
                </thead>
                <tbody>{femaleAnimalCards}</tbody>
              </table>
            </div>
          </>
        ) : tabView === "male" ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    {/* <th>
                      <input
                        type="checkbox"
                        // checked="checked"
                        className="w-5 h-5 bg-white checkbox checkbox-success"
                      />
                    </th> */}
                    <th className="text-white">ID</th>
                    <th className="text-white">Name</th>
                    <th className="text-white">Species</th>
                    <th className="text-white">Sub-Species</th>
                    <th className="text-white">Gender</th>
                    <th className="text-white">Class</th>
                    <th className="text-white"></th>
                  </tr>
                </thead>
                <tbody>{maleAnimalCards}</tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AllAnimalView;
