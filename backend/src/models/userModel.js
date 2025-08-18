const pool = require('../config/db');

async function getAllUsers() {
    const result = await pool.query('SELECT * FROM Users;');
    return result.rows;
}

async function getTenUsers() {
  const result = await pool.query('SELECT * FROM Users LIMIT 10;');
  return result.rows;
}

async function getUserById(userId) {
  const result = await pool.query('SELECT * FROM Users WHERE id = $1;', [userId]);
  return result.rows[0];
}

async function addUser(user) {
  const { username, email, password } = user;
  const result = await pool.query(
    'INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
    [username, email, password]
  );
  return result.rows[0];
}

// async function updateUser(userId, user) {
//   const { name, email, password } = user;
//   const result = await pool.query(
//     'UPDATE Users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *;',
//     [name, email, password, userId]
//   );
//   return result.rows[0];
// }

async function deleteUser(userId) {
  const result = await pool.query('DELETE FROM Users WHERE id = $1 RETURNING *;', [userId]);
  return result.rows[0];
}

module.exports = {
    getAllUsers,
    getTenUsers,
    getUserById,
    addUser,
    // updateUser,
    deleteUser
};