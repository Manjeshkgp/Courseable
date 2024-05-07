import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Layout from "./components/Layout";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const AllCourses = lazy(() => import("./pages/AllCourses"));
const Course = lazy(() => import("./pages/Course"));

const SampleLoader = (
  <div className="flex w-full h-full min-h-screen justify-center items-center">
    <p className="text-xl md:text-3xl">Loading...</p>
  </div>
);

export default function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
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
                {isAuthenticated ? <Home /> : <LandingPage />}
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
          path: "/courses",
          element: (
            <Suspense fallback={SampleLoader}>
              <AllCourses />
            </Suspense>
          ),
        },
        {
          path: "/courses/:id",
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
