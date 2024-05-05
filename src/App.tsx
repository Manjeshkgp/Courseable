import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

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
      path: "/",
      element: (
        <Suspense fallback={SampleLoader}>
          {isAuthenticated ? <Home /> : <LandingPage />}
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/courses",
      element: <AllCourses />,
      children: [
        {
          path: "/courses/:id",
          element: <Course />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
