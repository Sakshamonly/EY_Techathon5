'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, CalendarIcon } from 'lucide-react'
import { Button } from "../../../../@/components/ui/button"
import { Input } from "../../../../@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../@/components/ui/select"

const DUMMY_APPOINTMENTS = [
  // Monday
  // {
  //   id: 1,
  //   patientName: 'Rafli Jainudin',
  //   time: '09:00 AM - 10:00 AM',
  //   type: 'General Checkup',
  //   status: 'Finished',
  //   day: 'Monday',
  //   color: 'blue'
  // },
  {
    id: 2,
    patientName: 'Sekar Nandita',
    time: '10:00 AM - 11:00 AM',
    type: 'Scaling',
    status: 'Finished',
    day: 'Monday',
    color: 'green'
  },
  {
    id: 3,
    patientName: 'Anggasa Pura',
    time: '02:00 PM - 03:00 PM',
    type: 'Bleaching',
    status: 'Finished',
    day: 'Monday',
    color: 'purple'
  },
  // Tuesday
  {
    id: 4,
    patientName: 'Emma Wilson',
    time: '09:30 AM - 10:30 AM',
    type: 'Root Canal',
    status: 'Encounter',
    day: 'Tuesday',
    color: 'red'
  },
  {
    id: 5,
    patientName: 'James Chen',
    time: '11:00 AM - 12:00 PM',
    type: 'Wisdom Tooth Extraction',
    status: 'Registered',
    day: 'Tuesday',
    color: 'orange'
  },
  // Wednesday
  {
    id: 6,
    patientName: 'Sarah Johnson',
    time: '10:00 AM - 11:00 AM',
    type: 'Dental Crown',
    status: 'Registered',
    day: 'Wednesday',
    color: 'blue'
  },
  {
    id: 7,
    patientName: 'Michael Brown',
    time: '02:30 PM - 03:30 PM',
    type: 'Teeth Whitening',
    status: 'Finished',
    day: 'Wednesday',
    color: 'green'
  },
  // Thursday
  // {
  //   id: 8,
  //   patientName: 'Lisa Anderson',
  //   time: '09:00 AM - 10:00 AM',
  //   type: 'Regular Checkup',
  //   status: 'Encounter',
  //   day: 'Thursday',
  //   color: 'purple'
  // },
  {
    id: 9,
    patientName: 'David Miller',
    time: '11:30 AM - 12:30 PM',
    type: 'Cavity Filling',
    status: 'Registered',
    day: 'Thursday',
    color: 'red'
  },
  // Friday
  {
    id: 10,
    patientName: 'Emily Davis',
    time: '10:00 AM - 11:00 AM',
    type: 'Braces Adjustment',
    status: 'Finished',
    day: 'Friday',
    color: 'orange'
  },
  {
    id: 11,
    patientName: 'Robert Wilson',
    time: '02:00 PM - 03:00 PM',
    type: 'Deep Cleaning',
    status: 'Registered',
    day: 'Friday',
    color: 'blue'
  }
]

