import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thunk for Login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    // json-server will filter users by email and password
    const response = await api.get(`/users?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      const user = response.data[0];
      const token = `${user.id}-${Date.now()}`; // Create a dummy token
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return { user, token };
    } else {
      return rejectWithValue('Invalid credentials. Please try again.');
    }
  } catch (error) {
    return rejectWithValue('An error occurred during login.');
  }
});

// Thunk for Registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const checkUser = await api.get(`/users?email=${userData.email}`);
        if(checkUser.data.length > 0) {
            return rejectWithValue('An account with this email already exists.');
        }
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        return rejectWithValue('Could not create account.');
    }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    setAuthFromStorage: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;