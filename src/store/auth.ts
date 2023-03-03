import { createSlice } from "@reduxjs/toolkit"
import React from "react"

const initialState: { token: string; userId: string; userIsAdmin: string } = {
  token: "",
  userId: "",
  userIsAdmin: "",
}
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.userIsAdmin = action.payload.userIsAdmin
    },
    clearAuth(state, action) {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("userIsAdmin")
      state.token = ""
      state.userId = ""
      state.userIsAdmin = ""
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
