import React from "react";

import loadingAnimation from "../assets/svg/loading.svg";

function Loading(props) {
  return (
    <div className="fixed z-20 w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-black">
        <img
          src={loadingAnimation}
          className="w-60 h-60"
          alt="geoblocs loading animation"
        />
        <p className="text-2xl font-bold text-white">Please Wait</p>
        <p className="text-lg font-light text-white">{props.message}</p>
      </div>
    </div>
  );
}

export default Loading;
