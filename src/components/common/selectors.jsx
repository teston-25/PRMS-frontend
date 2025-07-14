import { createSelector } from "@reduxjs/toolkit";

export const selectDoctors = createSelector(
  (state) => state.users.users,
  (users) => users.filter((user) => user.role === "doctor")
);

export const selectDoctorsWithState = createSelector(
  [selectDoctors, (state) => state.users.loading, (state) => state.users.error],
  (doctors, loading, error) => ({
    doctors,
    loading,
    error,
  })
);

export const selectCurrentAppointment = createSelector(
  (state) => state.appointments.appointments,
  (state, id) => id,
  (appointments, id) => appointments.find((appt) => appt._id === id)
);

export const selectAppointmentState = createSelector(
  (state) => state.appointments,
  (appointments) => ({
    loading: appointments.loading,
    error: appointments.error,
    status: appointments.status,
  })
);
