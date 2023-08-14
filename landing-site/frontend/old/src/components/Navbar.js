import React from "react";

import logo from "../assets/svg/logo.svg";
import logoSymbolWhite from "../assets/svg/logo-symbol-w.svg";

function Navbar(props) {
  return (
    <div className="fixed top-0 left-0 w-full px-8 py-6 bg-white">
      {/* Your navbar content goes here */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            {/* logo block */}
            <div className="flex flex-row items-center mr-16 space-x-2">
              <img src={logoSymbolWhite} alt="logo" className="w-12 h-12" />
              <p className="text-3xl font-extrabold text-black">Æquatore</p>
            </div>
          </div>

          {/* menu block */}
          <div className="flex flex-row items-center">
            <div
              className="flex flex-row items-center"
              onClick={() => console.log("clicked")}
            >
              <p className="mt-1">Who We Are</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
