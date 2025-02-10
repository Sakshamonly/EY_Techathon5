"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Bell, X, CircleDot, Settings, UserPlus, Calendar, 
  FileText, ChevronDown, User, Sliders, Shield, Share2, Database, 
  HelpCircle, ExternalLink, LogOut, Menu 
} from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const mockNotifications = [
  {
    id: 1,
    patientName: "John Doe",
    condition: "Severe Chest Pain",
    timeAgo: "5 minutes ago",
    riskLevel: "high",
    status: "unread",
    roomNumber: "204"
  },
  {
    id: 2,
    patientName: "Sarah Smith",
    condition: "Elevated Blood Pressure",
    timeAgo: "15 minutes ago",
    riskLevel: "medium",
    status: "unread",
    roomNumber: "156"
  },
  {
    id: 3,
    patientName: "Mike Johnson",
    condition: "Post-Surgery Recovery",
    timeAgo: "1 hour ago",
    riskLevel: "low",
    status: "read",
    roomNumber: "302"
  }
];

export function TopBar({ activeSection }) {
  const router = useRouter(); // Initialize the router
  

  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleDropdownToggle = (dropdown) => {
    if (dropdown === 'notifications') {
      setShowNotifications(!showNotifications);
      setShowSettings(false);
      setShowAddMenu(false);
      setShowMobileMenu(false);
    } else if (dropdown === 'settings') {
      setShowSettings(!showSettings);
      setShowNotifications(false);
      setShowAddMenu(false);
      setShowMobileMenu(false);
    } else if (dropdown === 'add') {
      setShowAddMenu(!showAddMenu);
      setShowNotifications(false);
      setShowSettings(false);
      setShowMobileMenu(false);
    } else if (dropdown === 'mobile') {
      setShowMobileMenu(!showMobileMenu);
      setShowNotifications(false);
      setShowSettings(false);
      setShowAddMenu(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    const colors = {
      high: 'bg-red-50 border-l-4 border-red-500',
      medium: 'bg-yellow-50 border-l-4 border-yellow-500',
      low: 'bg-green-50 border-l-4 border-green-500'
    };
    return colors[riskLevel] || 'bg-gray-50';
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, status: 'read' } : notif
    ));
  };

  const getUnreadCount = () => {
    return notifications.filter(n => n.status === 'unread').length;
  };

  const handleNavigation = (path) => {
    setShowAddMenu(false);
    setShowMobileMenu(false);
    router.push(path); // Use
  };

  const handleSettingsNavigation = (path) => {
    setShowSettings(false);
    setShowMobileMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isOutsideClick = !e.target.closest('.dropdown-menu');
      if (isOutsideClick) {
        setShowSettings(false);
        setShowAddMenu(false);
        setShowNotifications(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative h-16 bg-white border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section with logo and mobile menu button */}
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 mr-2 hover:bg-gray-100 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('mobile');
              }}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div className="text-2xl font-bold ml-[0.35rem]">{activeSection}</div>
          </div>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for anything here..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <div className="relative dropdown-menu">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 flex items-center gap-2 
                  transition-all duration-200 text-sm h-9"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle('add');
                }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">Add</span>
              </button>

              {showAddMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50
                  animate-in fade-in slide-in-from-top-5 duration-200">
                  <div className="p-2">
                    {[
                      { icon: UserPlus, title: 'New Patient', desc: 'Register a new patient', path: '/new-patient' },
                      { icon: Calendar, title: 'Schedule Appointment', desc: 'Book a new appointment', path: '/schedule-appointment' },
                      { icon: FileText, title: 'New Prescription', desc: 'Create a prescription', path: '/Doctor/diagnosis' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        className="w-full p-2 text-left rounded-lg hover:bg-gray-50 flex items-center gap-3 group"
                      >
                        <div className={`p-2 rounded-lg bg-${item.color}-50 group-hover:bg-${item.color}-100 transition-colors duration-200`}>
                          <item.icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative dropdown-menu">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle('notifications');
                }}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 
                    flex items-center justify-center">
                    {getUnreadCount()}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg border border-gray-100 z-50
                  animate-in fade-in slide-in-from-top-5 duration-200">
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="font-semibold">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                  <div className="max-h-[480px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 ${getRiskColor(notification.riskLevel)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{notification.patientName}</span>
                              <span className="text-sm text-gray-500">Room {notification.roomNumber}</span>
                              {notification.status === 'unread' && (
                                <CircleDot className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.condition}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{notification.timeAgo}</span>
                              {notification.status === 'unread' && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <button className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg
                            transition-all duration-200">
                            Respond
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="relative dropdown-menu">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle('settings');
                }}
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>

              {showSettings && (
                <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50
                  transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-lg">Settings</h3>
                    <p className="text-sm text-gray-500">Manage your preferences</p>
                  </div>

                  <div className="p-2">
                    {[
                      { icon: User, color: 'blue', title: 'Profile Settings', desc: 'Manage your account' },
                      { icon: Shield, color: 'green', title: 'Privacy & Security', desc: 'Security settings' },
                      { icon: Sliders, color: 'purple', title: 'Preferences', desc: 'Customize your experience' },
                      { icon: Share2, color: 'orange', title: 'Integrations', desc: 'Connected apps' },
                      { icon: Database, color: 'cyan', title: 'Data Management', desc: 'Manage your data' },
                      { icon: HelpCircle, color: 'yellow', title: 'Help & Support', desc: 'Get assistance' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSettingsNavigation(`/settings/${item.title.toLowerCase()}`)}
                        className="w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors duration-200
                          flex items-center gap-3 group"
                      >
                        <div className={`p-2 rounded-lg bg-${item.color}-50 group-hover:bg-${item.color}-100 
                          transition-colors duration-200`}>
                          <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </button>
                    ))}

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => handleSettingsNavigation('/logout')}
                        className="w-full p-2 text-left text-red-600 hover:bg-red-50 rounded-lg
                          transition-colors duration-200 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile - Text hidden on mobile */}
            <div className="flex items-center gap-3 ml-2">
              <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="relative">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    DS
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-medium text-sm">Darrell Steward</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search - Only shown on mobile */}
        <div className="md:hidden -mt-2 pb-2 px-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="text-lg font-semibold">Menu</div>
                  <button 
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    {/* Mobile Menu Items */}
                    {[
                      { icon: User, title: 'Profile', color: 'blue' },
                      { icon: Calendar, title: 'Appointments', color: 'purple' },
                      { icon: FileText, title: 'Documents', color: 'green' },
                      { icon: Database, title: 'Records', color: 'cyan' },
                      { icon: Settings, title: 'Settings', color: 'gray' },
                      { icon: HelpCircle, title: 'Help', color: 'yellow' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(`/${item.title.toLowerCase()}`)}
                        className="w-full mb-2 p-3 text-left rounded-lg hover:bg-gray-50 flex items-center gap-3"
                      >
                        <div className={`p-2 rounded-lg bg-${item.color}-50`}>
                          <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100">
                  <button
                    onClick={() => handleSettingsNavigation('/logout')}
                    className="w-full p-3 text-left text-red-600 hover:bg-red-50 rounded-lg
                      flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-red-50">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;