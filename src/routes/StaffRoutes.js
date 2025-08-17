import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Sinfodedashboard from "../pages/staff/1_dashboard/dashboard";


const StaffRoutes = () => {
  return (
    <Routes>
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute>
            <Sinfodedashboard />
          </ProtectedRoute>
        }
      />
     
    </Routes>
  );
};

export default StaffRoutes;
