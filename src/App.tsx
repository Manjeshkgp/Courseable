import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Course = lazy(() => import("./pages/Course"));

const SampleLoader = (
  <div className="flex w-full h-full min-h-screen justify-center items-center">
    <p className="text-xl md:text-3xl">Loading...</p>
  </div>
);

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <Suspense fallback={SampleLoader}>
                <Home />
              </Suspense>
            </>
          ),
        },
        {
          path: "/profile",
          element: (
            <Suspense fallback={SampleLoader}>
              <Profile />
            </Suspense>
          ),
        },
        {
          path: "/course/:id",
          element: (
            <Suspense fallback={SampleLoader}>
              <Course />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
