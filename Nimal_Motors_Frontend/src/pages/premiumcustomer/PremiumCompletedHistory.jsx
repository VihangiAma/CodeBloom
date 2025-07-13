import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const CompletedServiceHistory = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState({ fullName: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser({
          fullName: decoded.fullName || 'Nimal Motors Customer',
          email: decoded.email || 'No Email',
        });
      } catch (err) {
        console.error('Token decode error:', err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/history/premiumcompleted', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error('Failed to load completed service history', err);
      }
    };

    fetchCompleted();
  }, []);

  const downloadPDF = () => {
    if (
      !data ||
      !data.mechanical ||
      !data.electrical ||
      !data.bodyshop ||
      !data.appointments
    ) {
      alert('No completed service history available to export.');
      return;
    }

    const allData = [
      ...data.mechanical.map((d) => ({ section: 'Mechanical', ...d })),
      ...data.electrical.map((d) => ({ section: 'Electrical', ...d })),
      ...data.bodyshop.map((d) => ({ section: 'Bodyshop', ...d })),
      ...data.appointments.map((d) => ({ section: 'Appointment', ...d })),
    ];

    if (allData.length === 0) {
      alert('No completed services found to export.');
      return;
    }

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('NIMAL MOTORS', 105, 15, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('No:321/2A, Galle Road, Aluthgama', 105, 20, { align: 'center' });
    doc.text('Tel: 055-2298868 / 077-8888888', 105, 25, { align: 'center' });
    doc.text('Email: nimalmotors.nm@gmail.com', 105, 30, { align: 'center' });
    doc.text('All Vehicle Repairs, Cut & Polish & Service Center', 105, 35, { align: 'center' });
    doc.text('Reg No: 168507', 105, 40, { align: 'center' });

    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Completed Service History Report', 105, 55, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Customer Name: ${user.fullName}`, 20, 65);
    doc.text(`Email: ${user.email}`, 20, 71);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 77);

    autoTable(doc, {
      startY: 85,
      head: [['Section', 'Vehicle No', 'Service Date', 'Status']],
      body: allData.map((d) => [
        d.section,
        d.vehicleNumber || 'N/A',
        d.serviceDate
          ? new Date(d.serviceDate).toLocaleDateString()
          : d.date
          ? new Date(d.date).toLocaleDateString()
          : 'N/A',
        d.status || 'Completed',
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 3,
        valign: 'middle',
      },
      headStyles: {
        fillColor: [176, 0, 32],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(
        `Page ${i} of ${pageCount} | Nimal Motors Aluthgama`,
        105,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    doc.save(`Completed_Service_Report_${user.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  if (!data) return null;

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
      <button
        onClick={downloadPDF}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#8f2222ff')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#8f2222ff')}
      >
        Download PDF Report
      </button>
    </div>
  );
};

export default CompletedServiceHistory;
