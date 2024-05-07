import { createSlice } from "@reduxjs/toolkit";

type SyllabusItem = {
  week: number;
  topic: string;
  content: string;
};

type Student = {
  id: string;
  name: string;
  email: string;
};

export interface courseI {
  id: string;
  name: string;
  description: string;
  duration: number;
  enrollmentStatus: "Open" | "Closed" | "In Progress";
  thumbnail: string;
  instructor: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: SyllabusItem[];
  students?: Student[];
  likes?: string[];
  courseId: string;
}

const initialState: { cache: courseI[]; data: courseI[] } = {
  cache: [],
  data: [],
};

export const courses = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setAllCourses: (_state, { payload }: { payload: courseI[] }) => {
      return { cache: payload, data: payload };
    },
    updateCourse: (state, { payload }: { payload: courseI }) => {
      const courseIndex = state.data.findIndex((obj) => obj.id === payload.id);
      if (courseIndex !== -1) {
        state.data[courseIndex] = payload;
        if (state.cache[courseIndex]) {
          state.cache[courseIndex] = payload;
        }
      }
    },
    searchByNameOrInstructor: (state, { payload }: { payload: string }) => {
      const lowerQuery = payload.toLowerCase();

      // Perform search
      const searchResults = state.cache.filter((course) => {
        // Convert course name and instructor to lowercase for case-insensitive search
        const lowerName = course.name.toLowerCase();
        const lowerInstructor = course.instructor.toLowerCase();

        // Check if query matches course name or instructor
        return (
          lowerName.includes(lowerQuery) || lowerInstructor.includes(lowerQuery)
        );
      });
      return {...state, data:searchResults}
    },
  },
});

export const { setAllCourses, updateCourse, searchByNameOrInstructor } = courses.actions;
export default courses.reducer;
