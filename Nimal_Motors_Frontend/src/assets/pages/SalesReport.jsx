import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesReportView from "./SalesReportView";
import RevenueReport from "./RevenueReport";
import Modal from "./Modal";
import AddItem from "./SalesReportAdd";
import UpdateItem from "./SalesReportUpdate";
import DeleteItem from "./SalesReportDelete";
import RevenueAndExpense from "./RevenueAndExpense";

const SalesReport = () => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  // Sample sales data
  const [sales, setSales] = useState([
    {
      id: "001",
      name: "Product A",
      cost: 10,
      netPrice: 15,
      quantity: 100,
      profit: 500,
    },
    {
      id: "002",
      name: "Product B",
      cost: 20,
      netPrice: 30,
      quantity: 50,
      profit: 500,
    },
    {
      id: "003",
      name: "Product C",
      cost: 30,
      netPrice: 40,
      quantity: 80,
      profit: 500,
    },
  ]);

  // Sample revenue data
  const [revenue, setRevenue] = useState([
    {
      SectionId: "BS001",
      SectionName: "bodyshop",
      profite: 12500.50
    },
    {
      SectionId: "EL002",
      SectionName: "electrical",
      profite: 8500.75
    },
    {
      SectionId: "ME003",
      SectionName: "mechanical",
      profite: 18200.25
    },
    {
      SectionId: "SV004",
      SectionName: "service",
      profite: 9500.00
    }
  ]);

  // Sample revenue and expense data
  const [revenueExpense, setRevenueExpense] = useState([
    {
      SectionId: "BS001",
      SectionName: "bodyshop",
      profit: 12500.50,
      itemId: "IT001",
      itemName: "Paint Materials",
      amount: 2500.75
    },
    {
      SectionId: "EL002",
      SectionName: "electrical",
      profit: 8500.75,
      itemId: "IT002",
      itemName: "Wiring Components",
      amount: 1200.50
    },
    {
      SectionId: "ME003",
      SectionName: "mechanical",
      profit: 18200.25,
      itemId: "IT003",
      itemName: "Engine Parts",
      amount: 4500.00
    },
    {
      SectionId: "SV004",
      SectionName: "service",
      profit: 9500.00,
      itemId: "IT004",
      itemName: "Labor Charges",
      amount: 3800.00
    }
  ]);

  // Modal handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // CRUD operations for sales
  const handleAdd = (newItem) => {
    setSales([...sales, newItem]);
    closeModal();
  };

  const handleUpdate = (updatedItem) => {
    setSales(sales.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    closeModal();
  };

  const handleDelete = (itemId) => {
    setSales(sales.filter(item => item.id !== itemId));
    closeModal();
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Date Range Selector */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="font-medium text-gray-700 whitespace-nowrap">Filter by Date Range:</span>
        <DatePicker 
          selected={startDate} 
          onChange={setStartDate} 
          selectsStart 
          startDate={startDate} 
          endDate={endDate} 
          placeholderText="Start" 
          className="w-28 p-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span>-</span>
        <DatePicker 
          selected={endDate} 
          onChange={setEndDate} 
          selectsEnd 
          startDate={startDate} 
          endDate={endDate} 
          minDate={startDate} 
          placeholderText="End" 
          className="w-28 p-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Sales Report Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4"></h2>
        <SalesReportView 
          salesData={sales} 
          onEdit={(item) => openModal("update", item)}
          onDelete={(item) => openModal("delete", item)}
        />
      </div>

      {/* Revenue Report Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Details</h2>
        <RevenueReport
          revenueData={revenue}
          formatCurrency={formatCurrency}
        />
      </div>

      {/* Revenue and Expense Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue and Expense Details</h2>
        <RevenueAndExpense
          revenueExpenseData={revenueExpense}
          formatCurrency={formatCurrency}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === "add" ? "Add New Item" :
          modalType === "update" ? "Update Item" :
          "Delete Item"
        }
      >
        {modalType === "add" && (
          <AddItem 
            onAdd={handleAdd} 
            onClose={closeModal} 
          />
        )}
        {modalType === "update" && (
          <UpdateItem
            item={selectedItem}
            onUpdate={handleUpdate}
            onClose={closeModal}
          />
        )}
        {modalType === "delete" && (
          <DeleteItem
            item={selectedItem}
            onDelete={handleDelete}
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default SalesReport;