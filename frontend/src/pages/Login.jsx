import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { createUser } from "../api/userService";

function Login() {
  const handleGoogleLogin = async () => {
    try {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Only allow @uci.edu emails
  if (!user.email.endsWith("@uci.edu")) {
    alert("Please use your @uci.edu email to log in.");
    await auth.signOut();
    return; // exit early, do NOT call createUser
  }

  console.log("Logged in user:", user);

  // Proceed with creating the user in your backend

  const createdUser = await createUser({
    firebase_uid: user.uid,
    username: user.displayName || user.email.split("@")[0],
    email: user.email,
  });
  sessionStorage.setItem('userId', createdUser.user_id);
  console.log("User created or fetched from backend:", createdUser);
} catch (error) {
  console.error("Google sign-in error:", error);
}
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;