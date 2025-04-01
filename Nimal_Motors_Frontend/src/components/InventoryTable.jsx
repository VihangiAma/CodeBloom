const InventoryTable = () => {
    const stockData = [
      { id: 1, name: "Brake Pads", quantity: 50, status: "In Stock" },
      { id: 2, name: "Engine Oil", quantity: 10, status: "Low Stock" },
      { id: 3, name: "Tyres", quantity: 0, status: "Out of Stock" },
    ];
  
    return (
      <div className="bg-white p-4 mt-6 shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default InventoryTable;
  