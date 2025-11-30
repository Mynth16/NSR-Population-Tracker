import { useState, useEffect } from "react";
import { Search, Home } from "lucide-react";
<<<<<<< HEAD
=======
import { createClient } from "@supabase/supabase-js";
>>>>>>> ca6041d1196d37de543c86ff8c5d78631d5147c8

interface Household {
  household_id: string;
  zone_num: number;
  house_num: string;
  address: string;
  status: string;
<<<<<<< HEAD
  head_resident_id?: string;
  resident_count?: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

=======
  resident_count?: number;
}

>>>>>>> ca6041d1196d37de543c86ff8c5d78631d5147c8
const HouseholdsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [households, setHouseholds] = useState<Household[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(`${API_URL}/api/households?status=active`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch households');
        }
        
        const data = await response.json();
        setHouseholds(data);
      } catch (err) {
        console.error("Error fetching households:", err);
        setError("Failed to load households. Make sure the backend server is running.");
=======
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          setError("Supabase configuration is missing");
          setLoading(false);
          return;
        }

        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error: fetchError } = await supabase
          .from("households")
          .select("*")
          .eq("status", "active")
          .order("zone_num", { ascending: true });

        if (fetchError) throw fetchError;
        setHouseholds(data || []);
      } catch (err) {
        console.error("Error fetching households:", err);
        setError("Failed to load households");
>>>>>>> ca6041d1196d37de543c86ff8c5d78631d5147c8
      } finally {
        setLoading(false);
      }
    };

    fetchHouseholds();
  }, []);

  const filteredHouseholds = households.filter(
    (household) =>
      household.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      household.house_num.toLowerCase().includes(searchTerm.toLowerCase()) ||
      household.zone_num.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Households</h1>
          <p className="text-gray-600">Manage and view all registered households</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-300 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by address, house number, or zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <Home className="w-5 h-5" />
              <span>Add Household</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading households...</p>
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
                      Zone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      House Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHouseholds.map((household) => (
                    <tr
                      key={household.household_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        Zone {household.zone_num}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {household.house_num}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {household.address}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {household.status.charAt(0).toUpperCase() +
                            household.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!loading && !error && filteredHouseholds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No households found matching your search.
              </p>
            </div>
          )}
        </div>

        {!loading && !error && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredHouseholds.length} of {households.length} households
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseholdsTable;
