import React, { useState } from "react";
import SupervisorLayout from "./SupervisorLayout";
import ServiceSupervisorDashboard from "../ServiceSupervisorDashboard";

const ServiceDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <SupervisorLayout section="Service" activePage={activePage} setActivePage={setActivePage}>
      <ServiceSupervisorDashboard setActivePage={setActivePage} />
    </SupervisorLayout>
  );
};

export default ServiceDashboard;
