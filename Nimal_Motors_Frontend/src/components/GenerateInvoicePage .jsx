import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormalInvoice from "./FormalInvoice";
import axios from "axios";

const GenerateInvoicePage = () => {
  const { repairId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/repairs/${repairId}`)
      .then((res) => {
        const repair = res.data;

        const calculatedTotal = repair.items?.reduce((acc, item) => acc + item.amount, 0) || 0;

        setInvoiceData({
          invoiceNo: `INV-${Date.now()}`,
          customerName: repair.customerName,
          vehicleNo: repair.vehicleNo,
          presentMeter: repair.presentMeter,
          invoiceDate: new Date(),
          items: repair.items,
          totalAmount: calculatedTotal,
          advance: 0,
          balance: calculatedTotal,
          relatedRepairId: repair._id
        });
      })
      .catch((err) => console.error("Error loading repair", err));
  }, [repairId]);

  return (
    <div className="p-6">
      {invoiceData ? (
        <FormalInvoice invoiceData={invoiceData} />
      ) : (
        <p>Loading invoice...</p>
      )}
    </div>
  );
};

export default GenerateInvoicePage;
