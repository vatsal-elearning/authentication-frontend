import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import API from '../utils/axiosInstance';

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: any, thunkAPI) => {
    try {
      const res = await API.post(`/auth/login`, credentials, {
        withCredentials: true,
      });
      localStorage.setItem('token', res.data.data?.token);
      return res.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.',
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login Failed',
      );
    }
  },
);

// Fetch Profile
export const fetchProfile = createAsyncThunk(
  'auth/profile',
  async (_, thunkAPI) => {
    try {
      const res = await API.get(`/auth/profile`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await API.post(`/auth/logout`, {}, { withCredentials: true });
  localStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch profile
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.user = action.payload as string;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
    });
  },
});

export default authSlice.reducer;
