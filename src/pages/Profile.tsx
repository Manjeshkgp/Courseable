import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getCoursesEnrolledByUser } from "../lib/firebase";
import { courseI } from "../store/slices/courseSlice";
import Course from "../components/Course";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const [myCourses, setMyCourses] = useState<courseI[]>([]);
  useEffect(() => {
    if (user.id) {
      getCoursesEnrolledByUser(user.id)
        .then((data) => setMyCourses(data))
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [user.id]);
  return (
    <main>
      <p className="w-full text-center text-2xl font-semibold text-slate-950 my-2">My Courses</p>
      <div className="bg-slate-50 flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:flex-wrap gap-y-3">
        {myCourses.map((obj, i) => (
          <Course key={i} showProgress data={obj} />
        ))}
      </div>
    </main>
  );
};

export default Profile;
