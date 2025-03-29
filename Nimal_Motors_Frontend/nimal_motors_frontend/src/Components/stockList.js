import React from "react";

function StockList({ stock }) {
  return (
    <ul>
      {stock.map((item) => (
        <li key={item._id}>{item.name} - {item.category} ({item.quantity})</li>
      ))}
    </ul>
  );
}
export default StockList;