const pool = require('../config/db');

async function getAllItems() {
    const result = await pool.query('SELECT I.*, U.user_id, U.username  FROM Items I INNER JOIN Users U ON I.user_id = U.user_id;');
    return result.rows;
}

async function getTenItems() {
  const result = await pool.query('SELECT * FROM Items LIMIT 10;');
  return result.rows;
}

async function getItemById(itemId) {
  console.log("Fetching item with ID:", itemId);
  const result = await pool.query('SELECT * FROM Items WHERE item_id = $1;', [itemId]);
  return result.rows[0];
}

async function getItemsByUserId(userId) {
  console.log("Fetching items for user ID:", userId);
  const result = await pool.query('SELECT * FROM Items WHERE user_id = $1;', [userId]);
  return result.rows;
}

async function addItem(item) {
  const { user_id, name, description, price, category, image_url } = item;
  const result = await pool.query(
    
    'INSERT INTO Items (user_id, name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
    [user_id, name, description, price, category, image_url]
  );
  return result.rows[0];
}

async function updateItem(itemId, item) {
  const { user_id, name, description, price, category, image_url } = item;
  const result = await pool.query('SELECT * FROM Items WHERE id = $1;', [itemId]);
  if (result.rows.length === 0) {
    throw new Error('Item not found');
  }
  const updatedItem = {
    user_id: user_id || result.rows[0].user_id,
    name: name || result.rows[0].name,
    description: description || result.rows[0].description,
    price: price || result.rows[0].price,
    category: category || result.rows[0].category,
    image_url: image_url || result.rows[0].image_url
  };
  const updateResult = await pool.query(
    'UPDATE Items SET user_id = $1, name = $2, description = $3, price = $4, category = $5, image_url = $6 WHERE id = $7 RETURNING *;',
    [updatedItem.user_id, updatedItem.name, updatedItem.description, updatedItem.price, updatedItem.category, updatedItem.image_url, itemId]
  );
  return updateResult.rows[0];
}

async function deleteItem(itemId) {
    const result = await pool.query('DELETE FROM Items WHERE id = $1 RETURNING *;', [itemId]);
    return result.rows[0];
}

async function requestTrade(requesterID, receiverID, requesterItems, receiverItems) {
    const result = await pool.query(
        'INSERT INTO trade_requests (requester_id, receiver_id, status) VALUES ($1, $2, $3) RETURNING *;',
        [requesterID, receiverID, 'pending']
    );
    const tradeRequest = result.rows[0];
    const requestID = tradeRequest.request_id;
    for (const itemId of requesterItems) {
        await pool.query(
            'INSERT INTO trade_items (request_id, item_id, owner_role) VALUES ($1, $2, $3);',
            [requestID, itemId, 'requester']
        );
    }
    for (const itemId of receiverItems) {
        await pool.query(
            'INSERT INTO trade_items (request_id, item_id, owner_role) VALUES ($1, $2, $3);',
            [requestID, itemId, 'receiver']
        );
    }
    return tradeRequest;
}

module.exports = {
    getAllItems,
    getTenItems,
    getItemById,
    getItemsByUserId,
    addItem,
    updateItem,
    deleteItem,
    requestTrade
};