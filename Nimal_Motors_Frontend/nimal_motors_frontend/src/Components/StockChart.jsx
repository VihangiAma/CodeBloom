import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "King-Cole", quantity: 10 },
  { name: "Boyle, Schuster", quantity: 40 },
  { name: "Yundt-Mertz", quantity: 20 },
  { name: "Littel and Sons", quantity: 18 },
  { name: "Donnelly-Sipes", quantity: 8 }
];

const StockChart = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-bold text-lg mb-4">Warehouse Stock</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
