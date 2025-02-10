import React from 'react';
import { Bell, Calendar, FileText, Users, PlusCircle, Activity, Search } from 'lucide-react';
import StatsPanel from './StatsPanel';
import PatientQueue from './PatientQueue';
import ActivityFeed from './ActivityFeed';
import QuickActions from './QuickActions';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medical Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, Dr. Smith</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-6 h-6" />
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                DS
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <StatsPanel />
            <PatientQueue />
            <ActivityFeed />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <QuickActions />
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
              <div className="space-y-4">
                {['ICU', 'Emergency Room', 'Pharmacy'].map((dept) => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-gray-600">{dept}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Call Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}