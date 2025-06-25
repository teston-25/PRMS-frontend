import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  async () => {
    const response = await appointmentsAPI.getTodaysAppointments();
    return response.data;
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

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    todaysAppointments: [],
    patientAppointments: [],
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
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
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
        state.appointments.push(action.payload);
        state.status = "succeeded";
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
        state.appointments = state.appointments.filter(
          (appt) => appt._id !== action.payload._id
        );
        state.status = "succeeded";
      })
      .addCase(deleteAppointment.rejected, handleRejected)

      // Appointments by patient
      .addCase(fetchAppointmentsByPatient.pending, handlePending)
      .addCase(fetchAppointmentsByPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patientAppointments = action.payload.appointments;
        state.status = "succeeded";
      })
      .addCase(fetchAppointmentsByPatient.rejected, handleRejected);
  },
});

export const {
  clearAppointments,
  clearTodaysAppointments,
  clearPatientAppointments,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
