import React, { useState } from 'react';

function AllJobBanner() {

   const [serch, setSerch] = useState("");

   console.log(serch);
   
   return (
      <>
         
         <div className="bg-green-700">
            <div className="container mx-auto py-28 px-4">
               <h3 className="text-center font-roboto text-4xl text-white mt-8">Job Listing</h3>
               <p className="text-center font-roboto mt-7 text-white">
                  We delivered blazing fast & striking work solution
               </p>
               <div className="mt-8 flex justify-center">
                  <input
                     value={serch} onChange={(e)=> setSerch(e.target.value)}
                     type="text"
                     placeholder="Search jobs..."
                     className="w-full max-w-md px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                  />
               </div>
            </div>
         </div>
         
      </>
   );
}

export default AllJobBanner;