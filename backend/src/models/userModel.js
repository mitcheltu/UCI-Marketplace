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

async function addUser({ userData }) {
  const { firebase_uid, username, email } = userData;

  const safeUsername = username || (email ? email.split("@")[0] : "user");
  const safeEmail = email || null;

  const { rows } = await pool.query(
    "SELECT * FROM users WHERE firebase_uid = $1",
    [firebase_uid]
  );

  if (rows.length > 0) return rows[0];

  const insert = await pool.query(
    `INSERT INTO users (firebase_uid, username, email, created_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING *`,
    [firebase_uid, safeUsername, safeEmail]
  );

  return insert.rows[0];
}

async function updateUser(userId, user) {
  const { name, email, password } = user;
  const result = await pool.query(
    'UPDATE Users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *;',
    [name, email, password, userId]
  );
  return result.rows[0];
}

async function deleteUser(userId) {
  const result = await pool.query('DELETE FROM Users WHERE id = $1 RETURNING *;', [userId]);
  return result.rows[0];
}


module.exports = {
    getAllUsers,
    getTenUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};