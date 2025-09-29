const admin = require("firebase-admin");
const dotenv = require("dotenv");
const serviceAccount = require("./serviceAccountKey.json");

dotenv.config();

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * Middleware to verify Firebase token & restrict to @uci.edu emails
 */
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    // Restrict to UCI email domain
    if (!decoded.email || !decoded.email.endsWith("@uci.edu")) {
      return res.status(403).json({ error: "Only UCI emails allowed" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { authenticate };