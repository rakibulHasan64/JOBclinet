export const myApplication = (email) => {
  if (!email) {
    console.warn("No email provided to myApplication()");
    return Promise.resolve([]);
  }

  const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/?$/, "/");
  const url = `${apiUrl}jobapply?email=${encodeURIComponent(email)}`;

  console.log("📡 Fetching applications from:", url);

  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch applications");
      return res.json();
    })
    .catch(err => {
      console.error("Error in myApplication():", err);
      return [];
    });
};
