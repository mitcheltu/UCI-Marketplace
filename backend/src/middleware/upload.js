const multer = require("multer");

// store file in memory buffer before uploading to S3
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;