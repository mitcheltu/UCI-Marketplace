import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB7GM94QoQbA_hJE_aYQ3XCyjv3IwlSr0M",
  authDomain: "uci-barter.firebaseapp.com",
  projectId: "uci-barter",
  storageBucket: "uci-barter.firebasestorage.app",
  messagingSenderId: "476351087450",
  appId: "1:476351087450:web:6553cf49fc027aa0d3a963",
  measurementId: "G-3LZQ690KN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export { googleProvider };