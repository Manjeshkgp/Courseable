import { FC } from "react";
import { Link } from "react-router-dom";
import { courseI } from "../store/slices/courseSlice";

interface CourseProps {
  data:courseI
}

const Course: FC<CourseProps> = ({data}) => {
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
    </div>
  );
};

export default Course;
