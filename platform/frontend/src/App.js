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
import RegisterAnimal from "./components/Dashboard/Animals/RegisterAnimal";
import CreateNewGoal from "./components/Dashboard/LivestockGoals/CreateNewGoal";
import PrivateRouteGuard from "./PrivateRouteGuard";
import AnimalView from "./components/Dashboard/Animals/AnimalView";
import GoalView from "./components/Dashboard/LivestockGoals/GoalView";
import BankerDashboard from "./pages/Banker/BankerDashboard";
import LivesotckOwnerView from "./pages/Banker/LivesotckOwnerView";
import LivestockValueView from "./components/Dashboard/LivestockValue/LivestockValueView";

function App() {
  const location = useLocation();

  return (
    <AppProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard/my-farm" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/my-farm" />}
        />
        <Route
          path="/dashboard/my-farm"
          element={
            <PrivateRouteGuard>
              <MyFarm />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/livestock-goals"
          element={
            <PrivateRouteGuard>
              <LivestockGoals />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/livestock-goals/view"
          element={
            <PrivateRouteGuard>
              <GoalView />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/animals"
          element={
            <PrivateRouteGuard>
              <Animals />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/animals/view"
          element={
            <PrivateRouteGuard>
              <AnimalView />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/my-schedule"
          element={
            <PrivateRouteGuard>
              <MySchedule />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/pasture-management"
          element={
            <PrivateRouteGuard>
              <PastureManagement />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/inventory/equipments"
          element={
            <PrivateRouteGuard>
              <Equipments />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/reports/breeder-report"
          element={
            <PrivateRouteGuard>
              <BreederReport />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/reports/health-report"
          element={
            <PrivateRouteGuard>
              <HealthReport />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/feed-management/ingredient-inventory"
          element={
            <PrivateRouteGuard>
              <IngredientInventory />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/feed-management/ingredient-library"
          element={
            <PrivateRouteGuard>
              <IngredientLibrary />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/feed-management/ration-library"
          element={
            <PrivateRouteGuard>
              <RationLibrary />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/feed-management/suppliers"
          element={
            <PrivateRouteGuard>
              <Suppliers />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/animals/register"
          element={
            <PrivateRouteGuard>
              <RegisterAnimal />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/livestock-goals/create"
          element={
            <PrivateRouteGuard>
              <CreateNewGoal />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/livestock-value"
          element={
            <PrivateRouteGuard>
              <LivestockValueView />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/banker"
          element={
            <PrivateRouteGuard>
              <BankerDashboard />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/dashboard/livestockOwner/view"
          element={
            <PrivateRouteGuard>
              <LivesotckOwnerView />
            </PrivateRouteGuard>
          }
        />
        <Route path="/support/faq" element={<Faq />} />
        <Route path="/support/enquiry" element={<Enquiry />} />
        <Route path="/support/contact" element={<Contact />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
