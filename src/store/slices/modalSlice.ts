import { createSlice } from "@reduxjs/toolkit";

type modalsType = "login" | "signup" | null;

const initialState: { currentModal: modalsType; data?: any } = {
  currentModal: null,
  data: undefined,
};

export const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateModal:(_state, {payload}:{payload:{ currentModal: modalsType; data?: any }})=>{
        return payload
    },
    closeModal: () => {
        return initialState
    }
  },
});

export const { updateModal, closeModal } = modals.actions;
export default modals.reducer;
