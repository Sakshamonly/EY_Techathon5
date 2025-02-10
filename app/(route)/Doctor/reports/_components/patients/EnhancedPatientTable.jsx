import React, { useState } from "react"
import { Search, Download, Printer, Filter } from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"

const patients = [
  {
    id: "1",
    name: "John Doe",
    treatmentDate: "2024-03-10",
    location: "New York City",
    disease: "Influenza",
    remarks: "Prescribed antiviral medication"
  }
  // Add more mock data
]

export const EnhancedPatientTable = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)

  const filteredPatients = patients.filter(patient =>
    Object.values(patient).some(value =>
      value
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  )

  const handleExport = patient => {
    // Implementation for exporting patient data
    console.log("Exporting data for:", patient.name)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Logs</h2>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full p-2 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map(patient => (
              <motion.tr
                key={patient.id}
                className="hover:bg-gray-50 cursor-pointer"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedPatient(patient)}
              >
                <td className="px-6 py-4">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(patient.treatmentDate), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4">{patient.location}</td>
                <td className="px-6 py-4">{patient.disease}</td>
                <td className="px-6 py-4">{patient.remarks}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleExport(patient)
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Export
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
