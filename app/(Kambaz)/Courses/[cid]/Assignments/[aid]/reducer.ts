import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../../Database"
import { v4 as uuidv4 } from "uuid";
import StateManagedSelect from "react-select";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description || "",
        points: assignment.points || 100,
        dueDate: assignment.dueDate || new Date().toISOString(),
        availableFrom: assignment.availableFrom || new Date().toISOString(),
        untilDate: assignment.untilDate || new Date().toISOString(),
        group: assignment.group || "ASSIGNMENTS",
        displayGradeAs: assignment.displayGradeAs || "Percentage",
        submissionType: assignment.submissionType || "Online",
        assignTo: assignment.assignTo || ["Everyone"],
        onlineEntryOptions: assignment.onlineEntryOptions || [],
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },

    setAssignments: (state, action) => {
      state.assignments = action.payload
    }
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;