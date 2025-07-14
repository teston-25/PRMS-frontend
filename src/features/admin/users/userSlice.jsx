import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../../API/userAPI";
import { signup } from "../../auth/authSlice";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await userAPI.getAllUsers();
  return response.data.users;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateUserRole(id, role);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "users/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateUserStatus(id, status);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (userData) => {
    const response = await signup.post("/users", userData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    filter: "all",
    searchTerm: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetUserState: (state) => {
      state.loading = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        const existingUser = state.users.find((user) => user.id === id);
        if (existingUser) {
          existingUser.role = role;
        }
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const existingUser = state.users.find((user) => user.id === id);
        if (existingUser) {
          existingUser.status = status;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { setFilter, setSearchTerm, resetUserState } = userSlice.actions;

export const selectAllUsers = (state) => state.users.users;
export const selectFilteredUsers = (state) => {
  const { users, filter, searchTerm } = state.users;
  let filteredUsers = users;

  if (filter !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.role === filter);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  return filteredUsers;
};

export const selectUserStatus = (state) => state.users.status;
export const selectUserError = (state) => state.users.error;

export default userSlice.reducer;
