import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthUser } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticatedUser(state,action: PayloadAction<AuthUser>,) {
      state.user = action.payload;
    },

    logout(state) {
      state.user = null;
    },
  },
});

export const {setAuthenticatedUser,logout} = authSlice.actions;

export default authSlice.reducer;