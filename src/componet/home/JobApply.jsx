
import axios from "axios";
import { useContext, useState } from "react";
import {  Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

function JobApply() {
   const { user } = useContext(AuthContext)
   const { id: jobId } = useParams();

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");


   const handleSubmit =async  (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      if (!data.name || !data.email || !data.resumeLink) {
         setError("সব * চিহ্নিত ফিল্ড পূরণ করুন");
         setSuccess("");
         return;
      }

      data.jobId = jobId;
      data.appliedAt = new Date().toISOString();

      const apiUrl = import.meta.env.VITE_API_URL;

      try {
         await axios.post(`${apiUrl}jobapply`, data);
         toast.success("✅ Job posted successfully!");
         e.target.reset();
      } catch (error) {
         console.error("Job post error:", error);
         toast.error("❌ Failed to post job!");
      }
   };
   

   

   return (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 py-24">
         <h2 className="text-2xl font-bold mb-6 text-center">Apply for this Job</h2>

         {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}
         {success && <p className="mb-4 text-green-600 font-medium">{success}</p>}

         <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label htmlFor="name" className="block mb-1 font-semibold">
                  Full Name <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  readOnly
                  defaultValue={user.displayName}
                  id="name"
                  name="name"
                  placeholder="আপনার নাম লিখুন"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
               />
            </div>

            <div>
               <label htmlFor="email" className="block mb-1 font-semibold">
                  Email <span className="text-red-500">*</span>
               </label>
               <input
                  readOnly
                  defaultValue={user?.email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
               />
            </div>

            <div>
               <label htmlFor="resumeLink" className="block mb-1 font-semibold">
                  Resume Link (GitHub, LinkedIn, etc.) <span className="text-red-500">*</span>
               </label>
               <input
                  type="url"
                  id="resumeLink"
                  name="resumeLink"
                  placeholder="আপনার রিজিউম লিঙ্ক দিন"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
               />
            </div>

            <div>
               <label htmlFor="message" className="block mb-1 font-semibold">
                  Message (Optional)
               </label>
               <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="যদি কোন অতিরিক্ত তথ্য দিতে চান"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
               ></textarea>
            </div>

            <button
               type="submit"
               className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
               Apply Now
            </button>

            <Link to={"/apllacition"}>
               <span
                  
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
               >
                  my apply
               </span>
               
            </Link>
         </form>
      </div>
   );
}

export default JobApply;
 