import React from "react";

import symbol from "../assets/svg/logo-symbol-w-c.svg";
import name from "../assets/svg/logo-name-w-c.svg";

function HeaderLite(props) {
  return (
    <div className="flex flex-row items-center justify-between p-4 px-8">
      <div className="flex flex-row items-center justify-center py-3 space-x-2">
        <img src={symbol} className="w-10 h-10" alt="aequatore logo" />
        <img src={name} className="h-10 pt-1 w-44" alt="aequatore logo" />
      </div>
      <button
        className="px-8 py-2 text-black capitalize bg-white border-0 rounded-full btn"
        onClick={() => window.open("https://aequatore.it", "_self")}
      >
        Home
      </button>
    </div>
  );
}

export default HeaderLite;
