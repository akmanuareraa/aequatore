import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Transition from "./components/Transition";
import "./App.css";
import { AppProvider } from "./AppContext";

import MyFarm from "./pages/MyFarm";
import Animals from "./pages/Animals";
import LivestockGoals from "./pages/LivestockGoals";
import MySchedule from "./pages/MySchedule";
import PastureManagement from "./pages/PastureManagement";
import Equipments from "./pages/Inventory/Equipments";
import BreederReport from "./pages/Reports/BreederReport";
import HealthReport from "./pages/Reports/HealthReport";
import IngredientInventory from "./pages/FeedManagement/IngredientInventory";
import IngredientLibrary from "./pages/FeedManagement/IngredientLibrary";
import RationLibrary from "./pages/FeedManagement/RationLibrary";
import Suppliers from "./pages/FeedManagement/Suppliers";
import Faq from "./pages/Support/Faq";
import Enquiry from "./pages/Support/Enquiry";
import Contact from "./pages/Support/Contact";

function App() {
  const location = useLocation();

  return (
    <AppProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard/my-farm" />} />
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
        <Route
          path="/support/faq"
          element={<Faq />}
        />
        <Route
          path="/support/enquiry"
          element={<Enquiry />}
        />
        <Route
          path="/support/contact"
          element={<Contact />}
        />
      </Routes>
    </AppProvider>
  );
}

export default App;
