// app/(Kambaz)/Courses/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  _id: string;
  number: string;
  name: string;
  description: string;
  img: string;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [], // Server fills this
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Replace the entire list (server → redux)
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },

    // Add one course (after server create returns it)
    addNewCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },

    // Delete course by ID
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },

    // Update a course
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
  },
});

export const {
  setCourses,
  addNewCourse,
  deleteCourse,
  updateCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
