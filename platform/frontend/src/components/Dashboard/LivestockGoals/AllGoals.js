import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";

function AllGoals(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const [goalCards, setGoalCards] = useState([]);

  const renderGoalCards = () => {
    let tempArr = [];
    setGoalCards(tempArr);
    appData.userProfile.livestockGoals.forEach((goal, index) => {
      let element = (
        <tr className="" key={index}>
          <td className="text-white">{goal.id}</td>
          <td className="text-white">{goal.goalName}</td>
          <td className="text-white">{goal.goalType}</td>
          <td className="text-white">{goal.deadlineDate}</td>
          <td>
            <button
              className="text-black capitalize border-0 btn btn-xs bg-gGreen"
              onClick={() => {
                setAppData((prevState) => {
                  return {
                    ...prevState,
                    livestockGoalInView: goal,
                  };
                });
                navigate("/dashboard/livestock-goals/view");
              }}
            >
              View
            </button>
          </td>
        </tr>
      );
      tempArr.push(element);
      setGoalCards(tempArr);
    });
  };

  useEffect(() => {
    if (appData.userProfile.livestockGoals.length > 0) {
      renderGoalCards();
    }
  }, [appData.userProfile]);

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        {/* <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-bold text-white">All Livestock Goals</p>
          <div className="flex flex-row items-center space-x-4">
            <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              //   onClick={() => props.submitForm()}
            >
              Create a New Goal
            </button>
          </div>
        </div> */}

        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="text-white">Id</th>
                <th className="text-white">Goal Name</th>
                <th className="text-white">Goal Type</th>
                <th className="text-white">Deadline</th>
                <th className="text-white"></th>
              </tr>
            </thead>
            <tbody>
              {goalCards.length > 0 ? (
                goalCards
              ) : (
                <tr>
                  <td className="text-white">No Goals Created</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllGoals;
