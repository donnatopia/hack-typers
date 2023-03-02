import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const addUsername = (user, username) => {
    return updateProfile(user, {
      displayName: username
    })
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    signup,
    addUsername,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  )
}