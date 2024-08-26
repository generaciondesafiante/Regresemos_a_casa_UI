import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberStudents } from "../../types/types/numberStudents.type";

interface StudentsCount {
  students: NumberStudents;
}

const persistedAdmin =
  typeof window !== "undefined" ? localStorage.getItem("numberStudents") : null;

const initialState: StudentsCount = {
  students: persistedAdmin ? JSON.parse(persistedAdmin) : null,
};

const studentCounteSlice = createSlice({
  name: "numberStudents",
  initialState,

  reducers: {
    studentsCount(state, action: PayloadAction<NumberStudents>) {
      state.students = action.payload;
      localStorage.setItem("numberStudents", JSON.stringify(action.payload));
    },
  },
});

export const { studentsCount } = studentCounteSlice.actions;
export default studentCounteSlice.reducer;
