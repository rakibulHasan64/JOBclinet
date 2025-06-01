export const myApplacation = (email) => {
   const apiUrl = import.meta.env.VITE_API_URL;
 
  return fetch(`${apiUrl}jobapply?email=${encodeURIComponent(email)}`, {
     credentials: "include",
   })
     .then(res => {
       if (!res.ok) throw new Error("Failed to fetch applications");
       return res.json();
     })
     .catch(err => {
       console.error(err);
       return [];
     });
 };
 