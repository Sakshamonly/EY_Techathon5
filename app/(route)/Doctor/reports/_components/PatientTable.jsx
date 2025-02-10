import React, { useState } from "react"
import { Search, Download, Printer } from "lucide-react"
import { patients } from "../data/mockData"
import { format } from "date-fns"

export const PatientTable = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(patient =>
    Object.values(patient).some(value =>
      value
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Logs</h2>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full p-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Disease
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map(patient => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(patient.treatmentDate), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4">{patient.location}</td>
                <td className="px-6 py-4">{patient.disease}</td>
                <td className="px-6 py-4">{patient.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
