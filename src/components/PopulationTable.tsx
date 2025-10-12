import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

interface Resident {
  id: number;
  name: string;
  age: number;
  gender: string;
  civilStatus: string;
}

const PopulationTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const residents: Resident[] = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      age: 35,
      gender: "Male",
      civilStatus: "Married",
    },
    {
      id: 2,
      name: "Maria Santos",
      age: 28,
      gender: "Female",
      civilStatus: "Single",
    },
    {
      id: 3,
      name: "Pedro Reyes",
      age: 45,
      gender: "Male",
      civilStatus: "Married",
    },
    {
      id: 4,
      name: "Ana Garcia",
      age: 32,
      gender: "Female",
      civilStatus: "Married",
    },
    {
      id: 5,
      name: "Carlos Mendoza",
      age: 52,
      gender: "Male",
      civilStatus: "Widowed",
    },
    {
      id: 6,
      name: "Rosa Flores",
      age: 24,
      gender: "Female",
      civilStatus: "Single",
    },
    {
      id: 7,
      name: "Miguel Torres",
      age: 41,
      gender: "Male",
      civilStatus: "Married",
    },
    {
      id: 8,
      name: "Elena Ramos",
      age: 29,
      gender: "Female",
      civilStatus: "Single",
    },
    {
      id: 9,
      name: "Ricardo Cruz",
      age: 38,
      gender: "Male",
      civilStatus: "Married",
    },
    {
      id: 10,
      name: "Sofia Hernandez",
      age: 33,
      gender: "Female",
      civilStatus: "Married",
    },
  ];

  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.civilStatus.toLowerCase().includes(searchTerm.toLowerCase())
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
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Civil Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredResidents.map((resident) => (
                  <tr
                    key={resident.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {resident.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {resident.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {resident.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {resident.civilStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredResidents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No residents found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredResidents.length} of {residents.length} residents
        </div>
      </div>
    </div>
  );
};

export default PopulationTable;
