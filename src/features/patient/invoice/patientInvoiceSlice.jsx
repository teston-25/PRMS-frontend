import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import invoiceAPI from "../../../API/invoiceAPI";

// Async thunk to fetch patient invoices
export const fetchPatientInvoices = createAsyncThunk(
  "patientInvoices/fetchPatientInvoices",
  async (patientId, { rejectWithValue }) => {
    try {
      const data = await invoiceAPI.getPatientInvoices(patientId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoices"
      );
    }
  }
);

// Async thunk to fetch single invoice by ID
export const fetchInvoiceById = createAsyncThunk(
  "patientInvoices/fetchInvoiceById",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const data = await invoiceAPI.getInvoiceById(invoiceId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoice"
      );
    }
  }
);

const patientInvoiceSlice = createSlice({
  name: "patientInvoices",
  initialState: {
    list: [],
    selectedInvoice: null,
    loading: false,
    error: null,
    filter: "all", // 'pending', 'paid', 'all'
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatientInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedInvoice = action.payload;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter, clearSelectedInvoice } = patientInvoiceSlice.actions;
export default patientInvoiceSlice.reducer; 