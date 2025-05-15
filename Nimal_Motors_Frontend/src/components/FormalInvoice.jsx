import React from "react";
import logoImage from "../assets/logo.jpg";
import carImage from "../assets/car.jpeg"; // Replace with your car image path

const InvoiceTemplate = ({ invoice }) => {
  const total = invoice.totalAmount.toFixed(2);
  const advance = invoice.advance.toFixed(2);
  const balance = invoice.balance.toFixed(2);

  const groupBySection = () => {
    const sections = {};
    invoice.items.forEach((item, idx) => {
      if (!sections[item.section]) sections[item.section] = [];
      sections[item.section].push({ ...item, idx });
    });
    return sections;
  };

  const groupedItems = groupBySection();

  return (
    <div className="p-10 bg-white max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <img src={logoImage} alt="Logo" className="h-16 mb-2" />
          <p className="text-sm">No:321/6A, Galle Road, Aluthgama</p>
          <p className="text-sm">teamnimalmotors@gmail.com</p>
          <p className="text-sm">All Vehicle Repairs, Cut & Polish & Service Center</p>
          <p className="text-sm">Reg No: 168807</p>
        </div>
        <img src={carImage} alt="Car" className="h-20" />
      </div>

      {/* Bill Info */}
      <div className="grid grid-cols-2 mt-6 text-sm">
        <div>
          <p><strong>Owner's Name:</strong> {invoice.customerName}</p>
          <p><strong>Vehicle Number:</strong> {invoice.vehicleNo}</p>
          <p><strong>Present Meter:</strong> {invoice.presentMeter}</p>
        </div>
        <div className="text-right">
          <p><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
          <p><strong>Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Item Table */}
      <table className="w-full text-sm mt-6 border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2">Sr No</th>
            <th className="border px-2">Description</th>
            <th className="border px-2">Qty</th>
            <th className="border px-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedItems).map((section, idx) => (
            <React.Fragment key={idx}>
              <tr className="bg-gray-100 font-bold">
                <td colSpan="4" className="border px-2 py-1">{section}</td>
              </tr>
              {groupedItems[section].map((item, i) => (
                <tr key={item.idx} className="text-center">
                  <td className="border px-2">{(idx + 1) * 10 + i}</td>
                  <td className="border px-2 text-left">{item.description}</td>
                  <td className="border px-2">{item.qty}</td>
                  <td className="border px-2">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mt-4 text-sm">
        <table className="text-right">
          <tbody>
            <tr>
              <td className="px-4 py-1 font-semibold">Total</td>
              <td className="px-4 py-1">Rs. {total}</td>
            </tr>
            <tr>
              <td className="px-4 py-1 font-semibold">Advance Amount</td>
              <td className="px-4 py-1">Rs. {advance}</td>
            </tr>
            <tr>
              <td className="px-4 py-1 font-semibold">Balance</td>
              <td className="px-4 py-1">Rs. {balance}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-10 border-t pt-4 text-sm">
        <p className="mb-1 font-semibold">Checked By: _________________________</p>
        <p className="italic text-gray-600">Note: The above cost is calculated according to the workshop cost accumulation and labor charges.</p>
        <p className="mt-1 font-medium">Thank you for your Business.</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
