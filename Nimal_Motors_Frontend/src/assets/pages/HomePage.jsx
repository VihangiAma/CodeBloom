import React from 'react';
import SalesReport from './SalesReport';
import SalesReportAdd from './SalesReportAdd';
import SalesReportUpdate from './SalesReportUpdate';
import SalesReportDelete from './SalesReportDelete';
import AdminDashboard from './AdminDashBord';




export default function HomePage() {
  return (
    <div>
      <AdminDashboard/>
       <SalesReport/>
       <SalesReportAdd/>
       <SalesReportUpdate/>
       <SalesReportDelete/>
    </div>
  );
}
