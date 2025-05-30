import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

function AllJobsCard({ job }) {
   const { title, company, company_logo, jobType, salaryRange, location,  requirements } = job;

   const salaryText = `${salaryRange?.min} - ${salaryRange?.max} ${salaryRange?.currency?.toUpperCase()}`;

   return (
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md space-y-3.5 relative transition-all mt-10">
         <div className="flex justify-between items-center mb-5">
            <img className="w-14 h-14 rounded-full object-cover" src={company_logo} alt={company} />

            <button className="text-white bg-green-700 rounded-full w-10 h-10 flex items-center justify-center">
               <FaRegBookmark />
            </button>
         </div>

         <div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-600">
               {jobType}
            </span>
         </div>

         <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>
         <div className="flex flex-wrap gap-2">
            {(Array.isArray(requirements)
               ? requirements
               : typeof requirements === "string"
                  ? requirements.split(",").map(item => item.trim())
                  : []
            ).map((req, index) => (
               <button key={index} className="px-3 py-1 bg-gray-100 rounded text-sm">
                  {req}
               </button>
            ))}
         </div>


         <p className="text-sm text-gray-500">{company}</p>
         <p className="text-sm text-gray-500 mt-1">{salaryText}</p>

         <div className="flex justify-between items-center mb-5">
            <p className="text-sm text-gray-500">{location}</p>

            <Link 
               to={`/job/${job._id}`}
         
            
               className="block w-fit mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
               APPLY
            </Link>
         </div>
      </div>
   );
}

export default AllJobsCard;
