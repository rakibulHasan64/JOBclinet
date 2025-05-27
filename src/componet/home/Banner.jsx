function Banner() {
   return (
      <>
         <div className="container mx-auto px-4 py-20 md:py-28 mt-10 md:mt-16">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
               {/* Text Content */}
               <div className="flex flex-col items-start gap-4 md:gap-5 py-5 text-center md:text-left">
                  <h3 className="text-base md:text-lg text-green-800/70">#1 Online Marketplace</h3>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-playfair text-green-500 leading-tight">
                     Find the talents <br className="hidden md:block" /> for any job.
                  </h1>
                  <p className="text-sm md:text-md font-roboto text-gray-600 leading-relaxed">
                     Unlock your potential with quality jobs & earn from <br className="hidden md:block" />
                     world-leading brands & companies.
                  </p>
                  <button className="px-6 py-2.5 font-medium bg-green-500 rounded-full text-white text-base md:text-xl">
                     Post a Job
                  </button>

                  
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                     <h2 className="text-base md:text-xl">Trusted by:</h2>
                     <img className="w-16 h-auto" src="https://img.freepik.com/free-psd/vertical-id-card-with-lanyards-branding-mockup_47987-29182.jpg?uid=R163698922&ga=GA1.1.1385969598.1744788101&semt=ais_hybrid&w=740" alt="Brand 1" />
                     <img className="w-16 h-auto" src="https://img.freepik.com/free-psd/vertical-id-card-with-lanyards-branding-mockup_47987-29182.jpg?uid=R163698922&ga=GA1.1.1385969598.1744788101&semt=ais_hybrid&w=740" alt="Brand 2" />
                  </div>
               </div>

               {/* Image */}
               <div className="w-full md:w-1/2">
                  <img
                     className="w-full object-contain"
                     src="https://img.freepik.com/free-psd/vertical-id-card-with-lanyards-branding-mockup_47987-29182.jpg?uid=R163698922&ga=GA1.1.1385969598.1744788101&semt=ais_hybrid&w=740"
                     alt="ID Card"
                  />
               </div>
            </div>
         </div>
      </>
   );
}

export default Banner;
 