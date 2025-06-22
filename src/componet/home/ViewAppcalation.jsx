import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function ViewAppcalation() {
   const loadedApplications = useLoaderData();
   const [applications, setApplications] = useState(loadedApplications);

   const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/?$/, "/");

   

   const handleStatusUpdate = (e, id) => {
      console.log(e.target.value, id);
      const data = {
         status: e.target.value
      };

      fetch(`${apiUrl}aplaction/${id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      })
         .then(res => {
            if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
         })
         .then(data => {
            if (data.modifiedCount) {
               toast.success("✅ Status updated successfully!");
            } else {
               toast.info("ℹ️ Status not updated. Maybe already same?");
            }
         })
         .catch(err => {
            console.error("Update failed:", err);
            toast.error("❌ Something went wrong while updating status.");
         });
   };

   

   return (
      <div className="py-14 container mx-auto mt-32">
         <h2 className="text-2xl font-bold mb-6">Total Applications: {applications.length}</h2>

         <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
               <thead className="bg-gray-200">
                  <tr>
                     <th className="px-4 py-2 border">#</th>
                     <th className="px-4 py-2 border text-left">Name</th>
                     <th className="px-4 py-2 border text-left">Email</th>
                     <th className="px-4 py-2 border text-left">Resume</th>
                     <th className="px-4 py-2 border text-left">Message</th>
                     <th className="px-4 py-2 border text-left">Applied At</th>
                     <th className="px-4 py-2 border text-left">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {applications?.map((app, idx) => (
                     <tr key={app._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">{idx + 1}</td>
                        <td className="border px-4 py-2">{app.name}</td>
                        <td className="border px-4 py-2">{app.email}</td>
                        <td className="border px-4 py-2">
                           <a href={app.resumeLink} target="_blank" className="text-blue-600 underline">
                              View Resume
                           </a>
                        </td>
                        <td className="border px-4 py-2">{app.message}</td>
                        <td className="border px-4 py-2">
                           {new Date(app.appliedAt).toLocaleString()}
                        </td>
                        <select
                           onChange={(e) => handleStatusUpdate(e, app._id)}
                           defaultValue={app.status || ''}
                           className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
                        >
                           <option disabled value="">Change Status</option>
                           <option value="Under Review">Panddinge</option>
                           <option value="Set Interview">Set Interview</option>
                           <option value="Hired">Hired</option>
                           <option value="Rejected">Rejected</option>
                        </select>

                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default ViewAppcalation;
