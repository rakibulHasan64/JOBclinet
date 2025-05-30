

// src/pages/Login/Login.jsx
import React, { useContext, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiSolidShow } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../provider/AuthProvider';

function Login() {
   const [show, setShow] = useState(false);
   const { siginIn, googleLogin } = useContext(AuthContext);
   const location = useLocation();
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      siginIn(email, password)
         .then(result => {
            console.log("Login Success", result.user);
            form.reset();
            navigate(location.state || "/");
         })
         .catch(error => {
            alert(error.message);
         });
   };

   const handleGoogleLogin = () => {
      googleLogin()
         .then(result => {
            console.log("Google login success", result.user);
            navigate(location.state || "/");
         })
         .catch(error => {
            alert(error.message);
         });
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Login to your account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                     type="email"
                     name='email'
                     placeholder="Enter your email address"
                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                     required
                  />
               </div>

               <div className="relative">
                  <label className="block font-medium mb-1">Password</label>
                  <input
                     type={show ? "text" : "password"}
                     name="password"
                     placeholder="Enter your password"
                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                     required
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-10 text-2xl">
                     <BiSolidShow />
                  </button>
               </div>

               <p className='text-[10px] font-bold'>
                  Don’t Have An Account?
                  <Link className='text-red-500 ml-1' to="/register"> Register</Link>
               </p>

               <button
                  type="submit"
                  className='btn w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded'
               >
                  Login
               </button>
            </form>

            <div className="flex items-center my-4">
               <hr className="flex-grow border-gray-300" />
               <span className="mx-2 text-gray-500 text-sm">or</span>
               <hr className="flex-grow border-gray-300" />
            </div>

            <button
               onClick={handleGoogleLogin}
               className="flex items-center justify-center gap-3 w-full border border-gray-400 py-2 rounded hover:bg-gray-100 transition"
            >
               <FcGoogle className="text-xl" />
               <span>Continue with Google</span>
            </button>
         </div>
      </div>
   );
}

export default Login;
