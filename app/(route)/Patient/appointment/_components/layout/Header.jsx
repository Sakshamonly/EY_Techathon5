import React from 'react';
import { Bell, User, Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="relative rounded-lg p-[2px] bg-gradient-to-r from-#4FA3D9 via-#7CBAE6 to-#FFB5A6 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-#4FA3D9" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from- #4FA3D9 to-#7CBAE6 bg-clip-text text-transparent">
              HealthCare
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-600 hover:text-gray-800 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-#FF9B9B text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            
            <div className="flex items-center gap-4 bg-white/50 px-4 py-2 rounded-full shadow-sm">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Patient ID: P-12345</p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border- #4FA3D9 hover:border-#7CBAE6 transition-colors"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}