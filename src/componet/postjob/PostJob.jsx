
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

function PostJob() {
   const { user } = useContext(AuthContext);
   // console.log(user);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // Destructure salary-related fields & others
      const {
         minSalary,
         maxSalary,
         currency,
         requirements,
         responsibilities,
         ...rest
      } = data;

      // Employer info from logged-in user
      const employer = {
         name: user?.displayName || "Unknown Employer",
         email: user?.email || "noemail@example.com",
         photo: user?.photoURL || "https://i.ibb.co/mXD5MNf/facebook.png",
      };

      const jobData = {
         ...rest,
         salaryRange: {
            min: parseInt(minSalary, 10) || 0,
            max: parseInt(maxSalary, 10) || 0,
            currency: currency || "usd",
         },
         requirements: requirements
            ? requirements.split(",").map((r) => r.trim())
            : [],
         responsibilities: responsibilities
            ? responsibilities.split(",").map((r) => r.trim())
            : [],
         applicants_count: 0,
         status: "active",
         postedAt: new Date().toISOString(),
         employer,
      };

      const apiUrl = import.meta.env.VITE_API_URL;

      try {
         await axios.post(`${apiUrl}jobs`, jobData);
         toast.success("✅ Job posted successfully!");
         e.target.reset();
      } catch (error) {
         console.error("Job post error:", error);
         toast.error("❌ Failed to post job!");
      }
   };
   

   return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl">
         <h2 className="text-3xl font-bold text-green-600 mb-6 mt-8 text-center">
            Post a Job
         </h2>
         <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
               <label className="block text-sm font-medium">Job Title</label>
               <input name="title" required className="w-full border p-2 rounded-md" />
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium">Company Name</label>
                  <input name="company" required className="w-full border p-2 rounded-md" />
               </div>
               <div>
                  <label className="block text-sm font-medium">Company Logo URL</label>
                  <input name="company_logo" className="w-full border p-2 rounded-md" />
               </div>
            </div>

            {/* Job Type & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium">Job Type</label>
                  <select name="jobType" required className="w-full border p-2 rounded-md">
                     <option value="">Select Type</option>
                     <option value="Full-time">Full-time</option>
                     <option value="Part-time">Part-time</option>
                     <option value="Remote">Remote</option>
                     <option value="Internship">Internship</option>
                     <option value="Hybrid">Hybrid</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium">Category</label>
                  <input name="category" required className="w-full border p-2 rounded-md" />
               </div>
            </div>

            {/* Location */}
            <div>
               <label className="block text-sm font-medium">Location</label>
               <input name="location" required className="w-full border p-2 rounded-md" />
            </div>

            {/* Description */}
            <div>
               <label className="block text-sm font-medium">Job Description</label>
               <textarea name="description" rows="4" required className="w-full border p-2 rounded-md" />
            </div>

            {/* Requirements */}
            <div>
               <label className="block text-sm font-medium">Requirements (comma-separated)</label>
               <textarea name="requirements" rows="3" required className="w-full border p-2 rounded-md" />
            </div>

            {/* Responsibilities */}
            <div>
               <label className="block text-sm font-medium">Responsibilities (comma-separated)</label>
               <textarea name="responsibilities" rows="3" className="w-full border p-2 rounded-md" />
            </div>

            {/* Salary */}
            <div className="mb-4">
               <label className="block text-sm font-medium mb-2">Salary Range</label>
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <label className="block text-sm font-medium">Minimum</label>
                     <input name="minSalary" type="number" required className="w-full border p-2 rounded-md" />
                  </div>
                  <div className="flex-1">
                     <label className="block text-sm font-medium">Maximum</label>
                     <input name="maxSalary" type="number" required className="w-full border p-2 rounded-md" />
                  </div>
                  <div className="flex-1">
                     <label className="block text-sm font-medium">Currency</label>
                     <select name="currency" required className="w-full border p-2 rounded-md">
                        <option value="usd">USD</option>
                        <option value="bdt">BDT</option>
                        <option value="eur">EUR</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Deadline & HR Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium">Application Deadline</label>
                  <input type="date" name="applicationDeadline" required className="w-full border p-2 rounded-md" />
               </div>
               <div>
                  <label className="block text-sm font-medium">Contact Email (HR)</label>
                  <input defaultValue={user?.email|| ""} readOnly name="hr_email" required className="w-full border p-2 rounded-md" />
               </div>
            </div>

            {/* Optional: HR Name & Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium">HR Name</label>
                  <input defaultValue={user?.displayName || ""} name="hr_name" readOnly className="w-full border p-2 rounded-md" />

               </div>
               <div>
                  <label className="block text-sm font-medium">Company Website</label>
                  <input name="website" className="w-full border p-2 rounded-md" />
               </div>
            </div>

            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
               Submit Job
            </button>
         </form>
      </div>
   );
}

export default PostJob;




// const jobData = {
//    title: formData.get("title"),
//    company: formData.get("company"),
//    logo: formData.get("logo"),
//    type: formData.get("type"),
//    location: formData.get("location"),
//    salary: formData.get("salary"),
//    description: formData.get("description"),
//    requirements: formData.get("requirements"),
//    perks: formData.get("perks"),
//    deadline: formData.get("deadline"),
//    email: formData.get("email"),
//    website: formData.get("website"),
// };