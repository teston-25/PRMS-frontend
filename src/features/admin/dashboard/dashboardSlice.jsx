import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../../../API/userAPI";
import patientAPI from "../../../API/patientAPI";
import appointmentAPI from "../../../API/appointmentAPI";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, thunkAPI) => {
    try {
      const [usersRes, patientsRes, appointmentsRes] = await Promise.all([
        userAPI.allUsers(),
        patientAPI.allPatients(),
        appointmentAPI.allAppointments(),
      ]);

      const activeUsers = usersRes.data.users.filter(
        (user) => user.active === true
      );

      return {
        totalUsers: usersRes.results,
        activeUsers: activeUsers.length,
        totalPatients: patientsRes.results,
        totalAppointments: appointmentsRes.results,
        recentPatients: patientsRes.data.patients.slice(0, 4),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to fetch dashboard stats.",
        error
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    error: null,
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      totalPatients: 0,
      totalAppointments: 0,
      recentPatients: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
