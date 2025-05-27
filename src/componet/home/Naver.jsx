import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

export const Naver = () => {
   const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'All Rooms', path: '/rooms' },
      { name: 'Contact', path: '/add' },
      { name: 'AbdRoome', path: '/addroome' },
   ];

   const [isScrolled, setIsScrolled] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate();
   const location = useLocation();

   const { openSignIn } = useClerk();
   const { user } = useUser();

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

   return (
      <nav className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-500
      flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32
      ${isScrolled ? "bg-red-500 shadow-md text-black py-3 md:py-4" : "bg-transparent bg-amber-700 text-black py-4 md:py-6"}
    `}>
         {/* Logo */}
         <a href="/" className="flex items-center gap-2">
            <img
               src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
               alt="logo"
               className="h-9"
            />
         </a>

         {/* Nav Links */}
         <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link, i) => (
               <a key={i} href={link.path} className="group flex flex-col gap-0.5">
                  {link.name}
                  <div className="h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-white" />
               </a>
            ))}
            <button className="border px-4 py-1 text-sm font-light rounded-full">
               New Launch
            </button>
         </div>

         {/* User Auth / Login */}
         <div className="hidden md:flex items-center gap-4">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
               <circle cx="11" cy="11" r="8" />
               <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {user ? (
               <div className="flex items-center gap-2">
                  <UserButton afterSignOutUrl="/" />
                  <button onClick={() => navigate("/my-booking")} className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm">
                     <BiLogInCircle /> My Bookings
                  </button>
               </div>
            ) : (
               <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full ml-4">
                  Login
               </button>
            )}
         </div>

         {/* Mobile Menu Toggle */}
         <div className="flex items-center gap-3 md:hidden">
            <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-6 w-6 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
               <line x1="4" y1="6" x2="20" y2="6" />
               <line x1="4" y1="12" x2="20" y2="12" />
               <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
         </div>

         {/* Mobile Menu */}
         <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
               <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
               </svg>
            </button>

            {navLinks.map((link, i) => (
               <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
               </a>
            ))}

            <button className="border px-4 py-1 text-sm font-light rounded-full">
               New Launch
            </button>

            {user ? (
               <button onClick={() => navigate("/my-booking")} className="bg-black text-white px-8 py-2.5 rounded-full">
                  My Booking
               </button>
            ) : (
               <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full">
                  Login
               </button>
            )}
         </div>
      </nav>
   );
};