const DoctorCalendar = () => {
  const [view, setView] = useState('day')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [appointments] = useState(DUMMY_APPOINTMENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9
    return hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`
  })

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const getAppointmentStyle = (status) => {
    const baseStyle = 'shadow-sm hover:shadow-md transition-all'
    switch (status) {
      case 'Finished':
        return `${baseStyle} bg-green-50 border-l-4 border-green-500 hover:bg-green-100`
      case 'Encounter':
        return `${baseStyle} bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100`
      case 'Registered':
        return `${baseStyle} bg-gray-50 border-l-4 border-gray-500 hover:bg-gray-100`
      default:
        return `${baseStyle} bg-gray-50`
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Finished':
        return <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Finished</span>
      case 'Encounter':
        return <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Encounter</span>
      case 'Registered':
        return <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Registered</span>
      default:
        return null
    }
  }

  const getCurrentTimeMarker = () => {
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    if (hours < 9 || hours >= 17) return null
    
    const topPosition = ((hours - 9) * 96) + (minutes / 60) * 96
    return (
      <div 
        className="absolute w-full h-0.5 bg-red-500 z-50 flex items-center"
        style={{ top: `${topPosition}px` }}
      >
        <div className="w-2 h-2 bg-red-500 rounded-full -ml-1" />
        <span className="text-xs text-red-500 ml-2 bg-white px-1 rounded">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    )
  }

  const getAppointmentPosition = (timeString) => {
    const [startTime] = timeString.split(' - ')
    const [time, period] = startTime.split(' ')
    let [hours, minutes] = time.split(':')
    hours = parseInt(hours)
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    minutes = parseInt(minutes)
    return (hours - 9) * 96 + (minutes / 60) * 96
  }

  const getAppointmentHeight = (timeString) => {
    const [startTime, endTime] = timeString.split(' - ')
    const start = new Date(`01/01/2023 ${startTime}`)
    const end = new Date(`01/01/2023 ${endTime}`)
    const durationInMinutes = (end - start) / 60000
    return (durationInMinutes / 60) * 96
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const AppointmentCard = ({ appointment, isWeekView }) => (
    <div
      className={`absolute p-2 rounded-lg cursor-pointer transform transition-all duration-200 hover:scale-[1.02] z-10 ${getAppointmentStyle(appointment.status)}`}
      style={{ 
        top: `${getAppointmentPosition(appointment.time)}px`,
        height: `${getAppointmentHeight(appointment.time)}px`,
        width: isWeekView ? 'calc(100% - 8px)' : 'calc(100% - 16px)',
        left: isWeekView ? '4px' : '8px'
      }}
    >
      <div className="flex flex-col h-full justify-between overflow-hidden">
        <div>
          <div className="font-medium text-sm truncate">{appointment.patientName}</div>
          <div className="text-xs text-gray-600 truncate">{appointment.type}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">{appointment.time}</div>
          {!isWeekView && getStatusBadge(appointment.status)}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold">{filteredAppointments.length}</div>
            <div className="text-gray-500">total appointments</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search appointments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Finished">Finished</SelectItem>
                <SelectItem value="Encounter">Encounter</SelectItem>
                <SelectItem value="Registered">Registered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              DS
            </div>
            <div>
              <div className="font-medium">Dr. Smith</div>
              <div className="text-sm text-gray-500">
                Today's appointments: {filteredAppointments.filter(a => a.day === weekDays[currentTime.getDay() - 1]).length} patient(s)
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="font-medium flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <Button variant="outline" size="icon" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className={`grid ${view === 'day' ? 'grid-cols-[100px_1fr]' : 'grid-cols-[100px_1fr_1fr_1fr_1fr_1fr]'} gap-4 p-4 min-w-[800px]`}>
          {/* Time Slots */}
          <div className="space-y-6 pt-6">
            {timeSlots.map((time) => (
              <div key={time} className="h-24 flex items-start text-sm text-gray-500 sticky left-0 bg-white">
                {time}
              </div>
            ))}
          </div>

          {view === 'day' ? (
            // Day View
            <div className="relative min-h-[864px]">
              {getCurrentTimeMarker()}
              {filteredAppointments
                .filter(app => app.day === weekDays[selectedDate.getDay() - 1])
                .map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} isWeekView={false} />
                ))}
            </div>
          ) : (
            // Week View
            weekDays.map((day) => (
              <div key={day} className="relative min-h-[864px]">
                <div className="absolute top-0 left-0 w-full h-6 flex items-center justify-center">
                  <div className="font-medium text-gray-600">{day}</div>
                </div>
                {day === weekDays[currentTime.getDay() - 1] && getCurrentTimeMarker()}
                {filteredAppointments
                  .filter(app => app.day === day)
                  .map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} isWeekView={true} />
                  ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorCalendar



