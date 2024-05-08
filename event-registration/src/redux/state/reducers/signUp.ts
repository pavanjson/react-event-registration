import { createSlice } from "@reduxjs/toolkit";
import { signUpUser } from "../action-creators";
interface State {
  loading: boolean;
  signUpData: any;
  error: any | null;
}

const initialState: State = {
  loading: false,
  signUpData: null,
  error: null,
};
export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.signUpData = action.payload;
      state.loading = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default signupSlice.reducer;
