import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function BankerDashboard(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);

  const renderTableRows = () => {
    let tempArr = [];
    setTableRows(tempArr);
    appData.livestockOwners.forEach((item, index) => {
      let element = (
        <tr className="" key={index}>
          <td className="text-white">{index + 1}</td>
          <td className="text-white">{item.name}</td>
          <td className="text-white">{item.age}</td>
          <td className="text-white">{item.householdSize}</td>
          <td className="text-white">{item.income}</td>
          <td className="text-white">{item.animals.length}</td>
          <td>
            <button
              className="text-black capitalize border-0 btn btn-xs bg-gGreen"
              onClick={() => {
                setAppData((prevState) => {
                  return {
                    ...prevState,
                    livestockOwnerInView: item,
                  };
                });
                navigate("/dashboard/livestockOwner/view");
              }}
            >
              View
            </button>
          </td>
        </tr>
      );
      tempArr.push(element);
      setTableRows(tempArr);
    });
  };

  useEffect(() => {
    if (appData.livestockOwners.length > 0) {
      renderTableRows();
    }
  }, [appData.livestockOwners]);

  return (
    <div className="w-full h-full px-4 overflow-x-hidden overflow-y-scroll bg-black">
      <div>
        {/* titlebar */}
        <div className="flex flex-row items-center justify-between">
          {/* title */}
          <p className="text-2xl font-bold text-white">Livestock Owners</p>
          {/* side button container */}
          <div className="flex flex-row items-center space-x-4">
            {/* <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => props.submitForm()}
            >
              Create a Group
            </button> */}
            {/* <button
              className="px-10 py-3 font-bold text-black capitalize border-4 rounded-full border-gGreen text-md h-fit btn btn-sm bg-gGreen"
              onClick={() => navigate("/dashboard/animals/register")}
            >
              Register an Animal
            </button> */}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
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
                <th className="text-white">S.No</th>
                <th className="text-white">Name</th>
                <th className="text-white">Age</th>
                <th className="text-white">Household Size</th>
                <th className="text-white">Income</th>
                <th className="text-white">Animals Population</th>
                <th className="text-white"></th>
              </tr>
            </thead>
            <tbody>
              {tableRows.length > 0 ? (
                tableRows
              ) : (
                <tr>
                  <td colSpan="7" className="text-white">
                    No data to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BankerDashboard;
