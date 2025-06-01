import { useLoaderData, useParams } from "react-router-dom";

function ViewAppcalation() {

   const { id } = useParams();
   console.log(id);
   
   const data = useLoaderData(); 
   console.log(data);
   

   return (
      <div className="py-14 container mx-auto mt-32">
         <h2 className="text-2xl font-bold mb-6">Total Applications: {data.length}</h2>

         <div className="space-y-4">
            {data?.map((app) => (
               <div key={app._id} className="border p-4 rounded shadow">
                  <p><strong>Name:</strong> {app.name}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Resume:</strong> <a href={app.resumeLink} target="_blank" className="text-blue-600 underline">View</a></p>
                  <p><strong>Message:</strong> {app.message}</p>
                  <p><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
               </div>
            ))}
         </div>
      </div>
   );
}

export default ViewAppcalation;
