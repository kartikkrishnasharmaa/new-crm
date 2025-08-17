import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import SinfodeAdminRoutes from "./SInfodeAdminRoutes";
import SinfodemanagerRoutes from "./SInfodeManagerRoutes";
import StaffRoutes from "./StaffRoutes";
const AppRoutes = () => {
  return (
    <Router>
      <PublicRoutes />
      <SinfodeAdminRoutes />
      <StaffRoutes />
      <SinfodemanagerRoutes />
    </Router>
  );
};

export default AppRoutes;