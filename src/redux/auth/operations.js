import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const goitApi = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

export const setAuthHeader = token => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = '';
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post('/users/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      if (e.response.data.code === 11000) {
        toast.error('User already exist');
        return thunkAPI.rejectWithValue(e.message);
      }
      console.error('Registration Error: ', e.response?.data);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post('/users/login', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await goitApi.post('/users/logout');
      clearAuthHeader();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (savedToken === null) {
      return thunkApi.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(savedToken);
      const { data } = await goitApi.get('/users/current');
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
