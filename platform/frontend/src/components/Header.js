import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import rightButton from "../assets/svg/right-arrow.svg";
import leftButton from "../assets/svg/left-arrow.svg";
import downArrow from "../assets/svg/down-arrow.svg";
import profilePic from "../assets/img/profile.png";
import HeaderLite from "./HeaderLite";

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" ? (
        <>
          <div className="flex flex-row items-center justify-between w-full px-4 py-2 pt-6">
            {/* left container */}
            <div className="flex flex-row items-center space-x-8">
              {/* duo button container */}
              <div className="flex flex-row items-center space-x-4">
                {/* left button */}
                <img
                  src={leftButton}
                  alt="left button"
                  className="w-10 h-10 hover:cursor-pointer"
                />
                {/* right button */}
                <img
                  src={rightButton}
                  alt="right button"
                  className="w-10 h-10 hover:cursor-pointer"
                />
              </div>

              {/* page title container */}
              <div>
                <p className="text-2xl font-bold text-white">Dashboard</p>
              </div>
            </div>

            {/* right container */}
            <details className="pb-2 dropdown dropdown-bottom dropdown-end">
              <summary className="flex flex-col bg-black border-0 btn hover:bg-black">
                {/* outer container */}
                <div className="flex flex-row items-center space-x-4">
                  {/* profile photo */}
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-white ring-offset-base-100 ring-offset-1">
                      <img src={profilePic} />
                    </div>
                  </div>

                  {/* name and email container */}
                  <div className="flex flex-col items-start justify-start space-y-0">
                    {/* name */}
                    <p className="text-lg font-bold text-white capitalize">
                      Enrico
                    </p>
                    {/* email */}
                    <p className="text-sm text-white lowercase">
                      enrico@gmail.com
                    </p>
                  </div>

                  {/* down arrow */}
                  <img src={downArrow} alt="down arrow" className="w-4 h-4" />
                </div>
              </summary>

              {/* dropdown menu */}
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-white w-full mt-4 space-y-2 ">
                <li>
                  <div
                    class="flex flex-row px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group hover:bg-gGreen justify-end"
                    onClick={() => navigate("/dashboard")}
                  >
                    {/* <img
                  src={
                    location.pathname === "/dashboard/animals"
                      ? animalsB
                      : animalsW
                  }
                  className="w-5 h-5"
                  alt="farm icon"
                /> */}
                    <span class="">Logout</span>
                  </div>
                </li>
                <li>
                  <div
                    class="flex flex-row items-center px-4 py-3 text-gray-900 rounded-lg text-black hover:cursor-pointer  group hover:bg-gGreen justify-end"
                    onClick={() => navigate("/dashboard")}
                  >
                    {/* <img
                  src={
                    location.pathname === "/dashboard/animals"
                      ? animalsB
                      : animalsW
                  }
                  className="w-5 h-5"
                  alt="farm icon"
                /> */}
                    <span class="">Profile</span>
                  </div>
                </li>
              </ul>
            </details>
          </div>
          <div className="px-4 mt-0 mb-0 divider before:bg-white/10 after:bg-white/10"></div>
        </>
      ) : null}
    </>
  );
}

export default Header;
