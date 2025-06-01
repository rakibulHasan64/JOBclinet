import { useEffect, useState, useContext } from "react";
import AppLection from "./AppLection";
import { AuthContext } from "../provider/AuthProvider";
import { myApplacation } from "../../api/applactionApi";

function MyAppLation() {
   const { user } = useContext(AuthContext);
   const [applications, setApplications] = useState([]);
   console.log(applications);
   
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!user?.email) return;

      setLoading(true);
      myApplacation(user.email)
         .then((data) => {
            setApplications(data);
         })
         .catch((err) => {
            console.error(err);
            setApplications([]);
         })
         .finally(() => {
            setLoading(false);
         });
   }, [user]);

   if (loading) return <div className="h-screen flex justify-center items-center ">Loading...</div>;

   return (
      <div>
         <AppLection myApplacation={applications} />
      </div>
   );
}

export default MyAppLation;



