import React from "react";

function AllGoals(props) {
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
                <th className="text-white">ID</th>
                <th className="text-white">Name</th>
                <th className="text-white">Type</th>
                <th className="text-white">Deadline</th>
                <th className="text-white">Animal ID</th>
                <th className="text-white">Animal Name</th>
                <th className="text-white"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="text-white">1</td>
                <td className="text-white">Goal 1</td>
                <td className="text-white">Weight</td>
                <td className="text-white">2021-01-01</td>
                <td className="text-white">1</td>
                <td className="text-white">AF8556</td>
                <td>
                  <button className="text-black capitalize border-0 btn btn-xs bg-gGreen"
                    // onClick={() => navigate("/dashboard/livestock-goals/view/")}
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllGoals;
