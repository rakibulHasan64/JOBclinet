import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import AppLection from "./AppLection";
import { myApplication } from "../../api/applactionApi";

function MyApplication() {
   const { user } = useContext(AuthContext);
   const [applications, setApplications] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!user?.email) return;

      myApplication(user.email)
         .then(data => {
            setApplications(data || []);
         })
         .catch(err => {
            console.error("Unexpected error:", err);
         })
         .finally(() => setLoading(false));
   }, [user?.email]);

   if (loading) {
      return (
         <div className="h-screen flex justify-center items-center">
            Loading...
         </div>
      );
   }

   return (
      <div className="py-20">
         <AppLection applications={applications} />
      </div>
   );
}

export default MyApplication;


