import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  token: "",
  user: [],
  LocationQuizLB: [],
  FBQuizLB: [],
  LocationQuizHistory: [],
  FBQuizHistory: [],
};

export const findUser = createAsyncThunk(
  "user/find",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/public/findUser`,
        formData.username,
        { headers: { "Content-Type": "text/plain" } }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

export const sendEmail = createAsyncThunk(
  "email/send",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/email/send`,
        email
      );
      return response.status;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

export const changePassword = createAsyncThunk(
  "change/password",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/public/change-pass`,
        user
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/public/login`,
        user
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "user/getDetail",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      if (!token) {
        console.error("Token is missing or invalid");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/fetchUserDetail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const createUser = createAsyncThunk(
  "create/user",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/public/Signup`,
        user
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

export const getLocationQuizLeaderboard = createAsyncThunk(
  "LocationQuiz/getLeaderBoard",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      if (!token) {
        console.error("Token is missing or invalid");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/LocationQuiz/getLeaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const getLocationQuizHistory = createAsyncThunk(
  "LocationQuiz/getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      if (!token) {
        console.error("Token is missing or invalid");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/LocationQuiz/getHistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const generateFBQuiz = createAsyncThunk(
  "FBQuiz/generate",
  async (location, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      if (!token) {
        console.error("Token is missing or invalid");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ai/generate-fill-Quiz`,
        location,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const generateLocationQuiz = createAsyncThunk(
  "LocationQuiz/generate",
  async (location, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      if (!token) {
        console.error("Token is missing or invalid");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ai/generateLocationQuiz`,
        location,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const getFBQuizLeaderboard = createAsyncThunk(
  "FBQuiz/getLeaderBoard",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      if (!token) {
        console.error("Token is missing or invalid");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/FB-quiz/getLeaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const getFBQuizHistory = createAsyncThunk(
  "FBQuiz/getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      if (!token) {
        console.error("Token is missing or invalid");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/FB-quiz/getHistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const setProfileImg = createAsyncThunk(
  "user/setImg",
  async (ImageData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("HeritaQuestToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/user-img`,
        ImageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const slice = createSlice({
  name: "heritaQuest",
  initialState,
  reducers: {
    clearState(state) {
      (state.token = ""), (state.user = []);
      state.LocationQuizLB = [];
      state.FBQuizLB = [];
      state.LocationQuizHistory = [];
      state.FBQuizHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.fulfilled, () => {
        toast.success("OTP sent successfully");
      })
      .addCase(sendEmail.rejected, () => {
        toast.error("Failed to sent OTP");
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log(action.payload);
        toast.success("Password Changed");
      })
      .addCase(changePassword.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("HeritaQuestToken", action.payload);
        toast.success("Login Successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserDetail.rejected, () => {
        localStorage.removeItem("HeritaQuestToken");
        state.user = [];
        state.toekn = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        toast.success("User created sucessfully");
      })
      .addCase(createUser.rejected, (state, action) => {
        toast.error(action.payload || "Error in creating user");
      })
      .addCase(getLocationQuizLeaderboard.fulfilled, (state, action) => {
        state.LocationQuizLB = action.payload;
      })
      .addCase(getFBQuizLeaderboard.fulfilled, (state, action) => {
        state.FBQuizLB = action.payload;
      })
      .addCase(getLocationQuizHistory.fulfilled, (state, action) => {
        state.LocationQuizHistory = action.payload;
      })
      .addCase(getFBQuizHistory.fulfilled, (state, action) => {
        state.FBQuizHistory = action.payload;
      })
      .addCase(generateFBQuiz.fulfilled, (state, action) => {
        state.FBQuizHistory.push(action.payload);
      })
      .addCase(generateFBQuiz.rejected, (state, action) => {
        toast.error("Fail to Generate Quiz");
      })
      .addCase(generateLocationQuiz.fulfilled, (state, action) => {
        state.LocationQuizHistory.push(action.payload);
      })
      .addCase(generateLocationQuiz.rejected, (state, action) => {
        toast.error("Fail to Generate Quiz");
      })
      .addCase(setProfileImg.fulfilled, (state, action) => {
        state.user.userImageUrl = action.payload;
      });
  },
});

export default slice.reducer;
export const {clearState}=slice.actions;
