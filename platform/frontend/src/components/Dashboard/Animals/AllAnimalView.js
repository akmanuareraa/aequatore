import React from "react";

function AllAnimalView(props) {
  return (
    <div className="flex flex-col p-4 mt-6 rounded-sm bg-gLightGray/30">
      {/* tab */}
      <div className="rounded-md tabs tabs-boxed bg-gLightGray/20">
        <a
          className={
            props.tabView === "all" ? "text-white tab tab-active" : "text-white tab"
          }
          onClick={() => props.setTabView("all")}
        >
          All (0)
        </a>

        <a
          className={
            props.tabView === "male" ? "text-white tab tab-active" : "text-white tab"
          }
          onClick={() => props.setTabView("male")}
        >
          Male (0)
        </a>
        <a
          className={
            props.tabView === "female"
              ? "text-white tab tab-active"
              : "text-white tab"
          }
          onClick={() => props.setTabView("female")}
        >
          Female (0)
        </a>
      </div>
      {/* tab content */}
      <div className="mt-4 text-white">
        {props.tabView === "all" ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        // checked="checked"
                        className="w-5 h-5 bg-white checkbox checkbox-success"
                      />
                    </th>
                    <th className="text-white">ID</th>
                    <th className="text-white">Tag</th>
                    <th className="text-white">Date of Birth</th>
                    <th className="text-white">Gender</th>
                    <th className="text-white">Breed</th>
                    <th className="text-white">Reg. Date</th>
                    <th className="text-white">Status</th>
                    <th className="text-white"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th>
                      <input
                        type="checkbox"
                        // checked="checked"
                        className="w-5 h-5 bg-white checkbox checkbox-success"
                      />
                    </th>
                    <td>1</td>
                    <td>AF8556</td>
                    <td>2020-01-01</td>
                    <td>Male</td>
                    <td>Golden Retriever</td>
                    <td>2020-01-01</td>
                    <td>On the Farm</td>
                    <td>
                      <button className="text-black capitalize border-0 btn btn-xs bg-gGreen">
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : props.tabView === "license" ? (
          <></>
        ) : props.tabView === "location" ? (
          <div className="grid items-center justify-center grid-cols-3 p-4 py-6 rounded-md gap-y-2 bg-gLightGray/30"></div>
        ) : null}
      </div>
    </div>
  );
}

export default AllAnimalView;
