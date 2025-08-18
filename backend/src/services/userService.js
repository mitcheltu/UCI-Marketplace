const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');


exports.fetchAllUsers = async () => {
  return await userModel.getAllUsers();
};

exports.fetchTenUsers = async () => {
  return await userModel.getTenUsers();
};

// Create a new user
exports.createUser = async (userData) => {
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  return await userModel.addUser(userData);
};

// Delete a user by ID
exports.removeUser = async (userId) => {
  return await userModel.deleteUser(userId);
};

// // Update user details
// exports.modifyUser = async (userId, userData) => {
//   if (userData.password) {
//     // Hash the new password before updating
//     userData.password = await bcrypt.hash(userData.password, 10);
//   }
//   return await userModel.updateUser(userId, userData);
// };

// Get user by ID
exports.fetchUserById = async (userId) => {
  return await userModel.getUserById(userId);
};

// Authenticate user
exports.authenticateUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  throw new Error('Invalid email or password');
};