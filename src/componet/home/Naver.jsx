import { useContext, useEffect, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

export const Naver = () => {
   const { user, logOut } = useContext(AuthContext);  // logout এখানে নিয়ে আসো
   const navLinks = [
      { name: "Home", path: "/" },
      { name: "AllJob", path: "/alljob" },
      ...(user
         ? [
            { name: "Post Job", path: "/PostJob" },
            { name: "My Applaction", path: "/apllacition" },
            { name: "My Post", path: "/Addjob" },
         ]
         : []),
   ];

   const [isScrolled, setIsScrolled] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (location.pathname !== "/") {
         setIsScrolled(true);
      } else {
         setIsScrolled(false);
      }

      const handleScroll = () => {
         setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [location.pathname]);

   const handleLogout = async () => {
      try {
         await logOut(); // logout ফাংশন কল করো
         navigate("/login");
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   return (
      <nav
         className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-500
      flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32
      ${isScrolled
               ? "bg-red-100 shadow-md text-black py-3 md:py-4"
               : "bg-transparent bg-amber-700 text-black py-4 md:py-6"
            }
    `}
      >
         {/* Logo */}
         <a href="/" className="flex items-center gap-2">
            <img
               src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
               alt="logo"
               className="h-9"
            />
         </a>

         {/* Desktop Nav Links */}
         <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link, i) => (
               <a
                  key={i}
                  href={link.path}
                  className="group flex flex-col gap-0.5 hover:text-red-600 transition"
               >
                  {link.name}
                  <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-red-600" />
               </a>
            ))}

            {/* Login or Logout Button (Desktop) */}
            {!user ? (
               <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-1 px-4 py-1 border rounded-full text-sm hover:bg-red-600 hover:text-white transition"
               >
                  <BiLogInCircle className="text-lg" />
                  Login
               </button>
            ) : (
               <div className="flex items-center gap-2">
                  {/* User Photo */}
                  <img
                     src={user.photoURL || "https://i.ibb.co/S32HNjD/no-image.jpg"}
                     alt={user.displayName || "User"}
                     className="w-9 h-9 rounded-full border-2 border-white object-cover"
                     title={user.displayName || "User"}
                  />
                  {/* Logout Button */}
                  <button
                     onClick={handleLogout}
                     className="px-4 py-1 border rounded-full text-sm hover:bg-red-600 hover:text-white transition"
                  >
                     Logout
                  </button>
               </div>
            )}


            <button className="border px-4 py-1 text-sm font-light rounded-full hover:bg-red-600 hover:text-white transition">
               New Launch
            </button>
         </div>

         {/* Search Icon and User Section (Desktop) */}
         <div className="hidden md:flex items-center gap-4">
            <svg
               className="h-6 w-6 cursor-pointer hover:text-red-600 transition"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               viewBox="0 0 24 24"
            >
               <circle cx="11" cy="11" r="8" />
               <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
         </div>

         {/* Mobile Hamburger */}
         <div className="flex items-center gap-3 md:hidden">
            <svg
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="h-6 w-6 cursor-pointer"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               viewBox="0 0 24 24"
            >
               <line x1="4" y1="6" x2="20" y2="6" />
               <line x1="4" y1="12" x2="20" y2="12" />
               <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
         </div>

         {/* Mobile Menu */}
         <div
            className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
               }`}
         >
            <button
               className="absolute top-4 right-4"
               onClick={() => setIsMenuOpen(false)}
               aria-label="Close Menu"
            >
               <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
               >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
               </svg>
            </button>

            {navLinks.map((link, i) => (
               <a
                  key={i}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-red-600 transition"
               >
                  {link.name}
               </a>
            ))}

            {/* Mobile Login/Logout Section */}
            {!user ? (
               <button
                  onClick={() => {
                     setIsMenuOpen(false);
                     navigate("/login");
                  }}
                  className="border px-4 py-1 text-sm font-light rounded-full flex items-center gap-1 hover:bg-red-600 hover:text-white transition"
               >
                  <BiLogInCircle className="inline mb-1" />
                  Login
               </button>
            ) : (
               <button
                  onClick={() => {
                     setIsMenuOpen(false);
                     handleLogout();
                  }}
                  className="border px-4 py-1 text-sm font-light rounded-full hover:bg-red-600 hover:text-white transition"
               >
                  Logout
               </button>
            )}

            <button className="border px-4 py-1 text-sm font-light rounded-full hover:bg-red-600 hover:text-white transition">
               New Launch
            </button>
         </div>
      </nav>
   );
};
