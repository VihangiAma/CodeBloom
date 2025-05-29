import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FinancialReport = () => {
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);
  const [filteredCredits, setFilteredCredits] = useState([]);
  const [filteredDebits, setFilteredDebits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

 
  const months = [
    { value: '', label: 'All Months' },
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' }
  ];

  // Generate array of recent years for dropdown (current year and 4 previous years)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch both credits and debits in parallel
        const [creditsResponse, debitsResponse] = await Promise.all([
          axios.get("http://localhost:5001/api/NewSalesReports"),
          axios.get("http://localhost:5001/api/expenses")
        ]);

        const processData = (data, type) => {
          const items = Array.isArray(data) ? data : [data];
          return items.map(item => ({
            ...item,
            type,
            amount: Number(item.Amount || item.amount || 0),
            date: item.date ? new Date(item.date) : new Date(),
            Section: item.Section || 'Other',
            description: item.description || 'N/A',
            supplier: item.supplier || 'N/A',
            month: item.date ? new Date(item.date).getMonth() : new Date().getMonth(),
            year: item.date ? new Date(item.date).getFullYear() : new Date().getFullYear()
          }));
        };
        
        // Process and store the fetched data
        const processedCredits = processData(creditsResponse.data, 'credit');
        const processedDebits = processData(debitsResponse.data, 'debit');
        
        setCredits(processedCredits);
        setDebits(processedDebits);
        setFilteredCredits(processedCredits);
        setFilteredDebits(processedDebits);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to load financial data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data whenever month/year selection or raw data changes
  useEffect(() => {
    if (credits.length > 0 && debits.length > 0) {
      filterData();
    }
  }, [selectedMonth, selectedYear, credits, debits]);

  // Filter credits and debits based on selected month and year
  const filterData = () => {
    let filteredCreds = credits;
    let filteredDebs = debits;

    if (selectedMonth !== '') {
      filteredCreds = filteredCreds.filter(item => item.month === parseInt(selectedMonth));
      filteredDebs = filteredDebs.filter(item => item.month === parseInt(selectedMonth));
    }

    if (selectedYear) {
      filteredCreds = filteredCreds.filter(item => item.year === parseInt(selectedYear));
      filteredDebs = filteredDebs.filter(item => item.year === parseInt(selectedYear));
    }

    setFilteredCredits(filteredCreds);
    setFilteredDebits(filteredDebs);
  };

  // Prepare data for section bar chart
  const prepareSectionChartData = () => {
    const sections = ['Mechanical', 'Appointments', 'Electrical', 'Bodyshop'];
    const sectionTotals = sections.map(section => {
      return filteredCredits
        .filter(item => item.Section === section)
        .reduce((sum, item) => sum + item.amount, 0);
    });

    // Calculate total credits for each section
    return {
      labels: sections,
      datasets: [{
        label: 'Credit Amount by Section (Rs.)',
        data: sectionTotals,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    };
  };

  const sectionChartData = prepareSectionChartData();


  // Function to add header to PDF document
  const addHeader = (doc, isFirstPage = true) => {
    if (!isFirstPage) return 15;
   
    // Add report title with selected month/year
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

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    const monthLabel = selectedMonth !== '' ? months.find(m => m.value === selectedMonth)?.label : 'All Months';
    doc.text(`Financial Report - ${monthLabel} ${selectedYear}`, 105, 50, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 105, 55, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 60, 195, 60);
    
    return 65;
  };

   // Generate and download PDF report
  const downloadReport = () => {
    try {
      if (filteredCredits.length === 0 && filteredDebits.length === 0) {
        alert('No data available to generate report');
        return;
      }

      const doc = new jsPDF();
      let isFirstPage = true;
      
      let startY = addHeader(doc, isFirstPage);
      
      // Credits Table
      doc.setFontSize(12);
      doc.text('Credits', 15, startY);
      
      // Generate credits table using autoTable
      autoTable(doc, {
        startY: startY + 5,
        head: [['Date', 'Section', 'Amount']],
        body: filteredCredits.map(item => [
          item.date.toISOString().split('T')[0],
          item.Section,
          `Rs. ${item.amount.toFixed(2)}`
        ]),
        headStyles: {
          fillColor: [220, 220, 220],
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          halign: 'left'
        },
        columnStyles: {
          2: { halign: 'right' }
        },
        margin: { top: 10 },
        didDrawPage: function(data) {
          if (data.pageNumber === 1) {
            isFirstPage = false;
          } else {
            this.settings.margin.top = 15;
          }
        }
      });
      
      // Debits Table
      doc.setFontSize(12);
      doc.text('Debits', 15, doc.lastAutoTable.finalY + 15);
      
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Date', 'Supplier', 'Details', 'Amount']],
        body: filteredDebits.map(item => [
          item.date.toISOString().split('T')[0],
          item.supplier,
          item.description,
          `Rs. ${item.amount.toFixed(2)}`
        ]),
        headStyles: {
          fillColor: [220, 220, 220],
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          halign: 'left'
        },
        columnStyles: {
          3: { halign: 'right' }
        },
        didDrawPage: function(data) {
          if (data.pageNumber === 1) {
            isFirstPage = false;
          } else {
            this.settings.margin.top = 15;
          }
        }
      });
      
      // Calculate totals
      const totalCredits = filteredCredits.reduce((sum, item) => sum + item.amount, 0);
      const totalDebits = filteredDebits.reduce((sum, item) => sum + item.amount, 0);
      const netBalance = totalCredits - totalDebits;
      
      // Summary
      doc.setFontSize(12);
      doc.text(`Total Credits: Rs. ${totalCredits.toFixed(2)}`, 15, doc.lastAutoTable.finalY + 15);
      doc.text(`Total Debits: Rs. ${totalDebits.toFixed(2)}`, 15, doc.lastAutoTable.finalY + 25);
      doc.setFont('helvetica', 'bold');
      doc.text(`Net Balance: Rs. ${netBalance.toFixed(2)}`, 15, doc.lastAutoTable.finalY + 35);
      
      const monthLabel = selectedMonth !== '' ? months.find(m => m.value === selectedMonth)?.label : 'All';
      doc.save(`financial_report_${monthLabel}_${selectedYear}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check console for details.');
    }
  };

  // Loading state UI

  if (loading) {
    return <div className="text-center py-8">Loading financial data...</div>;
  }

  // Error state UI
  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  // Main component UI
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Financial Report Details</h2>
        <div className="flex space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 rounded"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 rounded"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button 
            onClick={downloadReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Download Report'}
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Credits</h2>
          <div className="text-sm text-gray-600">
            Showing {filteredCredits.length} of {credits.length} records
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Section</th>
              <th className="border p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredCredits.length === 0 ? (
              <tr>
                <td colSpan="3" className="border p-4 text-center text-gray-500">
                  No credit records found
                </td>
              </tr>
            ) : (
              filteredCredits.map((item, index) => (
                <tr key={`credit-${index}`} className="hover:bg-gray-50">
                  <td className="border p-2">{item.date.toLocaleDateString()}</td>
                  <td className="border p-2">{item.Section}</td>
                  <td className="border p-2 text-right text-green-600">
                    Rs. {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Debits</h2>
          <div className="text-sm text-gray-600">
            Showing {filteredDebits.length} of {debits.length} records
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Supplier</th>
              <th className="border p-2 text-left">Details</th>
              <th className="border p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredDebits.length === 0 ? (
              <tr>
                <td colSpan="4" className="border p-4 text-center text-gray-500">
                  No debit records found
                </td>
              </tr>
            ) : (
              filteredDebits.map((item, index) => (
                <tr key={`debit-${index}`} className="hover:bg-gray-50">
                  <td className="border p-2">{item.date.toLocaleDateString()}</td>
                  <td className="border p-2">{item.supplier}</td>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2 text-right text-red-600">
                    Rs. {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Section Bar Chart - Placed under Debits table as requested */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Credit Amount by Section</h3>
        <div className="h-64">
          <Bar 
            data={sectionChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Amount (Rs.)'
                  },
                  ticks: {
                    callback: function(value) {
                      return 'Rs. ' + value;
                    }
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return 'Rs. ' + context.raw;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;