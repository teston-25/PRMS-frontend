import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import invoiceAPI from "../../../API/invoiceAPI";

// Async thunk to create a new invoice
export const createInvoice = createAsyncThunk(
  "doctorInvoices/createInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const data = await invoiceAPI.createInvoice(invoiceData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create invoice"
      );
    }
  }
);

const doctorInvoiceSlice = createSlice({
  name: "doctorInvoices",
  initialState: {
    created: null,
    creating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.creating = false;
        state.created = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      });
  },
});

export default doctorInvoiceSlice.reducer; 