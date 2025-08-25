import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Sinfodedashboard from "../pages/staff/1_dashboard/dashboard";
import Students from "../pages/staff/student/student";


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
       <Route
        path="/staff/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />
     
    </Routes>
  );
};

export default StaffRoutes;
