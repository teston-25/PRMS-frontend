import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditLogs } from "./logSlice";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";

function Logs() {
  const dispatch = useDispatch();
  // Use individual selectors for each field to avoid selector warning
  const {logs, loading, error} = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchAuditLogs());
  }, [dispatch]);
  console.log("logs",logs);
  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Audit Logs</h1>
        <button
          onClick={() => dispatch(fetchAuditLogs())}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
          aria-label="Refresh logs"
        >
          Refresh
        </button>
      </div>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {/* Desktop Table */}
      <div className="hidden sm:block bg-white rounded-2xl shadow p-4 border border-gray-100 overflow-x-auto">
        <div className="max-h-[480px] overflow-y-auto">
          <table className="min-w-[600px] w-full text-sm divide-y divide-gray-200" aria-label="Audit log table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">Timestamp</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">Action</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">User</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">Target</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 uppercase">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">{log.createdAt ? new Date(log.createdAt).toLocaleString() : '-'}</td>
                    <td className="px-4 py-2 whitespace-nowrap font-semibold text-indigo-700">{log.action || '-'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{log.user ? <span className="font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded">{log.user.id}</span> : '-'} <span className="ml-2 text-xs text-gray-500">{log.user?.role}</span></td>
                    <td className="px-4 py-2 whitespace-nowrap">{log.target ? <span className="font-mono text-green-800 bg-green-50 px-2 py-0.5 rounded">{log.target.type}: {log.target.id}</span> : '-'}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{log.details && log.details.deletedUserEmail ? <span className="font-mono text-red-800 bg-red-50 px-2 py-0.5 rounded">{log.details.deletedUserEmail}</span> : '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-6">No logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Cards */}
      <div className="sm:hidden">
        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-1">
          {logs && logs.length > 0 ? (
            logs.map((log) => (
              <div key={log._id} className="bg-white rounded-xl shadow p-4 border border-gray-100 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>{log.createdAt ? new Date(log.createdAt).toLocaleString() : '-'}</span>
                  <span className="font-semibold text-indigo-700">{log.action || '-'}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div><span className="font-medium text-gray-700">User:</span> {log.user ? <span className="font-mono text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded">{log.user.id}</span> : '-'} <span className="ml-1 text-xs text-gray-500">{log.user?.role}</span></div>
                  <div><span className="font-medium text-gray-700">Target:</span> {log.target ? <span className="font-mono text-green-800 bg-green-50 px-1.5 py-0.5 rounded">{log.target.type}: {log.target.id}</span> : '-'}</div>
                  <div><span className="font-medium text-gray-700">Details:</span> {log.details && log.details.deletedUserEmail ? <span className="font-mono text-red-800 bg-red-50 px-1.5 py-0.5 rounded">{log.details.deletedUserEmail}</span> : '-'}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-6">No logs found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Logs;
