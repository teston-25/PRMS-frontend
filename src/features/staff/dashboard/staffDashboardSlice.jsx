import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import patientAPI from "../../../API/patientAPI";
import appointmentAPI from "../../../API/appointmentAPI";

export const fetchStaffDashboardStats = createAsyncThunk(
  "staffDashboard/fetchStats",
  async (_, thunkAPI) => {
    try {
      const [patientsRes, appointmentsRes, todaysAppointmentsRes] = await Promise.all([
        patientAPI.getAllPatients(),
        appointmentAPI.getAllAppointments(),
        appointmentAPI.getTodaysAppointments(),
      ]);

      return {
        totalPatients: patientsRes.results,
        totalAppointments: appointmentsRes.results,
        todaysAppointments: todaysAppointmentsRes.results,
        recentPatients: patientsRes.data.patients.slice(-4),
        recentAppointments: appointmentsRes.data.appointments.slice(-3),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to fetch staff dashboard stats.",
        error
      );
    }
  }
);

const staffDashboardSlice = createSlice({
  name: "staffDashboard",
  initialState: {
    loading: false,
    error: null,
    stats: {
      totalPatients: 0,
      totalAppointments: 0,
      todaysAppointments: 0,
      recentPatients: [],
      recentAppointments: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStaffDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default staffDashboardSlice.reducer;
