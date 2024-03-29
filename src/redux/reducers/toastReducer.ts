import { createSlice } from "@reduxjs/toolkit";
import { IToast } from "../../Utils/interface";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    isOpen: false,
    status: "info",
    message: "Toast Message",
  } as IToast,
  reducers: {
    openToast(
      state,
      action: {
        type: string;
        payload: { message: IToast["message"]; status: IToast["status"] };
      }
    ) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    closeToast(state) {
      state.isOpen = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
