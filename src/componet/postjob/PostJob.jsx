import axios from "axios";
import { toast } from "react-toastify";


function PostJob() {


   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const jobData = {
         title: formData.get("title"),
         company: formData.get("company"),
         logo: formData.get("logo"),
         type: formData.get("type"),
         location: formData.get("location"),
         salary: formData.get("salary"),
         description: formData.get("description"),
         requirements: formData.get("requirements"),
         perks: formData.get("perks"),
         deadline: formData.get("deadline"),
         email: formData.get("email"),
         website: formData.get("website"),
      };

      const apiUrl = import.meta.env.VITE_API_URL;

      console.log(apiUrl,jobData);
      

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
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl  ">
         <h2 className="text-3xl font-bold text-green-600 mb-6 mt-8 text-center">Post a Job</h2>
         <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label className="block text-sm font-medium">Job Title</label>
               <input name="title" required className="w-full border p-2 rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium">Company Name</label>
                  <input name="company" required className="w-full border p-2 rounded-md" />
               </div>

               <div>
                  <label className="block text-sm font-medium">Company Logo URL</label>
                  <input name="logo" className="w-full border p-2 rounded-md" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium">Job Type</label>
                  <select name="type" required className="w-full border p-2 rounded-md">
                     <option value="">Select Type</option>
                     <option value="Full-time">Full-time</option>
                     <option value="Part-time">Part-time</option>
                     <option value="Remote">Remote</option>
                     <option value="Internship">Internship</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium">Location</label>
                  <input name="location" required className="w-full border p-2 rounded-md" />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium">Salary Range (USD)</label>
               <input name="salary" required className="w-full border p-2 rounded-md" />
            </div>

            <div>
               <label className="block text-sm font-medium">Job Description</label>
               <textarea name="description" rows="4" required className="w-full border p-2 rounded-md" />
            </div>

            <div>
               <label className="block text-sm font-medium">Requirements / Qualifications</label>
               <textarea name="requirements" rows="3" required className="w-full border p-2 rounded-md" />
            </div>

            <div>
               <label className="block text-sm font-medium">Perks & Benefits</label>
               <textarea name="perks" rows="3" className="w-full border p-2 rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium">Application Deadline</label>
                  <input type="date" name="deadline" required className="w-full border p-2 rounded-md" />
               </div>

               <div>
                  <label className="block text-sm font-medium">Contact Email</label>
                  <input type="email" name="email" required className="w-full border p-2 rounded-md" />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium">Company Website (optional)</label>
               <input name="website" className="w-full border p-2 rounded-md" />
            </div>

            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
               Submit Job
            </button>
         </form>
      </div>
   );
}

export default PostJob;
