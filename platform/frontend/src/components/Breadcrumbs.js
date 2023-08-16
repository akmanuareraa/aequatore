import React from "react";

function Breadcrumbs(props) {
  return (
    <div className="px-4 overflow-hidden text-sm text-white py-7 pb-9 breadcrumbs">
      <ul className="">
        <li className="text-gLightGray hover:cursor-pointer">Dashboard</li>
        <li className="hover:cursor-pointer">My Farm</li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
