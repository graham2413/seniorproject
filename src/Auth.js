import React, { useEffect, useState } from "react";
import firebase from "./config";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(firebase.auth().currentUser);

     
    });
  }, []);
  // console.log(currentUser);


  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};