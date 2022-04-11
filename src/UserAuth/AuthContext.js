import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
 // const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function changePassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  function changeEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return unsubsribe;
  }, []);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   }
  // });

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    changePassword,
    changeEmail,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
