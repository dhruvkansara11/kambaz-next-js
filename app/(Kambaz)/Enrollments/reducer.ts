// app/(Kambaz)/Enrollments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = {
  user: string;
  course: string;
};

interface EnrollmentsState {
  items: Enrollment[];
}

const initialState: EnrollmentsState = {
  items: [], // server will populate this
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Replace list from server
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.items = action.payload;
    },

    // Add enrollment (only if it does not exist)
    enroll: (state, action: PayloadAction<Enrollment>) => {
      const { user, course } = action.payload;

      const exists = state.items.some(
        (e) => e.user === user && e.course === course
      );

      if (!exists) {
        state.items.push({ user, course });
      }
    },

    // Remove the matching (user, course) pair
    unenroll: (state, action: PayloadAction<Enrollment>) => {
      const { user, course } = action.payload;

      state.items = state.items.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
