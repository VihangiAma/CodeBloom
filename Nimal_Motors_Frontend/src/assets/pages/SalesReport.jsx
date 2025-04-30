import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import SalesReportView from "./SalesReportView";
import Modal from "./Modal";
import AddItem from "./SalesReportAdd";
import UpdateItem from "./SalesReportUpdate";
import DeleteItem from "./SalesReportDelete";

const SalesReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setIsModalOpen(true);
  };
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
  const [startDate, setStartDate] = useState(new Date()); // Store start date
  const [endDate, setEndDate] = useState(new Date()); // Store end date

  const handleAdd = () => {
    const newItem = {
      id: "",
      name: "",
      cost: 0,
      netPrice: 0,
      quantity: 0,
      profit: 0,
    };
    setSales([...sales, newItem]);
  };

  const handleDelete = (index) => {
    setSales(sales.filter((_, i) => i !== index));
  };

  const handleUpdate = (index, field, value) => {
    const updatedSales = sales.map((sale, i) =>
      i === index ? { ...sale, [field]: value } : sale
    );
    setSales(updatedSales);
  };

  const handleView = (sale) => {
    alert(`Viewing details for ${sale.name}`);
  };

  return (
    <div className="p-1 max-w-7xl mx-auto">
      
        
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === "add"
            ? "Add New Item"
            : modalType === "update"
            ? "Update Item"
            : "Delete Item"
        }
      >
        {modalType === "add" && (
          <AddItem onAdd={handleAdd} onClose={() => setIsModalOpen(false)} />
        )}
        {modalType === "update" && (
          <UpdateItem
            onUpdate={handleAdd}
            onClose={() => setIsModalOpen(false)}
            item={selectedItem}
          />
        )}
        {modalType === "delete" && (
          <DeleteItem
            onClose={() => setIsModalOpen(false)}
            item={selectedItem}
          />
        )}
      </Modal>

      <div className="mt-6 text-sm text-gray-600">
        {/* <p>
          <span className="font-semibold">Selected Date Range:</span>{" "}
          {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
        </p> */}
      </div>
    </div>
  );
};

export default SalesReport;
