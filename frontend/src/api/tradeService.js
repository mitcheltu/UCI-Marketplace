
import axios from 'axios';
import { auth } from "../firebase";
const BASE_URL = 'http://localhost:4000/api'; // Update if using a different port or domain



export const requestItemTrade = async (requesterID, receiverID, requesterItemsIds, receiverItemsIds) => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.post(`${BASE_URL}/trades/request-trade/${requesterID}`,
  { receiverID, requesterItemsIds, receiverItemsIds }, // body
  { headers: { Authorization: `Bearer ${token}` } } // config
);
  return response.data;
}

export const fetchTradesByUserId = async (userId) => {
  const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  const response = await axios.get(`${BASE_URL}/trades/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }
  );
  return response.data;
}