const API_URL = "http://localhost:5000/stock";

export async function getStockItems() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addStockItem(item) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return response.json();
}
