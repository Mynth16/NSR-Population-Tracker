import { useState, useEffect } from "react";
import { Search, UserPlus } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface Resident {
  resident_id: string;
  first_name: string;
  last_name: string;
  civil_status: string;
  gender: string;
  birth_date: string;
}

const PopulationTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          setError("Supabase configuration is missing");
          setLoading(false);
          return;
        }

        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error: fetchError } = await supabase
          .from("residents")
          .select("resident_id, first_name, last_name, civil_status, gender, birth_date")
          .eq("status", "active");

        if (fetchError) throw fetchError;
        setResidents(data || []);
      } catch (err) {
        console.error("Error fetching residents:", err);
        setError("Failed to load residents");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  const filteredResidents = residents.filter(
    (resident) =>
      `${resident.first_name} ${resident.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      resident.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.civil_status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Population</h1>
          <p className="text-gray-600">
            Manage and view all registered residents
          </p>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search residents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <UserPlus className="w-5 h-5" />
              <span>Add Resident</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading residents...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      First Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Last Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Civil Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Gender
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Birth Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredResidents.map((resident) => (
                    <tr
                      key={resident.resident_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {resident.first_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {resident.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                        {resident.civil_status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                        {resident.gender}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(resident.birth_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!loading && !error && filteredResidents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No residents found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredResidents.length} of {residents.length} residents
          </div>
        )}
      </div>
    </div>
  );
};

export default PopulationTable;
