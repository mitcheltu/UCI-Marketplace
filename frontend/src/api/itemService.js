
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api'; // Update if using a different port or domain

// ------------------ ITEM API ------------------

export const fetchAllItems = async () => {
  const response = await axios.get(`${BASE_URL}/items`);
  return response.data;
};

export const fetchItemById = async (itemId) => {
  const response = await axios.get(`${BASE_URL}/items/${itemId}`);
  return response.data;
};

export const createItem = async ({ user_id, name, description, price, category, image }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("user_id", user_id);
  formData.append("price", price);
  formData.append("image", image); // key must match backend (multer field)

  const res = await axios.post(`${BASE_URL}/items`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};