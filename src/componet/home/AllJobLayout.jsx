import { useState } from "react";
import AllJobBanner from "../abut/AllJobBanner";
import AllJobs from "./AllJobs";

function AllJobLayout() {
   const [search, setSearch] = useState("");

   return (
      <>
         <AllJobBanner search={search} setSearch={setSearch} />
         <AllJobs search={search} />
      </>
   );
}

export default AllJobLayout;
