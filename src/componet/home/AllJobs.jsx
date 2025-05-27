
import { useEffect, useState } from "react";
import AllJobsCard from "./AllJobsCard";
import axios from "axios";
import { ImTab } from "react-icons/im";
import { FaFilter } from "react-icons/fa";



function AllJobs() {

   const [job, setJob] = useState([]);

   useEffect(() => {
      const apiUrl = import.meta.env.VITE_API_URL;

      axios.get(`${apiUrl}jobs`)
         .then(res => {
            setJob(res.data);
         })
         .catch(err => {
            console.error("Error fetching jobs:", err);
         });
   }, []);
   return (
      <>
         
         <div className="bg-green-50 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto mt-14">
               <div className="flex items-center justify-between mb-6">

                  <button className="flex items-center gap-1 text-sm px-4 py-2 border rounded-md hover:bg-gray-100 bg-white text-gray-700">
                     <FaFilter /> Filter
                  </button>
                  <p className="text-gray-600 text-sm">
                     All <span className="font-semibold">{job.length}</span> jobs found
                  </p>
                  <div className="flex items-center gap-2 text-sm ">
                     <span>Short:</span>
                     <select className="border rounded-md px-2 py-1 bg-white text-gray-700">
                        <option>Price Short</option>
                        <option>Newest</option>
                     </select>
                     <button className="text-gray-500 hover:text-black">
                        <i className="fa-solid fa-bars"></i>
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {job.map((job) => (
                     <AllJobsCard key={job.id} job={job} />
                  ))}
               </div>
            </div>
         </div>
         

         
      </>
   );
}

export default AllJobs;