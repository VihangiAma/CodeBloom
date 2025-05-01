import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesReportView from "./SalesReportView";
import Modal from "./Modal";
import AddItem from "./SalesReportAdd";
import UpdateItem from "./SalesReportUpdate";
import DeleteItem from "./SalesReportDelete";

const SalesReport = () => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  // Sample data - in a real app, this would come from an API
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

  // CRUD operations
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

  return (
<<<<<<< Updated upstream
    <div className="p-1 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Sales Report</h2>
        <div className="flex space-x-6 items-center">
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              minDate={startDate} // Ensure end date is after start date
            />
          </div>
        </div>
      </div>
=======
    <div className="container mx-auto px-4 py-8">
     
        {/* Date Range Selector */}
       
        <div className="flex items-center gap-2 text-sm">
  <span className="font-medium text-gray-700 whitespace-nowrap">Filter by Date Range:</span>
  <DatePicker selected={startDate} onChange={setStartDate} selectsStart startDate={startDate} endDate={endDate} placeholderText="Start" className="w-28 p-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"/>
  <span>-</span>
  <DatePicker selected={endDate} onChange={setEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} placeholderText="End" className="w-28 p-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"/>
</div>
        
>>>>>>> Stashed changes

        {/* Sales Report Table */}
        <div className="mb-8">
          <SalesReportView salesData={sales} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => openModal("add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add New Item
          </button>
          {sales.length > 0 && (
            <>
              <button
                onClick={() => openModal("update", sales[0])}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
                disabled={!selectedItem}
              >
                Update Item
              </button>
              <button
                onClick={() => openModal("delete", sales[0])}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                disabled={!selectedItem}
              >
                Delete Item
              </button>
            </>
          )}
        </div>
      

<<<<<<< Updated upstream
      <SalesReportView />

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Item
        </button>

        <button
          onClick={() => openModal("update", sales[0])}
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-yellow-600"
        >
          Update Item
        </button>

        <button
          onClick={() => openModal("delete", sales[0])}
          className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Delete Item
        </button>
      </div>

      {/* Modal Logic */}
=======
      {/* Modal */}
>>>>>>> Stashed changes
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