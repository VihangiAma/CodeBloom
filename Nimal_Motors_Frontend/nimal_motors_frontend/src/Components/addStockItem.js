import React, { useState } from "react";
import { addStockItem } from "../Services/stockService";

function AddStockItem({ setStock }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAdd = async () => {
    const newItem = await addStockItem({ name, category, quantity });
    setStock((prev) => [...prev, newItem]);
  };

  return (
    <div>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAdd}>Add Item</button>
    </div>
  );
}
export default AddStockItem;