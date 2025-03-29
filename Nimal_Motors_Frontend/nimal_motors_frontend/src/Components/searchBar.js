import React from "react";

function SearchBar({ stock, setFilteredStock }) {
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredStock(
      stock.filter((item) =>
        item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      )
    );
  };
  return <input type="text" placeholder="Search..." onChange={handleSearch} />;
}
export default SearchBar;