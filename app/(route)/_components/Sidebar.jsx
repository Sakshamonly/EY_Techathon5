"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import {
  Calendar,
  Users,
  MessageSquare,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Layout,
  Clock,
  FileText,
  Settings,
  Building2,
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed, onSidebarClick }) => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState("/Doctor/dashboard"); // Active state for selected menu
  const router = useRouter(); // Initialize useRouter

  const BASE_PATH = "/Doctor";

  const menuSections = [
    {
      label: "MAIN",
      items: [
        { icon: Layout, text: "Dashboard", path: `${BASE_PATH}/dashboard` },
        // { icon: Calendar, text: "Calendar", path: `${BASE_PATH}/calendar` },
      ],
    },
    {
      label: "PATIENT CARE",
      items: [
        { icon: Users, text: "Patient List", path: `${BASE_PATH}/patients` },
        { icon: Clock, text: "Appointments", path: `${BASE_PATH}/appointments` },
        { icon: MessageSquare, text: "Messaging", path: `${BASE_PATH}/messaging` },
      ],
    },
    {
      label: "MANAGEMENT",
      items: [
        { icon: BarChart2, text: "Reports", path: `${BASE_PATH}/reports` },
        { icon: FileText, text: "Documents", path: `${BASE_PATH}/documents` },
        { icon: Settings, text: "Settings", path: `${BASE_PATH}/settings` },
      ],
    },
  ];

  const handleNavigation = (path, sectionName) => {
    setActivePath(path); // Update active state
    onSidebarClick(sectionName); // Pass section name to TopBar
    router.push(path); // Navigate to the selected path
  };

    return (
      <div
        className={`
          bg-gradient-to-b from-white to-gray-50
          border-r border-gray-200 shadow-sm
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-72"}
          h-screen relative
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white border border-gray-200 
            rounded-full p-1.5 hover:bg-blue-50 hover:border-blue-100
            transition-colors z-10 shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-blue-600" />
          )}
        </button>

      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2 shadow-sm">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span
            className={`
            font-bold text-gray-900 text-lg transition-opacity duration-300 whitespace-nowrap
            ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}
          `}
          >
            Medicare
          </span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex-shrink-0 shadow-sm" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div
            className={`
            transition-opacity duration-300
            ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}
          `}
          >
            <div className="text-sm font-semibold text-gray-900">Medical Center</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="p-4 space-y-6">
        {menuSections.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            {/* Section Label */}
            <div
              className={`
              text-xs font-semibold text-gray-400 mb-3 px-4
              transition-opacity duration-300
              ${isCollapsed ? "opacity-0 h-0 mb-0" : "opacity-100"}
            `}
            >
              {section.label}
            </div>

            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
                    transition-all duration-200 ease-in-out group
                    ${
                      activePath === item.path
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "hover:bg-gray-100 hover:shadow-sm"
                    }
                  `}
                  onClick={() => handleNavigation(item.path, item.text)}
                >
                  <div
                    className={`
                    p-2 rounded-lg transition-colors
                    ${
                      activePath === item.path
                        ? "bg-blue-100/80"
                        : "bg-gray-100/50 group-hover:bg-gray-100"
                    }
                  `}
                  >
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        activePath !== item.path &&
                        "text-gray-600 group-hover:text-gray-900"
                      }`}
                    />
                  </div>
                  <span
                    className={`
                    text-sm font-medium whitespace-nowrap transition-all duration-300
                    ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}
                    ${
                      activePath !== item.path &&
                      "text-gray-600 group-hover:text-gray-900"
                    }
                  `}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
