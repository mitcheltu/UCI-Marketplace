const tradeModel = require('../models/tradeModel');

// Request item trade between users
exports.requestItemTrade = async (requesterID, receiverID, requesterItemsIds, receiverItemsIds) => {
  console.log("In tradeService with:", requesterID, receiverID, requesterItemsIds, receiverItemsIds);
  return await tradeModel.requestTrade(requesterID, receiverID, requesterItemsIds, receiverItemsIds);
}

// Fetch trades by user ID
exports.fetchTradesByUserId = async (userId) => {
    return await tradeModel.getTradesByUserId(userId);
}