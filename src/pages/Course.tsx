import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseById,
  enrollUserInCourse,
  likeCourse,
  unlikeCourse,
  getRealtimeLikesForCourse,
} from "../lib/firebase";
import { courseI } from "../store/slices/courseSlice";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateLoading } from "../store/slices/modalSlice";
import Heart from "../components/svgs/Heart";

const Course = () => {
  const { id: courseId } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState<courseI | null>(null);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState<boolean | undefined>(
    false
  );
  const [likes, setLikes] = useState<Object>([]);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (courseId) {
      try {
        dispatch(updateLoading(true));
        getCourseById(courseId)
          .then((data: courseI) => {
            setCourseData(data);
            setAlreadyEnrolled(
              data?.students?.some((obj) => obj.id === user.id)
            );
          })
          .catch((err) => {
            console.log({ err });
          })
          .finally(() => {
            dispatch(updateLoading(false));
          });
      } catch (error) {
        console.log({ error });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);
  useEffect(() => {
    if (courseId) {
      const unsubscribe = getRealtimeLikesForCourse(courseId, (likesData) => {
        setLikes(likesData);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [courseId]);
  useEffect(() => {
    setLiked(checkIfUserLikedCourse(user.id));
  }, [likes, user.id]);
  const enrollUser = async () => {
    try {
      if (courseId) {
        await enrollUserInCourse(courseId, user.id, user.email);
        setAlreadyEnrolled(true);
      }
    } catch (error) {
      alert("Oops! Some error occured during enrollment");
      console.log({ error });
    }
  };
  const checkIfUserLikedCourse = (userId: string) => {
    return Object.values(likes).includes(userId);
  };
  const likeToggle = () => {
    try {
      if (courseId) {
        if (checkIfUserLikedCourse(user.id)) {
          unlikeCourse(courseId, user.id);
        } else {
          likeCourse(courseId, user.id);
        }
      }
    } catch (err) {
      alert(
        `Oops! some error occured during ${
          checkIfUserLikedCourse(user.id) ? "dislike" : "like"
        }`
      );
      console.log({ err });
    }
  };
  return (
    <div className="flex flex-col justify-start items-center lg:flex-row lg:justify-between lg:items-start">
      <img
        src={courseData?.thumbnail}
        alt={courseData?.name}
        className="w-full h-80 object-cover lg:h-[calc(100vh-71px)] lg:w-[50vw]"
      />
      <div className="flex flex-col p-2 bg-slate-50 w-full gap-1">
        <h1 className="text-slate-950 text-2xl font-bold text-left w-full">
          {courseData?.name}
        </h1>
        <p className="text-slate-600 text-sm w-full text-left">
          {courseData?.description}
        </p>
        <p className="text-slate-600 text-sm w-full text-left">
          Duration: {courseData?.duration}
        </p>
        <p className="text-slate-600 text-sm w-full text-left">
          Schedule: {courseData?.schedule}
        </p>
        <p className="text-slate-600 text-sm w-full text-left">
          Instructor: {courseData?.instructor}
        </p>
        <p className="text-slate-600 text-sm w-full text-left">
          Location: {courseData?.location}
        </p>
        <p className="text-slate-600 text-sm w-full text-left">
          Prerequisites:{" "}
          {courseData?.prerequisites?.map((str, i, arr) => {
            if (i === arr.length - 1) return str;
            else return str + ", ";
          })}
        </p>
        <div className="flex flex-col gap-2 mt-2 justify-start items-center md:items-start w-full">
          <p className="font-semibold text-xl text-slate-700">Syllabus</p>
          {courseData?.syllabus?.map((obj) => (
            <div className="flex flex-col text-sm text-slate-600 p-1 text-left md:max-w-[350px]">
              <p>Week: {obj.week}</p>
              <p>Topic: {obj.topic}</p>
              <p>Content: {obj.content}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center md:justify-start md:gap-4">
          <Button
            onClick={enrollUser}
            disabled={alreadyEnrolled}
            variant="secondary"
          >
            {alreadyEnrolled ? "Enrolled" : "Enroll"}
          </Button>
          <div className="flex w-min gap-1 justify-end items-center text-slate-950">
            <p>{Object.keys(likes).length}</p>
            <Button
              onClick={likeToggle}
              className="w-[unset] min-w-[unset] p-2 text-white"
            >
              <Heart liked={liked} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
