import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getCourseById } from "../lib/firebase";

const Course = () => {
const {id:courseId} = useParams();
useEffect(()=>{
  if(courseId){
    try {
    getCourseById(courseId).then(data=>{console.log({data})}).catch(err=>{console.log({err})})
    } catch (error) {
      console.log({error})
    }
  }
},[courseId])
  return <div>Course</div>
}

export default Course