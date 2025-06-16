import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import patientAPI from "../../../API/patientAPI";

export const fetchPatients = createAsyncThunk(
  "patients/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await patientAPI.getAllPatients();
      return response.data.patients || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch patients"
      );
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  "patients/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await patientAPI.singlePatient(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch patient"
      );
    }
  }
);

export const createPatient = createAsyncThunk(
  "patients/create",
  async (patientData, { rejectWithValue }) => {
    try {
      const response = await patientAPI.addPatient(patientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create patient"
      );
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await patientAPI.updatePatient(id, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update patient"
      );
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patients/delete",
  async (id, { rejectWithValue }) => {
    try {
      await patientAPI.deletePatient(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete patient"
      );
    }
  }
);

export const searchPatient = createAsyncThunk(
  "patients/search",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await patientAPI.searchPatient(searchTerm);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete patient"
      );
    }
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    searchResults: [],
    current: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearCurrent: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.success = true;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
        state.success = true;
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(searchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.success = true;
      })
      .addCase(searchPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResults = [];
      });
  },
});

export const { resetState, clearCurrent } = patientsSlice.actions;
export default patientsSlice.reducer;
