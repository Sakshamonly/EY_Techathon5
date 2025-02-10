"use client";

import React, { useState } from 'react';
import { Users, Calendar as CalendarIcon, FileText, MessageSquare, Package, AlertTriangle, BarChart, Activity, PieChart, MapPin, Search, Bell, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const patientData = {
  totalPatients: 1234,
  weeklyGrowth: 5.2,
  appointments: [
    { id: 1, time: '09:00', patient: 'John Doe', type: 'Check-up', village: 'North Village' },
    { id: 2, time: '10:30', patient: 'Jane Smith', type: 'Follow-up', village: 'South Village' },
    { id: 3, time: '14:00', patient: 'Mike Johnson', type: 'Vaccination', village: 'East Village' },
    { id: 4, time: '15:30', patient: 'Sarah Williams', type: 'Prenatal Care', village: 'West Village' },
    { id: 5, time: '16:00', patient: 'Robert Brown', type: 'General', village: 'North Village' },
  ]
};

const messages = [
  { id: 1, sender: 'Dr. Smith', content: 'Need assistance with patient in North Village - urgent case', time: '10:30 AM', read: false },
  { id: 2, sender: 'Nurse Johnson', content: 'Vaccine stock running low in East Village clinic', time: '09:15 AM', read: false },
  { id: 3, sender: 'Admin', content: 'Monthly report due tomorrow - please update patient records', time: 'Yesterday', read: true }
];

const supplies = [
  { name: 'Basic Medicines Kit', stock: 80, critical: 20, lastUpdated: '2024-03-10' },
  { name: 'Vaccines', stock: 30, critical: 40, lastUpdated: '2024-03-09' },
  { name: 'First Aid Supplies', stock: 45, critical: 30, lastUpdated: '2024-03-08' },
  { name: 'Clean Water (L)', stock: 15, critical: 25, lastUpdated: '2024-03-07' }
];

const villageData = {
  villages: [
    { name: 'North Village', patients: 245, distance: '5km', lastVisit: '2 days ago', activePatients: 45 },
    { name: 'South Village', patients: 189, distance: '8km', lastVisit: '1 week ago', activePatients: 32 },
    { name: 'East Village', patients: 156, distance: '12km', lastVisit: 'Yesterday', activePatients: 28 },
    { name: 'West Village', patients: 203, distance: '15km', lastVisit: '3 days ago', activePatients: 37 }
  ],
  weeklyVisits: [60, 45, 75, 50, 65, 40, 55],
  commonDiseases: [
    { name: 'Respiratory Issues', percentage: 30 },
    { name: 'Waterborne Disease', percentage: 25 },
    { name: 'Maternal Care', percentage: 20 },
    { name: 'Child Health', percentage: 15 },
    { name: 'Others', percentage: 10 }
  ],
  treatmentSuccess: 94
};

function MetricsCard({ title, value, trend, icon, onClick, color = 'blue' }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer relative overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`} />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <motion.h3 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className={`text-2xl font-bold mt-2 text-${color}-600`}
          >
            {value}
          </motion.h3>
        </div>
        <div className={`p-2 bg-${color}-50 rounded-lg`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(trend)}% from last week
          </span>
        </div>
      )}
    </motion.div>
  );
}

function App() {
  const patients = [
    { name: 'Emma Wilson', id: 'PT-2024-001', lastVisit: '2024-03-10', status: 'Stable' },
    { name: 'James Brown', id: 'PT-2024-002', lastVisit: '2024-03-09', status: 'Follow-up' },
    { name: 'Sarah Davis', id: 'PT-2024-003', lastVisit: '2024-03-08', status: 'Critical' },
  ];
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isSupplyModalOpen, setSupplyModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">Good morning, Dr. Sarah</h1>
            <p className="text-gray-600">You have {patientData.appointments.length} appointments today</p>
          </div>
          
          <div className="flex items-center gap-6 flex-1 justify-center">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search patients, appointments..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setMessageModalOpen(true)}
            >
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {messages.filter(m => !m.read).length}
              </span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
                alt="Doctor profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </header> */}

      <main className="container mx-auto px-4">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Patients"
            value={patientData.totalPatients}
            trend={5.2}
            icon={<Users className="h-6 w-6 text-blue-500" />}
            color="blue"
          />
          <MetricsCard
            title="Today's Appointments"
            value={patientData.appointments.length}
            icon={<CalendarIcon className="h-6 w-6 text-green-500" />}
            onClick={() => setCalendarModalOpen(true)}
            color="green"
          />
          <MetricsCard
            title="Pending Prescriptions"
            value="12"
            icon={<FileText className="h-6 w-6 text-yellow-500" />}
            color="yellow"
          />
          <MetricsCard
            title="Unread Messages"
            value={messages.filter(m => !m.read).length}
            icon={<MessageSquare className="h-6 w-6 text-purple-500" />}
            onClick={() => setMessageModalOpen(true)}
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Village Visits Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Village Visits</h3>
                  <BarChart className="h-5 w-5 text-gray-500" />
                </div>
                <div className="h-48 flex items-end justify-between gap-2">
                  {villageData.weeklyVisits.map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="w-full group relative"
                    >
                      <div className="bg-blue-500 rounded-t group-hover:bg-blue-600 transition-colors h-full">
                        <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 
                          bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 
                          group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {height} visits
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <span key={index}>{day}</span>
                  ))}
                </div>
              </div>

              {/* Treatment Success Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Treatment Success</h3>
                  <Activity className="h-5 w-5 text-gray-500" />
                </div>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 * (1 - villageData.treatmentSuccess / 100) }}
                      transition={{ duration: 2 }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-blue-600">{villageData.treatmentSuccess}%</span>
                      <span className="text-sm text-gray-500">Recovery Rate</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Common Cases Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Common Cases</h3>
                  <PieChart className="h-5 w-5 text-gray-500" />
                </div>
                <div className="space-y-4">
                  {villageData.commonDiseases.map((disease, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{disease.name}</span>
                        <span className="font-medium">{disease.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${disease.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-blue-500 rounded-full h-2"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Village Coverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-semibold text-gray-800">Village Coverage</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {villageData.villages.map((village, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">{village.name}</span>
                        <span className="text-sm text-gray-500">{village.distance}</span>
                      </div>
                      <div className="grid grid-cols-2 text-sm text-gray-600 gap-2">
                        <div>
                          <span className="text-gray-500">Total Patients:</span>
                          <span className="ml-1 font-medium">{village.patients}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Active:</span>
                          <span className="ml-1 font-medium">{village.activePatients}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Last visit:</span>
                          <span className="ml-1 text-blue-600">{village.lastVisit}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3">Name</th>
              <th className="pb-3">ID</th>
              <th className="pb-3">Last Visit</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-3 font-medium text-gray-800">{patient.name}</td>
                <td className="py-3 text-gray-600">{patient.id}</td>
                <td className="py-3 text-gray-600">{patient.lastVisit}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${patient.status === 'Critical' ? 'bg-red-100 text-red-700' :
                      patient.status === 'Stable' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
              {/* Resource Stock */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-800">Resource Stock</h2>
                  </div>
                  <button 
                    onClick={() => setSupplyModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Request Supplies
                  </button>
                </div>
                <div className="space-y-4">
                  {supplies.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <div className="flex items-center gap-2">
                          {item.stock < item.critical && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            item.stock < item.critical ? 'text-red-500' : 'text-gray-700'
                          }`}>{item.stock}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.stock}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`rounded-full h-2 ${
                            item.stock < item.critical ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        />
                      </div>
                      <div className="text-xs text-gray-400">
                        Last updated: {item.lastUpdated}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
                </div>
                <button 
                  onClick={() => setCalendarModalOpen(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Full Calendar
                </button>
              </div>
              <div className="space-y-4">
                {patientData.appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-16 text-sm font-medium text-gray-600">{apt.time}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{apt.patient}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">{apt.type}</p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-sm text-gray-500">{apt.village}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </main>

      {/* Modals */}
      <AnimatePresence>
        {isMessageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setMessageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-lg m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Messages</h2>
                <button onClick={() => setMessageModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg ${message.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-sm text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-gray-600">{message.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {isSupplyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSupplyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-lg m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Request Supplies</h2>
                <button onClick={() => setSupplyModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supply Item
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSupplyModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {isCalendarModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setCalendarModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Calendar</h2>
                <button onClick={() => setCalendarModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Calendar content */}
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-lg text-center cursor-pointer hover:bg-gray-50"
                  >
                    <span className="block font-medium">{day}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

