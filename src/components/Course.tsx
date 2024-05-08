import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { courseI } from "../store/slices/courseSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { increaseStudentProgress } from "../lib/firebase";

interface CourseProps {
  data: courseI;
  showProgress?: boolean;
}

const Course: FC<CourseProps> = ({ data, showProgress }) => {
  const user = useSelector((state: RootState) => state.user);
  const myEnrollment = data.students?.find((obj) => obj.id === user.id);
  const [progress, setProgress] = useState<number | undefined>(
    myEnrollment?.progress
  );
  const updateProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setProgress(Number(e.target.value));
      if (myEnrollment?.id)
        increaseStudentProgress(
          data.courseId,
          myEnrollment?.id,
          Number(e.target.value)
        );
    } catch (err) {
      console.log({ err });
      alert("Oops! Some error occured during the updation of progress");
    }
  };
  const enrolmentStatusColor = () => {
    switch (data.enrollmentStatus) {
      case "Open":
        return "#22c55e";
      case "Closed":
        return "#dc2626";
      case "In Progress":
        return "#bef264";

      default:
        return "#475569";
    }
  };

  return (
    <div className="flex flex-col w-[96vw] sm:w-[48vw] md:w-[320px] bg-white rounded-2xl shadow-lg mx-auto p-1.5 pb-3 relative">
      <Link to={`/course/${data.courseId}`}>
        <img
          src={data.thumbnail}
          alt={data.name}
          className="rounded-2xl h-40 w-full object-cover cursor-pointer"
        />
      </Link>
      <p className="font-semibold tet-2xl mt-1 text-slate-700">{data.name}</p>
      <div className="flex justify-between items-center text-slate-600 text-sm">
        <p>Instructor: {data.instructor}</p>
        <p style={{ color: enrolmentStatusColor() }}>{data.enrollmentStatus}</p>
      </div>
      <p className="text-xs text-slate-500">{data.schedule}</p>
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-500">
          Total Duration: {data.duration} weeks
        </p>
        <Link
          to={`/course/${data.courseId}`}
          className="underline text-xs text-slate-600 hover:text-slate-900"
        >
          View more
        </Link>
      </div>
      {myEnrollment && showProgress && (
        <div className="flex w-full justify-between items-center text-sm text-slate-800 gap-1">
          <p className="text-nowrap">Progress :</p>
          <input
            onChange={updateProgress}
            className="w-full"
            type="range"
            min={0}
            max={100}
            value={progress}
          />
        </div>
      )}
    </div>
  );
};

export default Course;
