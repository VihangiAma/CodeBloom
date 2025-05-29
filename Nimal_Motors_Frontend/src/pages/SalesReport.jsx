import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesReportView from "./SalesReportView";
import Modal from "./Modal";

const SalesReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  
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
      
      

      {/* Sales Report Table */}
      <div className="mb-8">
        <SalesReportView 
          salesData={sales} 
          formatCurrency={formatCurrency}
          onEdit={(item) => openModal("update", item)}
          onDelete={(item) => openModal("delete", item)}
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
        {/* Modal content here */}
      </Modal>
    </div>
  );
};

export default SalesReport;