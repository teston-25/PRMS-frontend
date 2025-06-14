import {
  UsersIcon,
  UserGroupIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const stats = [
    {
      label: "Active Users",
      value: "1472",
      color: "bg-blue-500",
      change: "+12%",
      icon: UsersIcon,
    },
    {
      label: "Total Patients",
      value: "1432",
      color: "bg-green-500",
      change: "+8%",
      icon: UserGroupIcon,
    },
    {
      label: "Total Appointments",
      value: "5472",
      color: "bg-purple-500",
      change: "+23%",
      icon: CalendarIcon,
    },
    {
      label: "Total Users",
      value: "6432",
      color: "bg-orange-500",
      change: "+15%",
      icon: UserCircleIcon,
    },
  ];

  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Patient Applications
        </h3>
        <div className="space-y-4">
          {[
            { name: "John Adams", gender: "Male", age: 33 },
            { name: "Mary Adams", gender: "Female", age: 17 },
            { name: "Ronda Rousy", gender: "Female", age: 24 },
          ].map((patient, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border border-gray-100 rounded-xl p-3"
            >
              <div>
                <p className="font-semibold text-gray-800">{patient.name}</p>
                <p className="text-sm text-gray-500">
                  {patient.gender}, {patient.age} yrs
                </p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
