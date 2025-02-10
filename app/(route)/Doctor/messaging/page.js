"use client";

import React, { useState } from "react"
import {
  Send,
  Search,
  Phone,
  Video,
  ArrowLeft,
  MoreVertical,
  User,
  FileText,
  Paperclip,
  Clock,
  Star,
  Bell,
  Filter
} from "lucide-react"
import { ScheduleModal } from "./components/modals/ScheduleModal"
import { PrescribeModal } from "./components/modals/PrescribeModal"
import  NotesModal  from "./components/modals/NotesModal"
import { UrgentModal } from "./components/modals/UrgentModal"
import { ActionButtons } from "./components/ActionButtons"
import { patients } from "./data/patients"

const ChatWindow = () => {
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState({})
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [activeModal, setActiveModal] = useState(null)

  const handleSend = (text = newMessage) => {
    if (text.trim() && activeChat) {
      setMessages(prev => ({
        ...prev,
        [activeChat]: [
          ...(prev[activeChat] || []),
          {
            id: Date.now(),
            text: text,
            sender: "doctor",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }),
            status: "sent"
          }
        ]
      }))
      setNewMessage("")
      setShowQuickReplies(false)
    }
  }

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const activePatient = activeChat
    ? patients.find(p => p.id === activeChat)
    : null

  return (
    <div className="flex h-screen max-w-7xl mx-auto bg-gray-100">
      {/* Left Sidebar - Navigation
      <div className="w-20 bg-white border-r hidden lg:flex flex-col items-center py-6 space-y-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="text-blue-600" size={24} />
        </div>
        <nav className="flex-1 flex flex-col items-center space-y-4">
          <button className="p-3 rounded-lg bg-blue-50 text-blue-600">
            <Bell size={24} />
          </button>
          <button className="p-3 rounded-lg hover:bg-gray-100 text-gray-500">
            <Star size={24} />
          </button>
          <button className="p-3 rounded-lg hover:bg-gray-100 text-gray-500">
            <Filter size={24} />
          </button>
        </nav>
      </div> */}

      {/* Contacts List */}
      <div
        className={`w-full md:w-96 bg-white border-r ${
          activeChat ? "hidden md:block" : ""
        }`}
      >
        <div className="p-6 bg-gray-50 border-b">
          <h1 className="text-2xl font-bold mb-6">Patient Chats</h1>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${
                filterStatus === "all"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("critical")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${
                filterStatus === "critical"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterStatus("stable")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${
                filterStatus === "stable"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Stable
            </button>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {filteredPatients.map(patient => (
            <div
              key={patient.id}
              onClick={() => setActiveChat(patient.id)}
              className="flex items-center p-6 border-b hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="text-blue-600" size={24} />
                </div>
                {patient.status === "critical" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{patient.name}</h3>
                  <span className="text-sm text-gray-500">{patient.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {patient.lastMessage}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      patient.status === "critical"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {patient.status.charAt(0).toUpperCase() +
                      patient.status.slice(1)}
                  </span>
                  {patient.unread > 0 && (
                    <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                      {patient.unread} new
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 bg-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  className="md:hidden mr-4"
                  onClick={() => setActiveChat(null)}
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={24} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">
                    {activePatient?.name}
                  </h2>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowPatientDetails(!showPatientDetails)}
                >
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Patient Details */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                showPatientDetails
                  ? "max-h-[500px] opacity-100 mt-6"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {activePatient && (
                <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-500">
                        Blood Pressure
                      </div>
                      <div className="font-semibold">
                        {activePatient.vitals?.bp}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Heart Rate</div>
                      <div className="font-semibold">
                        {activePatient.vitals?.heartRate} bpm
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Temperature</div>
                      <div className="font-semibold">
                        {activePatient.vitals?.temperature}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm text-gray-500">O2 Saturation</div>
                      <div className="font-semibold">
                        {activePatient.vitals?.oxygenSaturation}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p>
                        <span className="text-gray-500">Age:</span>{" "}
                        {activePatient.age}
                      </p>
                      <p>
                        <span className="text-gray-500">Condition:</span>{" "}
                        {activePatient.condition}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="text-gray-500">Last Visit:</span>{" "}
                        {activePatient.lastVisit}
                      </p>
                      <p>
                        <span className="text-gray-500">Next Appointment:</span>{" "}
                        {activePatient.nextAppointment}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ActionButtons setActiveModal={setActiveModal} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {messages[activeChat]?.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "doctor" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg animate-fade-in ${
                    message.sender === "doctor"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow"
                  }`}
                >
                  <p>{message.text}</p>
                  <div className="flex items-center justify-end gap-1 text-xs mt-2 opacity-75">
                    <span>{message.time}</span>
                    <Clock size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t">
            <div className="flex gap-3">
              <button
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowQuickReplies(!showQuickReplies)}
              >
                <FileText size={20} className="text-gray-500" />
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip size={20} className="text-gray-500" />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      handleSend()
                    }
                  }}
                  placeholder="Type a message"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={!newMessage.trim()}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500">
            <User size={48} className="mx-auto mb-4" />
            <p className="text-lg">Select a patient to start chatting</p>
            <p className="text-sm mt-2">Your conversations will appear here</p>
          </div>
        </div>
      )}

      {/* Modals */}
      {activeModal === "schedule" && (
        <ScheduleModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "prescribe" && (
        <PrescribeModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "notes" && (
        <NotesModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "urgent" && (
        <UrgentModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  )
}

export default ChatWindow
