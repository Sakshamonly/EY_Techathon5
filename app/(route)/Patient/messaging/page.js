"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "../../../../@/components/ui/button"
import { Input } from "../../../../@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../@/components/ui/avatar"
import { Card, CardContent } from "../../../../@/components/ui/card"
import { Mic, Paperclip, Send, Phone, Video, AlertCircle } from "lucide-react"
import { toast } from "../../../../@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

const doctors = [
  {
    id: 1,
    name: "Dr. Anil Sharma",
    specialization: "Cardiologist",
    availability: "Available",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    specialization: "Pediatrician",
    availability: "Busy",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    specialization: "Orthopedic",
    availability: "Away",
    image: "/placeholder.svg?height=40&width=40"
  }
]

const quickReplies = [
  "Request prescription",
  "Schedule appointment",
  "Ask for medical advice",
  "Share test results"
]

const patientInfoTranslations = {
  English: {
    name: "John Doe",
    age: 35,
    nextAppointment: "15th May 2023, 10:00 AM",
    clinicAddress: "123 Health St, Medical Center, City"
  },
  Hindi: {
    name: "जॉन डो",
    age: 35,
    nextAppointment: "15 मई 2023, सुबह 10:00 बजे",
    clinicAddress: "123 स्वास्थ्य मार्ग, मेडिकल सेंटर, शहर"
  },
  Tamil: {
    name: "ஜான் டோ",
    age: 35,
    nextAppointment: "15 மே 2023, காலை 10:00 மணி",
    clinicAddress: "123 சுகாதார தெரு, மருத்துவ மையம், நகரம்"
  }
}

const FilePreview = ({ file }) => (
  <a
    href={file.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-2 bg-gray-100 rounded-md hover:bg-gray-200"
  >
    <Paperclip className="h-4 w-4 mr-2" />
    <span className="text-sm text-blue-600 underline">{file.name}</span>
  </a>
)

export default function PatientChatPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0])
  const [message, setMessage] = useState("")
  const [language, setLanguage] = useState("English")
  const [messages, setMessages] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [patientInfo, setPatientInfo] = useState(
    patientInfoTranslations.English
  )
  const [uploadedFiles, setUploadedFiles] = useState([])
  const fileInputRef = useRef(null)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    setPatientInfo(patientInfoTranslations[language])
  }, [language])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: "user",
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate doctor's response
      setTimeout(() => {
        const doctorResponse = {
          id: Date.now() + 1,
          text: `Thank you for your message. How can I assist you further?`,
          sender: "doctor",
          timestamp: new Date()
        }
        setMessages(prevMessages => [...prevMessages, doctorResponse])
      }, 1000)
    }
  }

  const handleFileUpload = event => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }))
      setUploadedFiles(prev => [...prev, ...newFiles])

      // Create a message for each uploaded file
      newFiles.forEach(file => {
        const newMessage = {
          id: Date.now(),
          text: `File uploaded: ${file.name}`,
          sender: "user",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, newMessage])
      })

      toast({
        title: "File(s) Uploaded",
        description: `${newFiles.length} file(s) have been uploaded successfully.`
      })
    }
  }

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording)
    if (isRecording) {
      toast({
        title: "Voice Message Recorded",
        description: "Your voice message has been sent."
      })
      // Here you would typically stop recording and send the voice message
    } else {
      // Here you would typically start recording
    }
  }

  const handleEmergency = () => {
    toast({
      title: "Emergency Alert Sent",
      description:
        "An emergency alert has been sent to the doctor. Please wait for an immediate response.",
      variant: "destructive"
    })
    // Here you would typically send an emergency alert to the doctor
  }

  const handleCall = type => {
    toast({
      title: "Coming Soon",
      description: `${type.charAt(0).toUpperCase() +
        type.slice(1)} calls will be available in the near future.`
    })
  }

  const handleDoctorChange = doctor => {
    setSelectedDoctor(doctor)
    setMessages([]) // Reset chat when changing doctors
    toast({
      title: "Doctor Changed",
      description: `You are now chatting with ${doctor.name}.`
    })
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Left Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 bg-white p-4 overflow-y-auto border-r border-gray-200"
      >
        <h2 className="text-xl font-bold mb-4">Available Doctors</h2>
        {doctors.map(doctor => (
          <motion.div
            key={doctor.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer ${
              selectedDoctor.id === doctor.id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleDoctorChange(doctor)}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback>
                {doctor.name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{doctor.name}</p>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
              <p
                className={`text-sm ${
                  doctor.availability === "Available"
                    ? "text-green-500"
                    : doctor.availability === "Busy"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {doctor.availability}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Chat Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col"
      >
        {/* Top Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 shadow-md flex justify-between items-center"
        >
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
              />
              <AvatarFallback>
                {selectedDoctor.name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
              <p className="text-gray-500">{selectedDoctor.specialization}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCall("audio")}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCall("video")}
            >
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={handleEmergency}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Emergency
            </Button>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 ${msg.sender === "user" ? "text-right" : ""}`}
              >
                <p
                  className={`p-3 rounded-lg inline-block ${
                    msg.sender === "user" ? "bg-blue-100" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </p>
                {msg.text.startsWith("File uploaded:") && (
                  <div className="mt-2">
                    <FilePreview
                      file={
                        uploadedFiles.find(
                          f => f.name === msg.text.split(": ")[1]
                        ) || { name: "", url: "" }
                      }
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Replies */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 bg-gray-50 flex flex-wrap gap-2"
        >
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setMessage(reply)}
            >
              {reply}
            </Button>
          ))}
        </motion.div>

        {/* Chat Input */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 bg-white border-t border-gray-200"
        >
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleVoiceMessage}>
              <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Sidebar for Patient Information */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 bg-white p-4 border-l border-gray-200"
      >
        <h2 className="text-xl font-bold mb-4">Your Information</h2>
        <Card>
          <CardContent className="p-4">
            <motion.p
              className="mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Name:</strong> {patientInfo.name}
            </motion.p>
            <motion.p
              className="mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <strong>Age:</strong> {patientInfo.age}
            </motion.p>
            <motion.p
              className="mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Next Appointment:</strong> {patientInfo.nextAppointment}
            </motion.p>
            <motion.p
              className="mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <strong>Clinic Address:</strong> {patientInfo.clinicAddress}
            </motion.p>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Language
              </label>
              <select
                id="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
              </select>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
