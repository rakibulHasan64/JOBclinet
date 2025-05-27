import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './componet/home/HomeLayout.jsx';
import AllAbout from './componet/abut/AllAbout.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

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
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);