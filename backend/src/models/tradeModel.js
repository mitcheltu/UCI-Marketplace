const pool = require('../config/db');


async function requestTrade(requesterID, receiverID, requesterItemsIds, receiverItemsIds) {
    console.log("In requestTrade with:", requesterID, receiverID, requesterItemsIds, receiverItemsIds);
    if (requesterID == receiverID) {
        throw new Error('Requester and receiver cannot be the same user');
    }

    const result = await pool.query(
        'INSERT INTO trade_requests (requester_id, receiver_id, status) VALUES ($1, $2, $3) RETURNING *;',
        [requesterID, receiverID, 'pending']
    );
    const tradeRequest = result.rows[0];
    const requestID = tradeRequest.request_id;
    for (const itemId of requesterItemsIds) {
        await pool.query(
            'INSERT INTO trade_items (request_id, item_id, owner_role) VALUES ($1, $2, $3);',
            [requestID, itemId, 'requester']
        );
    }
    for (const itemId of receiverItemsIds) {
        await pool.query(
            'INSERT INTO trade_items (request_id, item_id, owner_role) VALUES ($1, $2, $3);',
            [requestID, itemId, 'receiver']
        );
    }
    return tradeRequest;
}

async function fetchTradesByUserId(userId) {
    const result = await pool.query(
        `SELECT tr.*,
                json_agg(
                    json_build_object(
                        'item_id', ti.item_id,
                        'owner_role', ti.owner_role
                    )
                ) AS items
         FROM trade_requests tr
         LEFT JOIN trade_items ti ON tr.request_id = ti.request_id
            WHERE tr.requester_id = $1 OR tr.receiver_id = $1
            GROUP BY tr.request_id;`,
        [requesterId]
    );
    console.log(result.rows);
    return result.rows;
}

module.exports = {
    requestTrade,
    fetchTradesByUserId
};