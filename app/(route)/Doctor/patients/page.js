'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../@/components/ui/select"
import { Input } from "../../../../@/components/ui/input"
import { Button } from "../../../../@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../@/components/ui/card"
import { Badge } from "../../../../@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../@/components/ui/avatar"
import { CalendarIcon, UserIcon, ActivityIcon, ClipboardIcon } from 'lucide-react'

// Patient status types
const PatientStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

// Risk level types
const RiskLevel = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

// Treatment status types
const TreatmentStatus = {
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  SCHEDULED: 'scheduled',
  PENDING: 'pending',
}

// More dummy data
const samplePatients = [
  {
    id: 'P-001',
    name: 'John Doe',
    avatar: '/placeholder.svg',
    riskLevel: RiskLevel.MEDIUM,
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-01',
    primaryCondition: 'Hypertension',
    treatmentStatus: TreatmentStatus.ONGOING,
    status: PatientStatus.ACTIVE,
  },
  {
    id: 'P-002',
    name: 'Sarah Smith',
    avatar: '/placeholder.svg',
    riskLevel: RiskLevel.HIGH,
    lastVisit: '2024-01-10',
    nextAppointment: '2024-01-25',
    primaryCondition: 'Diabetes Type 2',
    treatmentStatus: TreatmentStatus.ONGOING,
    status: PatientStatus.ACTIVE,
  },
  {
    id: 'P-003',
    name: 'Michael Johnson',
    avatar: '/placeholder.svg',
    riskLevel: RiskLevel.LOW,
    lastVisit: '2024-01-05',
    nextAppointment: '2024-03-15',
    primaryCondition: 'Annual Checkup',
    treatmentStatus: TreatmentStatus.COMPLETED,
    status: PatientStatus.INACTIVE,
  },
  {
    id: 'P-004',
    name: 'Emily Brown',
    avatar: '/placeholder.svg',
    riskLevel: RiskLevel.MEDIUM,
    lastVisit: '2024-01-20',
    nextAppointment: '2024-02-10',
    primaryCondition: 'Asthma',
    treatmentStatus: TreatmentStatus.ONGOING,
    status: PatientStatus.ACTIVE,
  },
  {
    id: 'P-005',
    name: 'David Wilson',
    avatar: '/placeholder.svg',
    riskLevel: RiskLevel.HIGH,
    lastVisit: '2024-01-18',
    nextAppointment: '2024-01-30',
    primaryCondition: 'Coronary Artery Disease',
    treatmentStatus: TreatmentStatus.SCHEDULED,
    status: PatientStatus.ACTIVE,
  },
  {
    id: 'P-006',
    name: 'Lisa Taylor',
    avatar: '/placeholder.svg',
    riskLevel: RiskLevel.LOW,
    lastVisit: '2024-01-12',
    nextAppointment: null,
    primaryCondition: 'Allergies',
    treatmentStatus: TreatmentStatus.COMPLETED,
    status: PatientStatus.INACTIVE,
  },
]

function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search patients..."
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  )
}

