import React, { useState } from "react"
import {
  Settings,
  UserCircle,
  Shield,
  Sliders,
  Share2,
  Database,
  HelpCircle,
  LogOut,
  Upload,
  Save,
  Plus,
  X,
  AlertTriangle
} from "lucide-react"
import Toast from "./Toast"
import Modal from "./Modal"

const SettingsLayout = () => {
  const [activeSection, setActiveSection] = React.useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", content: null })
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    age: "45",
    specialization: "Cardiologist",
    experience: "15 years",
    license: "MD12345",
    hospital: "City General Hospital",
    address: "123 Medical Center Dr, City, State",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  })

  const [connectedApps] = useState([
    { id: 1, name: "Electronic Health Records", icon: Database },
    { id: 2, name: "Appointment Scheduler", icon: Settings },
    { id: 3, name: "Medical Billing System", icon: Shield }
  ])

  const handlePhotoChange = e => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveChanges = () => {
    setShowToast(true)
    setToastMessage("Changes saved successfully!")
    setTimeout(() => setShowToast(false), 3000)
  }

  const handlePasswordChange = () => {
    setModalContent({
      title: "Change Password",
      content: (
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            onClick={() => {
              setShowModal(false)
              setShowToast(true)
              setToastMessage("Password updated successfully!")
            }}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update Password
          </button>
        </div>
      )
    })
    setShowModal(true)
  }

  const handleSignOut = () => {
    setModalContent({
      title: "Sign Out",
      content: (
        <div className="space-y-4">
          <p>Are you sure you want to sign out?</p>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setShowToast(true)
                setToastMessage("Signed out successfully!")
                setShowModal(false)
                // Add actual sign out logic here
              }}
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Yes, Sign Out
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )
    })
    setShowModal(true)
  }

  const sections = [
    {
      id: "profile",
      title: "Profile Settings",
      icon: UserCircle,
      description: "Manage your personal information and account details",
      content: (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profileData.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform hover:scale-105"
              />
              <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4 text-white" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePhotoChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={e =>
                  setProfileData(prev => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={e =>
                  setProfileData(prev => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={e =>
                  setProfileData(prev => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                value={profileData.age}
                onChange={e =>
                  setProfileData(prev => ({ ...prev, age: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                value={profileData.specialization}
                onChange={e =>
                  setProfileData(prev => ({
                    ...prev,
                    specialization: e.target.value
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="text"
                value={profileData.experience}
                onChange={e =>
                  setProfileData(prev => ({
                    ...prev,
                    experience: e.target.value
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                License Number
              </label>
              <input
                type="text"
                value={profileData.license}
                onChange={e =>
                  setProfileData(prev => ({ ...prev, license: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Hospital/Clinic
              </label>
              <input
                type="text"
                value={profileData.hospital}
                onChange={e =>
                  setProfileData(prev => ({
                    ...prev,
                    hospital: e.target.value
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={profileData.address}
              onChange={e =>
                setProfileData(prev => ({ ...prev, address: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <button
            onClick={handleSaveChanges}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      )
    },
    {
      id: "security",
      title: "Privacy & Security",
      icon: Shield,
      description: "Configure security settings and password management",
      content: (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">
              Recent Security Activity
            </h3>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-blue-800">
                Password changed - 2 days ago
              </li>
              <li className="text-sm text-blue-800">
                New device login - 5 days ago
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Two-factor authentication</h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security
              </p>
            </div>
            <button
              onClick={() => {
                setTwoFactorAuth(!twoFactorAuth)
                setShowToast(true)
                setToastMessage(twoFactorAuth ? "2FA disabled" : "2FA enabled")
              }}
              className={`px-3 py-1 text-sm text-white rounded-full transition-colors ${
                twoFactorAuth
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {twoFactorAuth ? "Enabled" : "Disabled"}
            </button>
          </div>

          <button
            onClick={handlePasswordChange}
            className="w-full px-4 py-2 text-left text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Change Password
          </button>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Security Alerts</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-600"
                  defaultChecked
                />
                <span className="text-sm">
                  Email alerts for new device login
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-600"
                  defaultChecked
                />
                <span className="text-sm">SMS alerts for password changes</span>
              </label>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "preferences",
      title: "Preferences",
      icon: Sliders,
      description: "Customize your experience",
      content: (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">
                  Switch between light and dark themes
                </p>
              </div>
              <button
                onClick={() => {
                  setDarkMode(!darkMode)
                  setShowToast(true)
                  setToastMessage(
                    `Dark mode ${darkMode ? "disabled" : "enabled"}`
                  )
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  darkMode ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                    darkMode ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">
                  Receive updates via email
                </p>
              </div>
              <button
                onClick={() => {
                  setEmailNotifications(!emailNotifications)
                  setShowToast(true)
                  setToastMessage(
                    `Email notifications ${
                      emailNotifications ? "disabled" : "enabled"
                    }`
                  )
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  emailNotifications ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                    emailNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Language Preferences</h3>
              <select className="mt-2 w-full px-3 py-2 border rounded-lg">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Time Zone</h3>
              <select className="mt-2 w-full px-3 py-2 border rounded-lg">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-6 (Central Time)</option>
                <option>UTC-7 (Mountain Time)</option>
                <option>UTC-8 (Pacific Time)</option>
              </select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Share2,
      description: "Manage connected apps and services",
      content: (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Connected Applications</h3>
            <button
              onClick={() => {
                setModalContent({
                  title: "Add New Integration",
                  content: (
                    <div className="space-y-4">
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option>Select an application</option>
                        <option>Patient Management System</option>
                        <option>Lab Results Portal</option>
                        <option>Pharmacy Integration</option>
                      </select>
                      <button
                        onClick={() => {
                          setShowModal(false)
                          setShowToast(true)
                          setToastMessage("New integration added successfully!")
                        }}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Connect Application
                      </button>
                    </div>
                  )
                })
                setShowModal(true)
              }}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>
          </div>

          <div className="space-y-4">
            {connectedApps.map(app => {
              const AppIcon = app.icon
              return (
                <div
                  key={app.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <AppIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{app.name}</h4>
                        <p className="text-sm text-gray-500">
                          Connected 2 months ago
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowToast(true)
                        setToastMessage(`Disconnected from ${app.name}`)
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    },
    {
      id: "data",
      title: "Data Management",
      icon: Database,
      description: "Access and manage your data",
      content: (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Data Overview</h3>
            <p className="mt-2 text-sm text-blue-800">
              Your account contains patient records, appointment history, and
              personal information.
            </p>
          </div>

          <button
            onClick={() => {
              setShowToast(true)
              setToastMessage(
                "Your data is being prepared for download. You will receive an email shortly."
              )
            }}
            className="w-full px-4 py-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium">Download My Data</h4>
                <p className="text-sm text-gray-500">
                  Get a copy of your data in CSV format
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              setModalContent({
                title: "Deactivate Account",
                content: (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-yellow-600">
                      <AlertTriangle className="w-5 h-5" />
                      <p>Are you sure you want to deactivate your account?</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Your account will be deactivated and you won't be able to
                      access your data until you reactivate it.
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          setShowModal(false)
                          setShowToast(true)
                          setToastMessage("Account deactivated successfully")
                        }}
                        className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
                      >
                        Deactivate
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )
              })
              setShowModal(true)
            }}
            className="w-full px-4 py-3 text-left border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-600">
                  Deactivate Account
                </h4>
                <p className="text-sm text-yellow-600">
                  Temporarily disable your account
                </p>
              </div>
            </div>
          </button>
        </div>
      )
    },
    {
      id: "help",
      title: "Help & Support",
      icon: HelpCircle,
      description: "Get assistance and support",
      content: (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-medium text-blue-900">Need help?</h3>
            <p className="mt-2 text-blue-800">
              Our support team is available 24/7 to assist you
            </p>
            <button
              onClick={() => {
                setModalContent({
                  title: "Contact Support",
                  content: (
                    <div className="space-y-4">
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option>Select issue type</option>
                        <option>Technical Support</option>
                        <option>Account Issues</option>
                        <option>Billing Questions</option>
                      </select>
                      <textarea
                        placeholder="Describe your issue..."
                        className="w-full px-3 py-2 border rounded-lg"
                        rows={4}
                      />
                      <button
                        onClick={() => {
                          setShowModal(false)
                          setShowToast(true)
                          setToastMessage(
                            "Support ticket created! We will respond shortly."
                          )
                        }}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Submit Ticket
                      </button>
                    </div>
                  )
                })
                setShowModal(true)
              }}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-medium">FAQs</h4>
              <p className="mt-1 text-sm text-gray-500">
                Find answers to common questions
              </p>
              <button className="mt-3 text-blue-600 hover:text-blue-700">
                View FAQs →
              </button>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-medium">Documentation</h4>
              <p className="mt-1 text-sm text-gray-500">
                Browse our user guides
              </p>
              <button className="mt-3 text-blue-600 hover:text-blue-700">
                View Docs →
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Video Tutorials</h4>
            <div className="mt-3 space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg">
                <p className="font-medium">Getting Started Guide</p>
                <p className="text-sm text-gray-500">5 min watch</p>
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg">
                <p className="font-medium">Advanced Features</p>
                <p className="text-sm text-gray-500">10 min watch</p>
              </button>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Settings
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Manage your preferences and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3 space-y-1">
            {sections.map(section => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() =>
                    setActiveSection(
                      activeSection === section.id ? null : section.id
                    )
                  }
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : `${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-white hover:shadow-md"
                        }`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              )
            })}

            <button
              onClick={handleSignOut}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg mt-8 transition-all transform hover:scale-105 ${
                darkMode ? "hover:bg-red-900 hover:bg-opacity-20" : ""
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            <div
              className={`backdrop-blur-lg bg-white bg-opacity-90 rounded-xl shadow-lg p-6 transition-all transform hover:scale-[1.01] ${
                darkMode ? "bg-gray-800 bg-opacity-90" : ""
              }`}
            >
              {activeSection ? (
                sections.find(s => s.id === activeSection)?.content
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sections.map(section => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-start space-x-4 p-4 rounded-lg border transition-all transform hover:scale-105 hover:shadow-lg ${
                          darkMode
                            ? "border-gray-700 hover:border-blue-500 bg-gray-800"
                            : "hover:border-blue-500 hover:bg-white"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <div className="text-left">
                          <h3
                            className={`font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {section.title}
                          </h3>
                          <p
                            className={`text-sm mt-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {section.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}

      {/* Modal */}
      {showModal && (
        <Modal title={modalContent.title} onClose={() => setShowModal(false)}>
          {modalContent.content}
        </Modal>
      )}
    </div>
  )
}

export default SettingsLayout
