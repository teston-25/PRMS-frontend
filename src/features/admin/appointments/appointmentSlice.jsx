import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import appointmentsAPI from "../../../API/appointmentAPI";

// Async Thunks
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const response = await appointmentsAPI.getAllAppointments();
    return response.data;
  }
);

export const addAppointment = createAsyncThunk(
  "appointments/addAppointment",
  async (newAppointment) => {
    const response = await appointmentsAPI.addAppointment(newAppointment);
    return response.data;
  }
);

export const fetchTodaysAppointments = createAsyncThunk(
  "appointments/fetchTodaysAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.getTodaysAppointments();
      return response.data;
    } catch (error) {
      if (error?.response?.status === 404) {
        // Return empty appointments array if not found
        return { appointments: [] };
      }
      return rejectWithValue(error.message || 'Failed to fetch today\'s appointments');
    }
  }
);

export const fetchAppointmentsByDate = createAsyncThunk(
  "appointments/fetchAppointmentsByDate",
  async (date) => {
    const response = await appointmentsAPI.getAppointmentsByDate(date);
    return response.data;
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async ({ id, updateData }) => {
    const response = await appointmentsAPI.updateAppointment(id, updateData);
    return response.data;
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id) => {
    const response = await appointmentsAPI.deleteAppointment(id);
    return response.data;
  }
);

export const fetchAppointmentsByPatient = createAsyncThunk(
  "appointments/fetchAppointmentsByPatient",
  async (id) => {
    const response = await appointmentsAPI.getAppointmentsByPatient(id);
    return response.data;
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchAppointmentById",
  async (id) => {
    const response = await appointmentsAPI.getAppointmentById(id);
    return response.data;
  }
);

export const clearAppointmentError = createAction("appointments/clearError");

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    todaysAppointments: [],
    patientAppointments: [],
    currentAppointment: [],
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    clearAppointments: (state) => {
      state.appointments = [];
    },
    clearTodaysAppointments: (state) => {
      state.todaysAppointments = [];
    },
    clearPatientAppointments: (state) => {
      state.patientAppointments = [];
    },
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
    resetAppointmentState: (state) => {
      state.currentAppointment = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = "pending";
      state.error = null;
      state.status = "loading";
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.status = "failed";
    };

    builder
      // Fetch all appointments
      .addCase(fetchAppointments.pending, handlePending)
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
        state.status = "succeeded";
      })
      .addCase(fetchAppointments.rejected, handleRejected)

      // Add appointment
      .addCase(addAppointment.pending, handlePending)
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const newAppointment = action.payload.appointment || action.payload;
        if (newAppointment?._id) {
          state.appointments.push(newAppointment);
          state.status = "succeeded";
        } else {
          throw new Error("No ID returned from server");
        }
      })
      .addCase(addAppointment.rejected, handleRejected)

      // Today's appointments
      .addCase(fetchTodaysAppointments.pending, handlePending)
      .addCase(fetchTodaysAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.todaysAppointments = action.payload.appointments;
        state.status = "succeeded";
      })
      .addCase(fetchTodaysAppointments.rejected, handleRejected)

      // Appointments by date
      .addCase(fetchAppointmentsByDate.pending, handlePending)
      .addCase(fetchAppointmentsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
        state.status = "succeeded";
      })
      .addCase(fetchAppointmentsByDate.rejected, handleRejected)

      // Update appointment
      .addCase(updateAppointment.pending, handlePending)
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (appt) => appt._id === action.payload._id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateAppointment.rejected, handleRejected)

      // Delete appointment
      .addCase(deleteAppointment.pending, handlePending)
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // Safely extract the deleted appointment ID
        const deletedId =
          action.payload?._id ||
          action.payload?.appointment?._id ||
          action.payload?.data?.appointment?._id;
        if (deletedId) {
          state.appointments = state.appointments.filter(
            (appt) => appt._id !== deletedId
          );
        } else {
          console.log('No ID returned from server');
        }
        state.status = "succeeded";
      })
      .addCase(deleteAppointment.rejected, handleRejected)

      // Appointments by patient
      .addCase(fetchAppointmentsByPatient.pending, handlePending)
      .addCase(fetchAppointmentsByPatient.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.appointments.findIndex(
          (a) => a._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.appointments[existingIndex] = action.payload;
        } else {
          state.appointments.push(action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(fetchAppointmentsByPatient.rejected, handleRejected)

      // Single appointment by ID
      .addCase(fetchAppointmentById.pending, handlePending)
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAppointment = action.payload.appointment || action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAppointmentById.rejected, handleRejected);
  },
});

export const {
  clearAppointments,
  clearTodaysAppointments,
  clearPatientAppointments,
  clearCurrentAppointment,
  resetAppointmentState,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
