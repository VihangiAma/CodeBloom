import { useContext } from "react";
import { StockContext } from "../context/StockContext";

const InventoryTable = () => {
    const { stock } = useContext(StockContext);

    return (
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Stock Qty</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {stock.map((item) => (
                    <tr key={item._id}>
                        <td>{item.itemName}</td>
                        <td>{item.category}</td>
                        <td>{item.stockQuantity}</td>
                        <td>${item.pricePerUnit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InventoryTable;
