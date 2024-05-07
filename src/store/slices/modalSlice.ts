import { createSlice } from "@reduxjs/toolkit";

type modalsType = "login" | "signup" | "course" | null;

const initialState: { currentModal: modalsType; data?: any, loading?:boolean } = {
  currentModal: null,
  data: undefined,
  loading: false
};

export const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateModal:(_state, {payload}:{payload:{ currentModal: modalsType; data?: any }})=>{
        return payload
    },
    updateLoading:(state,{payload}:{payload:boolean})=>{
      return {...state, loading:payload}
    },
    closeModal: () => {
        return initialState
    }
  },
});

export const { updateModal, updateLoading, closeModal } = modals.actions;
export default modals.reducer;
