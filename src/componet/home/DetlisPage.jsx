import { Link, useLoaderData } from "react-router-dom";

function DetlisPage() {
   const data = useLoaderData();

   const {
      _id,
      title,
      description,
      company,
      company_logo,
      employer,
      hr_name,
      hr_email,
      applicants_count,
      applicationDeadline,
      category,
      jobType,
      location,
      postedAt,
      requirements,
      responsibilities,
      salaryRange,
      status,
      website
   } = data;

   return (
      <div className="container mx-auto py-16 px-4">
         <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start gap-6">
               <img
                  src={company_logo}
                  alt={company}
                  className="w-28 h-28 object-cover rounded-xl border border-gray-300 shadow-sm"
               />
               <div className="space-y-1">
                  <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                  <p className="text-gray-600 text-sm">Company: <span className="font-medium">{company}</span></p>
                  <p className="text-gray-600 text-sm">Location: {location}</p>
                  <p className="text-gray-600 text-sm">Job Type: {jobType}</p>
                  <p className="text-gray-600 text-sm">Category: {category}</p>
                  <p className="text-gray-600 text-sm">Status: <span className={`font-semibold ${status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{status}</span></p>
                  <p className="text-gray-600 text-sm">Posted At: {new Date(postedAt).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-sm">Deadline: {applicationDeadline}</p>
                  <p className="text-gray-600 text-sm">Applicants: {applicants_count}</p>
                  <p className="text-gray-600 text-sm">
                     Website: <a href={website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{website}</a>
                  </p>
               </div>
            </div>

            {/* Description */}
            <div className="mt-8">
               <h3 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h3>
               <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Responsibilities */}
            {/* <div className="mt-6">
               <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsibilities</h3>
               <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {responsibilities?.map((item, index) => (
                     <li key={index}>{item}</li>
                  ))}
               </ul>
            </div> */}

            {/* Requirements */}
            <div className="mt-6">
               <h3 className="text-xl font-semibold text-gray-800 mb-2">Requirements</h3>
               <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {requirements?.map((item, index) => (
                     <li key={index}>{item}</li>
                  ))}
               </ul>
            </div>

            {/* Salary */}
            <div className="mt-6">
               <h3 className="text-xl font-semibold text-gray-800 mb-2">Salary Range</h3>
               <p className="text-gray-700 font-medium">
                  {salaryRange?.min} - {salaryRange?.max} {salaryRange?.currency?.toUpperCase()}
               </p>
            </div>

            {/* HR Info */}
            <div className="mt-8 border-t pt-5">
               <h3 className="text-xl font-semibold text-gray-800 mb-2">HR Contact</h3>
               <p className="text-gray-700">Name: {hr_name}</p>
               <p className="text-gray-700">Email: {hr_email}</p>
            </div>

            {/* Employer Info */}
            <div className="mt-6 border-t pt-5">
               <h3 className="text-xl font-semibold text-gray-800 mb-3">Posted By</h3>
               <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                     <img
                        src={employer?.photo}
                        alt={employer?.name}
                        className="w-14 h-14 rounded-full border object-cover"
                     />
                     <div>
                        <p className="text-gray-800 font-semibold">{employer?.name}</p>
                        <p className="text-gray-600 text-sm">{employer?.email}</p>
                     </div>
                  </div>

                  <Link to={`/apply/${_id}`}>
                     <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition duration-300"
                        
                     >
                        Apply Now
                     </button>
                  </Link>
               </div>
            </div>

         </div>
      </div>
   );
}

export default DetlisPage;

