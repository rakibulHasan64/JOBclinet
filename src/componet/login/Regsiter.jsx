
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { BiSolidShow } from 'react-icons/bi';
import { toast } from 'react-toastify';


function Regsiter() {

   const [accepted, setAccepted] = useState(false);
   const [show, setShow] = useState(false);
   const navget = useNavigate();

   const { createUser, updatedUser, setUser } = useContext(AuthContext)

   const handleSubmit = (e) => {
      e.preventDefault();

      const formElements = e.target.elements;
      const name = formElements.name.value;
      const photoURL = formElements.photoURL.value;
      const email = formElements.email.value;
      const password = formElements.password.value;

      const hasCapital = /[A-Z]/.test(password);
      const hasSmall = /[a-z]/.test(password);
      const isLongEnough = password.length > 6;

      if (!hasCapital || !hasSmall || !isLongEnough) {
         toast.error("Password must be over 6 characters and include both capital and small letters.");
         return;
      }

      createUser(email, password)
         .then(result => {
            const user = result.user;

            updatedUser({ displayName: name, photoURL })
               .then(() => {
                  setUser({ ...user, displayName: name, photoURL });
                  toast.success("Registration successful!");
                  navget("/");
                  e.target.reset();
               })
               .catch((error) => {
                  console.error("Profile update failed:", error);
                  setUser(user);
               });

         })
         .catch((error) => {
            toast.error(error.message);
         });
   };
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Register your account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
               <div>
                  <label className="block font-medium mb-1">Your Name</label>
                  <input
                     type="text"
                     name="name"
                     placeholder="Enter your name"
                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
               </div>
               <div>
                  <label className="block font-medium mb-1">Photo URL</label>
                  <input
                     type="text"
                     name="photoURL"
                     placeholder="Enter your photo URL"
                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
               </div>
               <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                     type="email"
                     name="email"
                     placeholder="Enter your email address"
                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
               </div>
               <div className="relative">
                  <label className="block font-medium mb-1">Password</label>
                  <input
                     type={show ? "text" : "password"}
                     name="password"
                     placeholder="Enter your password"
                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-10 text-2xl">
                     <BiSolidShow />
                  </button>
               </div>
               <div className="flex items-center">
                  <input
                     type="checkbox"
                     checked={accepted}
                     onChange={() => setAccepted(!accepted)}
                     className="mr-2"
                  />
                  <label className="text-sm flex items-center gap-1 justify-center">
                     Accept <span className="font-semibold">Terms & Conditions</span>

                     <p className='text-[10px] font-bold'> <Link className='text-red-500' to={"/login"}>Login</Link></p>
                  </label>
               </div>
               <button
                  type="submit"
                  disabled={!accepted}
                  className={`w-full py-2 text-white rounded-lg transition ${accepted ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
               >
                  Register
               </button>
            </form>
         </div>
      </div>
   );
}

export default Regsiter;