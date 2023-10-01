import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";

function Breadcrumbs(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [elements, setElements] = useState([]);

  const processElements = () => {
    let tempArr = [];
    setElements(tempArr);
    appData.breadCrumbs.forEach((item, index) => {
      let element = null;
      if (index === elements.length - 1) {
        element = (
          <li key={index} className="text-white">
            {item.label}
          </li>
        );
      } else {
        element = (
          <li
            key={index}
            className="text-gLightGray hover:cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            {item.label}
          </li>
        );
      }
      tempArr.push(element);
      setElements(tempArr);
    });
  };

  useEffect(() => {
    // console.log("appData.breadCrumbs", appData.breadCrumbs);
    if (Object.keys(appData.breadCrumbs).length > 0) {
      processElements();
    }
  }, [appData]);

  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" ? (
        <div className="px-4 overflow-hidden text-sm text-white py-7 pb-9 breadcrumbs">
          <ul className="">
            <li
              className="text-gLightGray hover:cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>
            {elements}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default Breadcrumbs;
