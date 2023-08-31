import React, { useState, useEffect, createContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Breadcrumbs from "./components/Breadcrumbs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    status: "false",
    message: "",
  });

  const [appData, setAppData] = useState({
    userProfile: null,
    currentHeaderTitle: "",
    breadCrumbs: [],
  });

  const [miscData, setMiscData] = useState({
    applicationCount: 0,
  });

  const backendUrl = "http://localhost:3010";

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        appData,
        setAppData,
      }}
    >
      <Toaster />
      <div className="flex flex-row h-screen">
        <Navbar />
        {loading.status === "true" ? (
          <Loading message={loading.message} />
        ) : null}
        <div className="flex flex-col w-full overflow-x-hidden bg-black">
          <Header />
          {/* <Breadcrumbs /> */}
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};
