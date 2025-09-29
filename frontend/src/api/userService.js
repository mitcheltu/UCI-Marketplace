import axios from 'axios';
import { auth } from "../firebase";

const BASE_URL = 'http://localhost:4000/api'; // Update if using a different port or domain

// ------------------ USER API ------------------

export const fetchAllUsers = async () => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.get(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  }
  );
  return response.data;
};

export const fetchUserById = async (userId) => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.get(`${BASE_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }
  );
  return response.data;
};

export const fetchUsersByItemIds = async (itemIds) => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.post(`${BASE_URL}/users/by-item-ids`, { itemIds }, {
    headers: { Authorization: `Bearer ${token}` }
  }
  );
  return response.data;
};

export const createUser = async (userData) => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.post(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
    userData});
  return response.data;
};