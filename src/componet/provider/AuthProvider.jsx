
import { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firevase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL;


export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   // const [group, setGroup] = useState([]);

   // Signup
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   // Sign in
   const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   // Google Login
   const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };

   // Update User
   const updateUser = (updatedData) => {
      return updateProfile(auth.currentUser, updatedData);
   };

   // Log out
   const logOut = () => {
      setLoading(true);
      return signOut(auth).then(() => {
         setUser(null);
         setLoading(false);
      });
   };


   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);

         // if (currentUser?.email) {
         //    const userData = { email: currentUser.email };

         //    axios.post(`${apiUrl}jwt`, userData, {
         //       withCredentials: true,
         //    })
         //       .then(res => {
         //          console.log("token is", res.data); // শুধু দেখানো হচ্ছে
         //       })
         //       .catch(err => console.log(err));
         // }
      });

      return () => unsubscribe();
   }, []);
    



   
   


   // useEffect(() => {
   //    setLoading(true); 
   //    axios
   //       .get(https://serversite-three.vercel.app//groups")
   //       .then((res) => {
   //          setGroup(res.data);
   //       })
   //       .catch((err) => {
   //          console.error("❌ Error fetching groups:", err);
   //       })
   //       .finally(() => {
   //          setLoading(false); 
   //       });
   // }, []);

   const userInfo = {
      user,
      loading,
      createUser,
      signIn,
      googleLogin,
      updateUser,
      logOut,

      setLoading,
   };

   return (
      <AuthContext.Provider value={userInfo}>
         {children}
      </AuthContext.Provider>
   );
}

export default AuthProvider;
