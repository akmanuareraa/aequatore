import React from "react";
import { useLocation } from "react-router-dom";

function Breadcrumbs(props) {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" ? (
        <div className="px-4 overflow-hidden text-sm text-white py-7 pb-9 breadcrumbs">
          <ul className="">
            <li className="text-gLightGray hover:cursor-pointer">Dashboard</li>
            <li className="hover:cursor-pointer">My Farm</li>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default Breadcrumbs;
