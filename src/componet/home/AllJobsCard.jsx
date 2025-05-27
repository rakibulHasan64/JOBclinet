import { FaRegBookmark } from "react-icons/fa";


function AllJobsCard({ job }) {
   return (
      <>
         <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md space-y-3.5 relative transition-all  mt-10 ">
            <div className="flex justify-between items-center mb-5">

               <img className="w-14 h-14 rounded-full" src={job.
                  logo} alt="df" />
            
               <button className="text-white bg-green-700 rounded-full w-10 h-10 flex items-center justify-center">
                  <FaRegBookmark />
               </button>
            </div>

            <div>
               <span
                  className={`text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-600`}
               >
                  {job.type}
               </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-4">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
            <p className="text-sm text-gray-500 mt-1">{job.salary}</p>
            <div className="flex justify-between items-center mb-5">
               <p className="text-sm text-gray-500">{job.location}</p>

               <a
                  href={job.website}

                  rel="noopener noreferrer"
                  className="block w-fit mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
               >
                  APPLY
               </a>
            </div>
         </div>

      </>
   );
}

export default AllJobsCard;