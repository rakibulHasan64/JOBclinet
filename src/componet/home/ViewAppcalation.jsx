import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function ViewAppcalation() {
   const loadedApplications = useLoaderData();
   const [applications, setApplications] = useState(loadedApplications);

   const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/?$/, "/");

   const handleStatusChange = async (e, application) => {
      const newStatus = e.target.value;
      const applicationId = application._id;

      try {
         await axios.patch(`${apiUrl}aplaction/${applicationId}`, {
            status: newStatus,
         });

         // ✅ Local state update
         const updatedApps = applications.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
         );
         setApplications(updatedApps);
      } catch (error) {
         console.error("Failed to update status:", error);
      }
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
                        <td className="border px-4 py-2">
                           <select
                              value={app.status || "Pending"}
                              onChange={(e) => handleStatusChange(e, app)}
                              className="border rounded px-2 py-1"
                           >
                              <option value="Pending">Pending</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Interview">Interview</option>
                              <option value="Call Me">Under Review</option>
                           </select>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default ViewAppcalation;
