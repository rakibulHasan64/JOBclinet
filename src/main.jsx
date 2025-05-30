import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './componet/home/HomeLayout.jsx';
import AllAbout from './componet/abut/AllAbout.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import PostJob from './componet/postjob/PostJob.jsx';
import { ToastContainer } from 'react-toastify';
import AllJobs from './componet/home/AllJobs.jsx';
import AllJobLayout from './componet/home/AllJobLayout.jsx';
import MyPost from './componet/home/MyPost.jsx';
import DetlisPage from './componet/home/DetlisPage.jsx';
import JobApply from './componet/home/JobApply.jsx';
import AuthProvider from './componet/provider/AuthProvider.jsx';
import Login from './componet/login/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomeLayout />
      },

      {
        path: "/about",
        element: <AllAbout />

      },

      {
        path: "/alljob",
        element: <AllJobLayout />

      },
      {

        path: "/Addjob",
        element: <MyPost />

      },
      {
        path: "/job/:id",
        element: <DetlisPage />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}jobdetlis/${params.id}`)
      },

      {

        path: "/apply/:id",
        element: <JobApply />,

      },
    
      {
        path: "/PostJob",
        element: <PostJob />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
  
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
  
  </StrictMode>
);