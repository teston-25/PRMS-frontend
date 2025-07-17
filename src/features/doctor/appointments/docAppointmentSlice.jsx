import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentAPI from "../../../API/appointmentAPI";

// Thunks
export const fetchDoctorAppointments = createAsyncThunk(
  "doctorAppointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getMyAppointments();
      // Accepts both {appointments: [...]} or just an array
      return response.appointments || response.data?.appointments || response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch appointments");
    }
  }
);

export const fetchDoctorAppointmentById = createAsyncThunk(
  "doctorAppointments/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAppointmentById(id);
      return response.appointment || response.data?.appointment || response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch appointment");
    }
  }
);

export const addDoctorAppointment = createAsyncThunk(
  "doctorAppointments/add",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.addAppointment(appointmentData);
      return response.appointment || response.data?.appointment || response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add appointment");
    }
  }
);

export const updateDoctorAppointment = createAsyncThunk(
  "doctorAppointments/update",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.updateAppointment(id, updateData);
      return response.appointment || response.data?.appointment || response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update appointment");
    }
  }
);

export const deleteDoctorAppointment = createAsyncThunk(
  "doctorAppointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.deleteAppointment(id);
      return response.appointment || response.data?.appointment || response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete appointment");
    }
  }
);

// Add a new thunk for status update
export const updateDoctorAppointmentStatus = createAsyncThunk(
  "doctorAppointments/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.updateAppointmentStatus(id, status);
      return response.appointment || response.data?.appointment || response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update appointment status");
    }
  }
);

const docAppointmentSlice = createSlice({
  name: "doctorAppointments",
  initialState: {
    appointments: [],
    currentAppointment: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDoctorAppointments: (state) => {
      state.appointments = [];
    },
    clearCurrentDoctorAppointment: (state) => {
      state.currentAppointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchDoctorAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAppointment = action.payload;
      })
      .addCase(fetchDoctorAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addDoctorAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDoctorAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addDoctorAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateDoctorAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.appointments.findIndex(a => a._id === action.payload._id);
        if (idx !== -1) state.appointments[idx] = action.payload;
        if (state.currentAppointment && state.currentAppointment._id === action.payload._id) {
          state.currentAppointment = action.payload;
        }
      })
      .addCase(updateDoctorAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Status
      .addCase(updateDoctorAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.appointments.findIndex(a => a._id === action.payload._id);
        if (idx !== -1) state.appointments[idx] = action.payload;
        if (state.currentAppointment && state.currentAppointment._id === action.payload._id) {
          state.currentAppointment = action.payload;
        }
      })
      .addCase(updateDoctorAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteDoctorAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctorAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(a => a._id !== action.payload._id);
      })
      .addCase(deleteDoctorAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorAppointments, clearCurrentDoctorAppointment } = docAppointmentSlice.actions;
export default docAppointmentSlice.reducer; 