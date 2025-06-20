import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

function MyPost() {
   const [mypost, setMypost] = useState([]);
   const { user } = useContext(AuthContext);
   const accessToken = user?.accessToken;

   const email = user?.email;
   const apiUrl = import.meta.env.VITE_API_URL;
   useEffect(() => {
      if (!email || !accessToken) return;

      axios
         .get(`${apiUrl}jobsUser/email`, {
            params: { email },
            headers: {
               authorization: `Bearer ${accessToken}`
            }
         })
         .then((res) => {
            setMypost(res.data);
         })
         .catch((err) => {
            console.error("Error fetching jobs:", err);
         });
   }, [apiUrl, email, accessToken]);
   

   return (
      <div className="max-w-6xl h-screen mx-auto p-4 mt-20">
         <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>
         <table className="w-full border-collapse border border-gray-300">
            <thead>
               <tr>
                  <th className="border border-gray-300 p-2">Title</th>
                  <th className="border border-gray-300 p-2">Company</th>
                  <th className="border border-gray-300 p-2">Job Type</th>
                  <th className="border border-gray-300 p-2">Location</th>
                  <th className="border border-gray-300 p-2">Salary Range</th>
                  <th className="border border-gray-300 p-2">Actions</th>
               </tr>
            </thead>
            <tbody>
               {mypost.length === 0 && (
                  <tr>
                     <td colSpan="6" className="text-center p-4">No jobs found.</td>
                  </tr>
               )}
               {mypost?.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-100">
                     <td className="border border-gray-300 p-2">{job.title}</td>
                     <td className="border border-gray-300 p-2">{job.company}</td>
                     <td className="border border-gray-300 p-2">{job.jobType}</td>
                     <td className="border border-gray-300 p-2">{job.location}</td>
                     <td className="border border-gray-300 p-2">
                        {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency?.toUpperCase()}
                     </td>
                     <td className="border border-gray-300 p-2">
                        <button
                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        // Delete ফাংশন পরে যোগ করতে পারো
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default MyPost;
