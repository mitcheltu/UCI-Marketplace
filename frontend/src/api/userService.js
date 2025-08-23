import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api'; // Update if using a different port or domain

// ------------------ USER API ------------------

export const fetchAllUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const fetchUserById = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

export const fetchUsersByItemIds = async (itemIds) => {
  const response = await axios.post(`${BASE_URL}/users/by-item-ids`, { itemIds });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};