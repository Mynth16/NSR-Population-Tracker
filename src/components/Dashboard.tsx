import { useState, useEffect } from "react";
import { Users, Baby, Heart, Home, TrendingUp, Activity, FileText, ChevronRight, User, UserCog } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

interface DashboardProps {
  totalPopulation: number;
}

interface PopulationStats {
  total_population: number;
  male_count: number;
  female_count: number;
  total_households: number;
  average_age: number;
}

interface AuditEntry {
  audit_id: number;
  record_type: 'household' | 'resident' | 'staff' | 'account';
  record_id: string;
  details: string;
  change_type: 'create' | 'update' | 'delete';
  change_date: string;
  acc_id: string | null;
  username: string | null;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Dashboard = ({ totalPopulation }: DashboardProps) => {
  const { setActivePage } = useAuthStore();
  const [stats, setStats] = useState<PopulationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentAudit, setRecentAudit] = useState<AuditEntry[]>([]);
  const [auditLoading, setAuditLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/statistics/population`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentAudit = async () => {
      try {
        const response = await fetch(`${API_URL}/api/audit-trail?limit=5`);
        if (response.ok) {
          const data = await response.json();
          setRecentAudit(data);
        }
      } catch (error) {
        console.error('Error fetching audit trail:', error);
      } finally {
        setAuditLoading(false);
      }
    };

    fetchStats();
    fetchRecentAudit();
  }, []);

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'create':
        return 'bg-green-400';
      case 'update':
        return 'bg-blue-400';
      case 'delete':
        return 'bg-mahogany-400';
      default:
        return 'bg-earth-400';
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'resident':
        return <Users className="w-4 h-4" />;
      case 'household':
        return <Home className="w-4 h-4" />;
      case 'staff':
        return <UserCog className="w-4 h-4" />;
      case 'account':
        return <User className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const statCards = [
    {
      title: "Total Population",
      value: loading ? "..." : (stats?.total_population || totalPopulation).toString(),
      subtitle: "Current registered residents",
      icon: Users,
      gradient: "from-sun-400 to-sun-500",
      bgGlow: "bg-sun-400/20",
    },
    {
      title: "Total Households",
      value: loading ? "..." : (stats?.total_households || 0).toString(),
      subtitle: "Registered households",
      icon: Home,
      gradient: "from-forest-500 to-forest-600",
      bgGlow: "bg-forest-400/20",
    },
    {
      title: "Male Population",
      value: loading ? "..." : (stats?.male_count || 0).toString(),
      subtitle: "Male residents",
      icon: Users,
      gradient: "from-earth-500 to-earth-600",
      bgGlow: "bg-earth-400/20",
    },
    {
      title: "Female Population",
      value: loading ? "..." : (stats?.female_count || 0).toString(),
      subtitle: "Female residents",
      icon: Users,
      gradient: "from-mahogany-500 to-mahogany-600",
      bgGlow: "bg-mahogany-400/20",
    },
  ];

  const quickActions = [
    { title: "Update Resident Info", icon: Users, description: "Modify existing records" },
    { title: "Register New Birth", icon: Baby, description: "Add newborn to registry" },
    { title: "Record Death", icon: Heart, description: "Update death records" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-earth-100 to-forest-50">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-sun-200/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-forest-200/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-600 to-forest-700 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest-950 font-display">
                Population Dashboard
              </h1>
              <p className="text-earth-600 font-body">
                Overview of Barangay New San Roque population statistics
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="group relative animate-fade-in-up"
            >
              <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Background glow */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${stat.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-sm font-semibold text-earth-600 uppercase tracking-wide">
                      {stat.title}
                    </h3>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-forest-950 mb-1 font-display">
                    {stat.value}
                  </div>
                  <p className="text-sm text-earth-500">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="animate-fade-in-left">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-sun-500" />
                <div>
                  <h2 className="text-xl font-bold text-forest-950 font-display">Quick Actions</h2>
                  <p className="text-sm text-earth-500">Common administrative tasks</p>
                </div>
              </div>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    className="group w-full flex items-center gap-4 px-4 py-4 bg-gradient-to-r from-forest-800 to-forest-700 hover:from-forest-700 hover:to-forest-600 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold block">{action.title}</span>
                      <span className="text-xs text-forest-200">{action.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="animate-fade-in-right">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-forest-500 animate-pulse"></div>
                  <div>
                    <h2 className="text-xl font-bold text-forest-950 font-display">Recent Activity</h2>
                    <p className="text-sm text-earth-500">Latest system changes</p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePage('audit-trail')}
                  className="flex items-center gap-1 text-sm text-forest-600 hover:text-forest-800 font-medium transition-colors"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {auditLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <svg className="animate-spin h-6 w-6 text-forest-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                ) : recentAudit.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-10 h-10 text-earth-300 mx-auto mb-2" />
                    <p className="text-earth-400 text-sm">No recent activity</p>
                  </div>
                ) : (
                  recentAudit.map((entry) => (
                    <div key={entry.audit_id} className="flex items-start gap-3 p-3 rounded-xl bg-forest-50/50 border border-forest-100 hover:bg-forest-50 transition-colors">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${getChangeTypeColor(entry.change_type)}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-earth-500">
                            {getRecordTypeIcon(entry.record_type)}
                          </span>
                          <span className="text-xs font-medium text-earth-500 capitalize">
                            {entry.record_type} {entry.change_type}d
                          </span>
                        </div>
                        <p className="text-sm font-medium text-forest-900 truncate" title={entry.details}>
                          {entry.details.length > 60 ? entry.details.substring(0, 60) + '...' : entry.details}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-earth-400">
                          <span>{entry.username || 'System'}</span>
                          <span>•</span>
                          <span>{getRelativeTime(entry.change_date)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
