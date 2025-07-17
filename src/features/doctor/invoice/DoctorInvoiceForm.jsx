import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "./invoiceSlice";
import toast from "react-hot-toast";

export default function DoctorInvoiceForm({ patientId, medicalHistoryId, onClose }) {
  const dispatch = useDispatch();
  const { creating, error, created } = useSelector((state) => state.doctorInvoices);
  const [services, setServices] = useState([{ name: "", cost: "" }]);

  const handleServiceChange = (idx, field, value) => {
    setServices((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const addService = () => setServices((prev) => [...prev, { name: "", cost: "" }]);
  const removeService = (idx) => setServices((prev) => prev.filter((_, i) => i !== idx));

  const totalAmount = services.reduce((sum, s) => sum + Number(s.cost || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInvoice({
      patient: patientId,
      medicalHistory: medicalHistoryId,
      services: services.map(s => ({ name: s.name, cost: Number(s.cost) })),
      totalAmount
    })).then((res) => {
      if (!res.error) {
        toast.success("Invoice generated successfully!");
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700">×</button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Generate Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {services.map((service, idx) => (
            <div key={idx} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Service Name</label>
                <input type="text" value={service.name} onChange={e => handleServiceChange(idx, "name", e.target.value)} required className="w-full border rounded p-2" />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium mb-1">Cost</label>
                <input type="number" min="0" value={service.cost} onChange={e => handleServiceChange(idx, "cost", e.target.value)} required className="w-full border rounded p-2" />
              </div>
              {services.length > 1 && (
                <button type="button" onClick={() => removeService(idx)} className="text-red-500 text-lg font-bold pb-2">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addService} className="bg-blue-100 text-blue-700 px-3 py-1 rounded">+ Add Service</button>
          <div className="text-right font-semibold text-lg">Total: {totalAmount}</div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" disabled={creating} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
            {creating ? "Creating..." : "Create Invoice"}
          </button>
          {created && <div className="text-green-600 text-center mt-2">Invoice created successfully!</div>}
        </form>
      </div>
    </div>
  );
} 