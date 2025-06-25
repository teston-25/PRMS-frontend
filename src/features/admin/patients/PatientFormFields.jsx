import BackButton from "../../../components/common/BackButton";

const PatientFormFields = ({ formData, setFormData, readOnly = false }) => {
  const handleChange = (e) => {
    if (!readOnly) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-6">
      <BackButton className="mb-4" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            readOnly={readOnly}
            required
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            readOnly={readOnly}
            required
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            disabled={readOnly}
            required
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth *
          </label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={
              formData.dob
                ? new Date(formData.dob).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            readOnly={readOnly}
            required
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          />{" "}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            readOnly={readOnly}
            required
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            readOnly={readOnly}
            required
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          />
        </div>

        {/* Address - Full width */}
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            readOnly={readOnly}
            rows={3}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            } p-2 border`}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientFormFields;
