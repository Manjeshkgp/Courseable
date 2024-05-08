import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  onValue,
  child,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { Student } from "../store/slices/courseSlice";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DB_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DB_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

const getCourses = async () => {
  const coursesRef = ref(db, "courses");
  const snapshot = await get(coursesRef);
  const courses = snapshot.val();
  return courses;
};

const getCourseById = async (courseId: string) => {
  const courseRef = ref(db, `courses/${courseId}`);
  try {
    const snapshot = await get(courseRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Course not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting course:", error);
    throw error;
  }
};

const enrollUserInCourse = async (
  courseId: string,
  userId: string,
  userEmail: string
) => {
  try {
    const userCoursesRef = ref(db, `users/${userId}/courses`);
    await push(userCoursesRef, courseId);
    const studentsRef = ref(db, `courses/${courseId}/students`);
    const studentsSnapshot = await get(studentsRef);
    const currentStudents = studentsSnapshot.val() || [];
    const updatedStudents = [
      ...currentStudents,
      {
        id: userId,
        email: userEmail,
        progress: 0,
      },
    ];
    await set(studentsRef, updatedStudents);
    console.log("User enrolled successfully");
  } catch (error) {
    console.error("Error enrolling user:", error);
    throw error;
  }
};

const getCoursesEnrolledByUser = async (userId: string) => {
  try {
    const userCoursesRef = ref(db, `users/${userId}/courses`);
    const userCoursesSnapshot = await get(userCoursesRef);
    const userCourses = userCoursesSnapshot.val() || {};
    const enrolledCourses: any[] = [];
    await Promise.all(
      Object.values(userCourses).map(async (courseId) => {
        const courseRef = ref(db, `courses/${courseId}`);
        const courseSnapshot = await get(courseRef);
        const courseData = courseSnapshot.val();
        if (courseData) {
          enrolledCourses.push({ ...courseData, courseId });
        }
      })
    );
    return enrolledCourses;
  } catch (error) {
    console.error("Error getting enrolled courses:", error);
    throw error;
  }
};

const likeCourse = async (courseId: string, userId: string) => {
  try {
    const courseLikesRef = ref(db, `courses/${courseId}/likes`);
    await push(courseLikesRef, userId);
    console.log("Course liked successfully");
  } catch (error) {
    console.error("Error liking course:", error);
    throw error;
  }
};

const unlikeCourse = async (courseId: string, userId: string) => {
  try {
    const courseLikesRef = ref(db, `courses/${courseId}/likes`);
    const likesSnapshot = await get(courseLikesRef);
    const currentLikes = likesSnapshot.val() || {};
    const updatedLikes = Object.keys(currentLikes).reduce(
      (result: any, key) => {
        if (currentLikes[key] !== userId) {
          result[key] = currentLikes[key];
        }
        return result;
      },
      {}
    );
    await set(courseLikesRef, updatedLikes);
    console.log("Course unliked successfully");
  } catch (error) {
    console.error("Error unliking course:", error);
    throw error;
  }
};

const getRealtimeLikesForCourse = (
  courseId: string,
  callback: (likesData: Object) => void
) => {
  const courseLikesRef = ref(db, `courses/${courseId}/likes`);
  const unsubscribe = onValue(courseLikesRef, (snapshot) => {
    const likesData = snapshot.val() || {};
    callback(likesData);
  });
  return unsubscribe;
};

const increaseStudentProgress = async (
  courseId: string,
  studentId: string,
  incrementedAmount: number
) => {
  try {
    const courseStudentsRef = ref(db, `courses/${courseId}/students`);
    const studentSnapshot = await get(courseStudentsRef);
    const studentsData = studentSnapshot.val() || [];
    const studentIndex = studentsData.findIndex(
      (student: Student) => student.id === studentId
    );
    if (studentIndex !== -1) {
      studentsData[studentIndex].progress = incrementedAmount;
      await set(courseStudentsRef, studentsData);
    } else {
      console.error("Student not found in course. Student ID:", studentId);
    }
  } catch (error) {
    console.error("Error increasing student progress:", error);
    throw error;
  }
};

export {
  getCourses,
  getCourseById,
  enrollUserInCourse,
  getCoursesEnrolledByUser,
  likeCourse,
  unlikeCourse,
  getRealtimeLikesForCourse,
  increaseStudentProgress,
};
