import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import AllJobsCard from "./AllJobsCard";
import AllJobBanner from "../abut/AllJobBanner";

function AllJobLayout() {
   const [search, setSearch] = useState("");
   const [job, setJob] = useState([]);
   const [itemPerPage, setItemPerPage] = useState(5); 
   const [currentPage, setCurrentPage] = useState(0); 

   const { result } = useLoaderData(); 
   const numberOfPage = Math.ceil(result / itemPerPage);
   const pages = [...Array(numberOfPage).keys()]; 

   useEffect(() => {
      const apiUrl = import.meta.env.VITE_API_URL;

      axios
         .get(`${apiUrl}jobs`, {
            params: {
               search: search,
               limit: itemPerPage,
               page: currentPage
            }
         })
         .then((res) => {
            setJob(res.data);
         })
         .catch((err) => {
            console.error("Error fetching jobs:", err);
         });
   }, [search, itemPerPage, currentPage]);
   

   const handlePerPage = (e) => {
      const val = parseInt(e.target.value);
      setItemPerPage(val);
      setCurrentPage(0); 
   };

   const handPeev = () => {
      if (currentPage > 0) {
         setCurrentPage(currentPage - 1)
      }
   }

   const handleNext = () => {
      if (currentPage < pages.length) {
         setCurrentPage(currentPage + 1)
      }
   }

   return (
      <>
         <AllJobBanner search={search} setSearch={setSearch} />

         <div className="bg-green-50 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto mt-14">
               <div className="flex items-center justify-between mb-6">
                  <button className="flex items-center gap-1 text-sm px-4 py-2 border rounded-md hover:bg-gray-100 bg-white text-gray-700">
                     <FaFilter /> Filter
                  </button>
                  <p className="text-gray-600 text-sm">
                     All <span className="font-semibold">{result}</span> jobs found
                  </p>
                  <div className="flex items-center gap-2 text-sm">
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

               {/* Jobs Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {job.map((jobItem) => (
                     <AllJobsCard key={jobItem._id} job={jobItem} />
                  ))}
               </div>

               

               {/* Pagination Controls */}
               <div className="text-center py-6">
                  <div className="">
                     <button onClick={handPeev} className="px-4 py-2 m-1 rounded bg-green-500">prev</button>
                  </div>
                  {pages.map((pag, index) => (
                     <button
                        key={index}
                        onClick={() => setCurrentPage(pag)}
                        className={`px-4 py-2 m-1 rounded 
                           ${pag === currentPage ? "bg-green-500" : "bg-blue-500"} 
                           text-white hover:bg-blue-600`}
                     >
                        {pag + 1}
                     </button>
                  ))}

                  

                  {/* Per Page Select */}
                  <div className="mt-4">
                     <label className="mr-2 font-semibold">Items per page:</label>
                     <select
                        value={itemPerPage}
                        onChange={handlePerPage}
                        className="border px-3 py-2 rounded"
                     >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                     </select>
                  </div>

                  <div className="">

                     <button onClick={handleNext} className="px-4 py-2 m-1 rounded bg-green-500">Next</button>
                  </div>

               </div>
            </div>
         </div>
      </>
   );
}

export default AllJobLayout;
