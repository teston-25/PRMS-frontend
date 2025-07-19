import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientInvoices, setFilter } from "./patientInvoiceSlice";
import Spinner from "../../../components/common/Spinner";
import toast from "react-hot-toast";
import { useSelector as useReduxSelector } from "react-redux";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

const PatientInvoices = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filter } = useSelector((state) => state.patientInvoices);
  const { user } = useReduxSelector((state) => state.auth);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // Get patient ID from user profile
    if (user?.patient) {
      dispatch(fetchPatientInvoices(user.patient));
    }
  }, [dispatch, user?.patient]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Filtering logic
  const filteredInvoices = list.filter((inv) => {
    if (filter === "pending") return inv.status === "pending";
    if (filter === "paid") return inv.status === "paid";
    return true; // all
  });

  const handleToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Invoices</h1>
          <p className="text-gray-600">View and manage your medical invoices</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{list.length}</div>
              <div className="text-sm text-gray-600">Total Invoices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {list.filter(inv => inv.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {list.filter(inv => inv.status === 'paid').length}
              </div>
              <div className="text-sm text-gray-600">Paid</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => dispatch(setFilter(f.value))}
                className={`px-4 py-2 rounded-lg font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  filter === f.value
                    ? "bg-blue-500 text-white border-blue-500 shadow"
                    : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredInvoices.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500 text-lg mb-2">No invoices found</div>
              <div className="text-gray-400 text-sm">
                {filter === "all" 
                  ? "You don't have any invoices yet."
                  : `No ${filter} invoices found.`
                }
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => {
                    const isExpanded = expanded === invoice._id;
                    return (
                      <React.Fragment key={invoice._id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {invoice._id.slice(-8).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(invoice.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {formatCurrency(invoice.totalAmount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                invoice.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => handleToggle(invoice._id)}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              {isExpanded ? "Hide Details" : "View Details"}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan={5} className="px-6 py-4 bg-gray-50">
                              <div className="space-y-4">
                                {/* Services */}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
                                  <div className="bg-white rounded-lg p-4 border">
                                    {Array.isArray(invoice.services) && invoice.services.length > 0 ? (
                                      <div className="space-y-2">
                                        {invoice.services.map((service, index) => (
                                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                            <span className="text-gray-700">{service.name}</span>
                                            <span className="font-semibold text-gray-900">
                                              {formatCurrency(service.cost)}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-gray-500">No services listed</p>
                                    )}
                                  </div>
                                </div>

                                {/* Medical History */}
                                {invoice.medicalHistory && (
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Medical History</h4>
                                    <div className="bg-white rounded-lg p-4 border">
                                      <p className="text-gray-700">{invoice.medicalHistory}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Total */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                                  <span className="text-xl font-bold text-blue-600">
                                    {formatCurrency(invoice.totalAmount)}
                                  </span>
                                </div>

                                                                 {/* Payment Status */}
                                 <div className="text-center">
                                   <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                                     invoice.status === "paid"
                                       ? "bg-green-100 text-green-800"
                                       : "bg-yellow-100 text-yellow-800"
                                   }`}>
                                     <span className={`w-2 h-2 rounded-full mr-2 ${
                                       invoice.status === "paid" ? "bg-green-400" : "bg-yellow-400"
                                     }`}></span>
                                     {invoice.status === "paid" ? "Payment Completed" : "Payment Pending"}
                                   </div>
                                 </div>
                               </div>
                             </td>
                           </tr>
                         )}
                       </React.Fragment>
                     );
                   })}
                 </tbody>
               </table>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 };

 export default PatientInvoices; 