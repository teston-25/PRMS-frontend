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
  async (appointmentData) => {
    const response = await appointmentsAPI.addAppointment(appointmentData);
    return response.data;
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appointmentsSlice.reducer;