function FilterDropdowns({ onFilterChange }) {
  return (
    <div className="flex space-x-4">
      <Select onValueChange={(value) => onFilterChange('risk', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Risk Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Risks</SelectItem>
          <SelectItem value={RiskLevel.LOW}>Low Risk</SelectItem>
          <SelectItem value={RiskLevel.MEDIUM}>Medium Risk</SelectItem>
          <SelectItem value={RiskLevel.HIGH}>High Risk</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('dateRange', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Visit Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Dates</SelectItem>
          <SelectItem value="last7">Last 7 days</SelectItem>
          <SelectItem value="last30">Last 30 days</SelectItem>
          <SelectItem value="last90">Last 90 days</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('status', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value={PatientStatus.ACTIVE}>Active</SelectItem>
          <SelectItem value={PatientStatus.INACTIVE}>Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('disease', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Disease" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Diseases</SelectItem>
          <SelectItem value="Hypertension">Hypertension</SelectItem>
          <SelectItem value="Diabetes Type 2">Diabetes Type 2</SelectItem>
          <SelectItem value="Asthma">Asthma</SelectItem>
          <SelectItem value="Coronary Artery Disease">Coronary Artery Disease</SelectItem>
          <SelectItem value="Allergies">Allergies</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function BulkActions({ selectedCount }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-500">
        {selectedCount} patients selected
      </span>
      <Button variant="outline" size="sm" className="hover:text-green-600 hover:border-green-600 hover:bg-green-100">
        Export CSV
      </Button>
      <Button variant="outline" size="sm" className="hover:text-red-600 hover:border-red-600 hover:bg-red-100">
        Export PDF
      </Button>
      <Button variant="outline" size="sm" className="hover:text-blue-600 hover:border-blue-600 hover:bg-blue-100">
        Send Message
      </Button>
    </div>
  )
}

function getRiskBadgeColor(risk) {
  const colors = {
    [RiskLevel.LOW]: 'bg-green-100 text-green-800',
    [RiskLevel.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [RiskLevel.HIGH]: 'bg-red-100 text-red-800',
  }
  return colors[risk] || colors[RiskLevel.LOW]
}

function PatientCard({ patient, onSelect }) {
  const router = useRouter()
  const [isSelected, setIsSelected] = useState(false)
  const riskBadgeColor = getRiskBadgeColor(patient.riskLevel)

  const handleSelect = () => {
    setIsSelected(!isSelected)
    onSelect(patient.id, !isSelected)
  }

  const handleViewDetails = () => {
    // Convert patient name to URL-friendly format
    const formattedName = patient.name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/Doctor/patients/${formattedName}`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`hover:shadow-md transition-all duration-300 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{patient.name}</CardTitle>
                <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
              </div>
            </div>
            <Badge variant="secondary" className={riskBadgeColor}>
              {patient.riskLevel} Risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Last Visit</p>
                <p className="text-muted-foreground">{patient.lastVisit}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Next Appointment</p>
                <p className="text-muted-foreground">{patient.nextAppointment || 'Not Scheduled'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ActivityIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Primary Condition</p>
                <p className="text-muted-foreground">{patient.primaryCondition}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ClipboardIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Treatment Status</p>
                <p className="text-muted-foreground">{patient.treatmentStatus}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelect}
              className={`${
                isSelected
                  ? "text-red-600 border-red-600 bg-red-100 hover:bg-red-200"
                  : "text-blue-600 border-blue-600 bg-blue-100 hover:bg-blue-200"
              }`}
            >
              {isSelected ? "Deselect" : "Select"}
            </Button>

            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewDetails}
              >
                View Details
              </Button>
              <Button 
                size="sm" 
                className="text-white bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
              >
                Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function PatientGrid({ patients, onSelectPatient }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} onSelect={onSelectPatient} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function PatientListPage() {
  const [patients, setPatients] = useState(samplePatients)
  const [selectedPatients, setSelectedPatients] = useState(new Set())
  const [filters, setFilters] = useState({
    search: '',
    risk: '',
    dateRange: '',
    status: '',
    disease: '',
  })

  useEffect(() => {
    const filteredPatients = samplePatients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        patient.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        patient.primaryCondition
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      const matchesRisk = filters.risk ? patient.riskLevel === filters.risk : true
      const matchesStatus = filters.status ? patient.status === filters.status : true
      const matchesDisease = filters.disease
        ? patient.primaryCondition === filters.disease
        : true

      // Date range filter logic (simplified for this example)
      let matchesDateRange = true
      if (filters.dateRange) {
        const lastVisitDate = new Date(patient.lastVisit)
        const currentDate = new Date()
        const daysDifference = (currentDate - lastVisitDate) / (1000 * 60 * 60 * 24)

        switch (filters.dateRange) {
          case 'last7':
            matchesDateRange = daysDifference <= 7
            break
          case 'last30':
            matchesDateRange = daysDifference <= 30
            break
          case 'last90':
            matchesDateRange = daysDifference <= 90
            break
        }
      }

      return (
        matchesSearch &&
        matchesRisk &&
        matchesStatus &&
        matchesDisease &&
        matchesDateRange
      )
    })

    setPatients(filteredPatients)
  }, [filters])

  const handleSearch = (query) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: query }))
  }

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }))
  }

  const handleSelectPatient = (patientId, isSelected) => {
    setSelectedPatients((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (isSelected) {
        newSelected.add(patientId)
      } else {
        newSelected.delete(patientId)
      }
      return newSelected
    })
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <SearchBar onSearch={handleSearch} />
            <FilterDropdowns onFilterChange={handleFilterChange} />
          </div>

          {selectedPatients.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6"
            >
              <BulkActions selectedCount={selectedPatients.size} />
            </motion.div>
          )}
        </motion.div>

        <PatientGrid patients={patients} onSelectPatient={handleSelectPatient} />
      </div>
    </div>
  )
}

export default PatientListPage

