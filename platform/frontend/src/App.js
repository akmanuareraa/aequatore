import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Transition from "./components/Transition";
import "./App.css";
import { AppProvider } from "./AppContext";

import MyFarm from "./pages/Dashboard/MyFarm";
import Animals from "./pages/Dashboard/Animals";
import LivestockGoals from "./pages/Dashboard/LivestockGoals";
import MySchedule from "./pages/Dashboard/MySchedule";
import PastureManagement from "./pages/Dashboard/PastureManagement";
import Equipments from "./pages/Dashboard/Inventory/Equipments";
import BreederReport from "./pages/Dashboard/Reports/BreederReport";
import HealthReport from "./pages/Dashboard/Reports/HealthReport";
import IngredientInventory from "./pages/Dashboard/FeedManagement/IngredientInventory";
import IngredientLibrary from "./pages/Dashboard/FeedManagement/IngredientLibrary";
import RationLibrary from "./pages/Dashboard/FeedManagement/RationLibrary";
import Suppliers from "./pages/Dashboard/FeedManagement/Suppliers";
import Faq from "./pages/Dashboard/Support/Faq";
import Enquiry from "./pages/Dashboard/Support/Enquiry";
import Contact from "./pages/Dashboard/Support/Contact";
import Signin from "./pages/UserManagement/Signin";
import Signup from "./pages/UserManagement/Signup";

function App() {
  const location = useLocation();

  return (
    <AppProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/my-farm" />}
        />
        <Route path="/dashboard/my-farm" element={<MyFarm />} />
        <Route path="/dashboard/livestock-goals" element={<LivestockGoals />} />
        <Route path="/dashboard/animals" element={<Animals />} />
        <Route path="/dashboard/my-schedule" element={<MySchedule />} />
        <Route
          path="/dashboard/pasture-management"
          element={<PastureManagement />}
        />
        <Route
          path="/dashboard/inventory/equipments"
          element={<Equipments />}
        />
        <Route
          path="/dashboard/reports/breeder-report"
          element={<BreederReport />}
        />
        <Route
          path="/dashboard/reports/health-report"
          element={<HealthReport />}
        />
        <Route
          path="/dashboard/feed-management/ingredient-inventory"
          element={<IngredientInventory />}
        />
        <Route
          path="/dashboard/feed-management/ingredient-library"
          element={<IngredientLibrary />}
        />
        <Route
          path="/dashboard/feed-management/ration-library"
          element={<RationLibrary />}
        />
        <Route
          path="/dashboard/feed-management/suppliers"
          element={<Suppliers />}
        />
        <Route path="/support/faq" element={<Faq />} />
        <Route path="/support/enquiry" element={<Enquiry />} />
        <Route path="/support/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AppProvider>
  );
}

export default App;