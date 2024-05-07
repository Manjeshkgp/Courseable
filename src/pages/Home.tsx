import { useEffect } from "react";
import Course from "../components/Course";
import { getCourses } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAllCourses } from "../store/slices/courseSlice";
import { RootState } from "../store/store";
const Home = () => {
  const dispatch = useDispatch();
  const {data} = useSelector((state:RootState)=>state.courses)
  useEffect(() => {
    if(data.length!==0){
      // simple hack for using old data, for production RTK is best
      return
    }
    try {
      getCourses()
        .then((data) => {
          const coursesArray = Object.keys(data).map(courseId => ({
            courseId,
            ...data[courseId]
          }));
          dispatch(setAllCourses(coursesArray));
        })
        .catch((err) => console.log({ err }));
    } catch (error) {
      console.log({ error });
    }
  }, [data]);
  return (
    <main className="bg-slate-50 flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:flex-wrap gap-y-3">
      {data.map((courseObj,index)=><Course data={courseObj} key={index} />)}
    </main>
  );
};

export default Home;
