import React, { useState } from "react";
import { Link } from "react-router-dom";

function AppLection({ myApplacation }) {
   const [applications, setApplications] = useState(myApplacation || []);

   // ডিলিট হ্যান্ডলার: এখানে তোমার API কল করতে পারো ডিলিটের জন্য
   const handleDelete = (id) => {
      // এখন শুধু লোকালি ডিলিট দেখাচ্ছে
      const filtered = applications.filter(app => app._id !== id);
      setApplications(filtered);

      // TODO: API কল দিয়ে ডিলিট করো, যেমন:
      // fetch(`${apiUrl}applications/${id}`, { method: 'DELETE' })
      //   .then(res => res.json())
      //   .then(() => {
      //      setApplications(filtered);
      //   })
      //   .catch(console.error);
   };

   return (
      <div className="max-w-5xl mx-auto mt-10 p-4 h-screen flex flex-col justify-center items-center">
         <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
         <table className="w-full border-collapse border border-gray-300">
            <thead>
               <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Job ID</th>
                  <th className="border border-gray-300 p-2">Applied At</th>
                  <th className="border border-gray-300 p-2">Message</th>
                  <th className="border border-gray-300 p-2">Resume</th>
                  <th className="border border-gray-300 p-2">Actions</th>
               </tr>
            </thead>
            <tbody>
               {applications.length === 0 && (
                  <tr>
                     <td colSpan="7" className="text-center p-4">
                        No applications found.
                     </td>
                  </tr>
               )}
               {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-100">
                     <td className="border border-gray-300 p-2">{app.name}</td>
                     <td className="border border-gray-300 p-2">{app.email}</td>
                     <td className="border border-gray-300 p-2">{app.jobId}</td>
                     <td className="border border-gray-300 p-2">
                        {new Date(app.appliedAt).toLocaleDateString()}
                     </td>
                     <td className="border border-gray-300 p-2">{app.message}</td>
                     <td className="border border-gray-300 p-2">
                        <a
                           href={app.resumeLink}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-600 underline"
                        >
                           View Resume
                        </a>
                     </td>
                     <td className="border border-gray-300 p-2">
                        <button
                           onClick={() => handleDelete(app._id)}
                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                           Delete
                        </button>
                     </td>

                     <td className="border border-gray-300 p-2">
                        <Link to={`/detlis/${app._id}`}>
                           <button

                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                           >
                              Detelis
                           </button>
                        </Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default AppLection;
