const { v4: uuidv4 } = require("uuid");
const s3 = require("../config/s3.js");
const itemModel = require('../models/itemModel');

// Fetch all items from the graph
exports.fetchAllItems = async () => {
  return await itemModel.getAllItems();
};

exports.fetchTenItems = async () => {
  return await itemModel.getTenItems();
}

// Fetch items by user ID
exports.fetchItemsByUserId = async (userId) => {
  return await itemModel.getItemsByUserId(userId);
};

// Create a new item node
exports.createItemService = async (file, { user_id, name, description, price, category}) => {
  if (!file) {
    throw new Error("Image file is required");
  }

  // Upload to S3
  const fileKey = `${uuidv4()}-${file.originalname}`;
  const uploadResult = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();

  const image_url = uploadResult.Location;
    console.log("Saving item with image_url:", image_url);
  // Save to DB
  const item = await itemModel.addItem({
    user_id,  // convert to int
    name,
    description,
    price: parseFloat(price) || null,
    category,
    image_url,
  });

  return item;
};


// Delete an item node by ID
exports.removeItem = async (itemId) => {
  return await itemModel.deleteItem(itemId);
}

// Update item details
exports.modifyItem = async (itemId, itemData) => {
  return await itemModel.updateItem(itemId, itemData);
};


// Get item by ID
exports.fetchItemById = async (itemId) => {
  return await itemModel.getItemById(itemId);
}