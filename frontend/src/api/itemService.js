
import axios from 'axios';
import { auth } from "../firebase";
const BASE_URL = 'http://localhost:4000/api'; // Update if using a different port or domain

// ------------------ ITEM API ------------------

export const fetchAllItems = async () => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.get(`${BASE_URL}/items`, {
    headers: { Authorization: `Bearer ${token}` }
  }
  );
  return response.data;
};

export const fetchItemById = async (itemId) => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.get(`${BASE_URL}/items/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const fetchItemsByUserId = async (userId) => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.get(`${BASE_URL}/items/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createItem = async ({ user_id, name, description, price, category, image }) => {
  const token = await auth.currentUser.getIdToken(true);
  console.log({ token });

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("user_id", user_id);
  formData.append("price", price);
  formData.append("image", image); // must match multer field

  const res = await axios.post(`${BASE_URL}/items`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

