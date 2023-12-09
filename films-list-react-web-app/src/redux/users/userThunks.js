import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout } from "../../services/userService";

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials) => await login(credentials)
);

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials) => await register(credentials)
);

export const logoutThunk = createAsyncThunk(
  "logout",
  async () => await logout()
);
