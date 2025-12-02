import { useState, useEffect } from "react";
import { Search, FileText, Filter, RefreshCw, User, Home, Users, UserCog } from "lucide-react";

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

const AuditTrail = () => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterChangeType, setFilterChangeType] = useState<string>("all");
  const [limit, setLimit] = useState(50);

  const fetchAuditTrail = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/api/audit-trail?limit=${limit}`;
      if (filterType !== "all") {
        url += `&record_type=${filterType}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch audit trail');
      }
      
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      console.error("Error fetching audit trail:", err);
      setError("Failed to load audit trail. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditTrail();
  }, [filterType, limit]);

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

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'resident':
        return 'bg-blue-100 text-blue-700';
      case 'household':
        return 'bg-forest-100 text-forest-700';
      case 'staff':
        return 'bg-purple-100 text-purple-700';
      case 'account':
        return 'bg-sun-100 text-sun-700';
      default:
        return 'bg-earth-100 text-earth-700';
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'create':
        return 'bg-green-100 text-green-700';
      case 'update':
        return 'bg-blue-100 text-blue-700';
      case 'delete':
        return 'bg-mahogany-100 text-mahogany-700';
      default:
        return 'bg-earth-100 text-earth-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

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
    return formatDate(dateString);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = 
      entry.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.record_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChangeType = filterChangeType === "all" || entry.change_type === filterChangeType;
    
    return matchesSearch && matchesChangeType;
  });

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest-950 font-display">Audit Trail</h1>
              <p className="text-earth-600 font-body">Track all changes made to the system</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-forest-100 shadow-sm mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
              <input
                type="text"
                placeholder="Search by details, username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all placeholder:text-earth-400"
              />
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-earth-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="resident">Residents</option>
                  <option value="household">Households</option>
                  <option value="staff">Staff</option>
                  <option value="account">Accounts</option>
                </select>
              </div>

              <select
                value={filterChangeType}
                onChange={(e) => setFilterChangeType(e.target.value)}
                className="px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all text-sm"
              >
                <option value="all">All Actions</option>
                <option value="create">Created</option>
                <option value="update">Updated</option>
                <option value="delete">Deleted</option>
              </select>

              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="px-4 py-2.5 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all text-sm"
              >
                <option value={25}>Last 25</option>
                <option value={50}>Last 50</option>
                <option value={100}>Last 100</option>
                <option value={200}>Last 200</option>
              </select>

              <button
                onClick={fetchAuditTrail}
                className="flex items-center gap-2 px-4 py-2.5 bg-forest-600 hover:bg-forest-500 text-white rounded-xl transition-colors text-sm font-medium"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Audit Trail List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-forest-100 shadow-sm overflow-hidden animate-fade-in-up">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3">
                <svg className="animate-spin h-6 w-6 text-forest-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-earth-600 font-medium">Loading audit trail...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-mahogany-600 font-medium">{error}</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-earth-300 mx-auto mb-4" />
              <p className="text-earth-500 font-medium">No audit trail entries found</p>
              <p className="text-earth-400 text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="divide-y divide-earth-100">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.audit_id}
                  className="p-5 hover:bg-forest-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getRecordTypeColor(entry.record_type)}`}>
                      {getRecordTypeIcon(entry.record_type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRecordTypeColor(entry.record_type)}`}>
                          {entry.record_type}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getChangeTypeColor(entry.change_type)}`}>
                          {entry.change_type}
                        </span>
                        <span className="text-xs text-earth-400">
                          ID: {entry.record_id}
                        </span>
                      </div>
                      
                      <p className="text-forest-900 font-medium mb-1 break-words">
                        {entry.details}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-earth-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {entry.username || 'System'}
                        </span>
                        <span>•</span>
                        <span title={formatDate(entry.change_date)}>
                          {getRelativeTime(entry.change_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className="mt-6 text-sm text-earth-600 font-medium">
            Showing {filteredEntries.length} of {entries.length} entries
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;
