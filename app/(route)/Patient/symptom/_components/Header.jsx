import React from 'react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-white mr-3" />
          <div>
            <h1 className="text-3xl font-bold">AI Symptom Tracker</h1>
            <p className="text-blue-100 mt-1">Track, analyze, and understand your health patterns</p>
          </div>
        </div>
      </div>
    </header>
  );
}