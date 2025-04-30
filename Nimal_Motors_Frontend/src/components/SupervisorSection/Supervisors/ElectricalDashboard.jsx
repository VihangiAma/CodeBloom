import ElectricalSupervisorSection from "../ElectriaclSupervisorDashboard";
import SupervisorLayout from "./SupervisorLayout";

const ElectricalDashboard = () => {
  return (
    <SupervisorLayout section="Electrical">
      <ElectricalSupervisorSection />
    </SupervisorLayout>
  );
};

export default ElectricalDashboard;
