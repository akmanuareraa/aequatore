import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderLite from "../../components/HeaderLite";

import backbutton from "../../assets/svg/left-arrow.svg";
import LivestockOwnerSignup from "../../components/UserManagement/LivestockOwnerSignup";
import BankerSignup from "../../components/UserManagement/BankerSignup";
import SignupRoleSelection from "../../components/UserManagement/SignupRoleSelection";

function Signup(props) {
  const location = useLocation();
  const [windowState, setWindowState] = useState("role");
  return (
    <div className="flex flex-col h-screen">
      <HeaderLite />
      {windowState === "role" ? (
        <SignupRoleSelection setWindowState={setWindowState} />
      ) : windowState === "banker" ? (
        <BankerSignup setWindowState={setWindowState} />
      ) : windowState === "livestock" ? (
        <LivestockOwnerSignup setWindowState={setWindowState} />
      ) : null}
    </div>
  );
}

export default Signup;
