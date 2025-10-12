import { Users, Baby, Heart } from "lucide-react";

interface DashboardProps {
  totalPopulation: number;
}

const Dashboard = ({ totalPopulation }: DashboardProps) => {
  const stats = [
    {
      title: "Total Population",
      value: totalPopulation.toString(),
      subtitle: "Current registered residents",
      icon: Users,
      bgColor: "bg-white",
    },
    {
      title: "Births This Year",
      value: "100",
      subtitle: "New births registered",
      icon: Baby,
      bgColor: "bg-gray-200",
    },
    {
      title: "Deaths This Year",
      value: "10",
      subtitle: "Deaths recorded",
      icon: Heart,
      bgColor: "bg-gray-200",
    },
  ];

  const quickActions = [
    { title: "Update Resident Info", icon: Users },
    { title: "Register New Birth", icon: Baby },
    { title: "Record Death", icon: Heart },
  ];

  const recentActivity = [
    { title: "New birth registered", time: "2 hours ago" },
    { title: "Resident info updated", time: "5 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Population Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of Barangay New San Roque population statistics and recent
            updates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-6 border-2 border-gray-300 shadow-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {stat.title}
                </h3>
                <stat.icon className="w-8 h-8 text-gray-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-600">
                Common administrative tasks
              </p>
            </div>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <action.icon className="w-5 h-5" />
                  <span className="font-medium">{action.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
              <p className="text-sm text-gray-600">
                Latest population updates and changes
              </p>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="font-medium text-gray-900">
                      {activity.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 ml-4">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
