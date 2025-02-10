// app/patients/[pname]/page.js

"use client";

import React, { useState, useEffect } from "react";
import { useParams,useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../@/components/ui/card";
import { Alert, AlertDescription } from "../../../../../@/components/ui/alert";
import { Button } from "../../../../../@/components/ui/button";
import { Badge } from "../../../../../@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Bell,
  Clock,
  Pill,
  Clipboard,
  Stethoscope,
  AlertCircle,
  ChevronRight,
  Heart,
  Activity,
  UserCircle,
  FileText,
  Download,
  ArrowLeft,
  Printer,
  Edit,
} from "lucide-react";

// Mock API function - Replace with actual API calls
const fetchPatientData = async (patientName) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    patient: {
      name: decodeURIComponent(patientName),
      patientId: `P-${Math.floor(Math.random() * 1000000)}`,
      dateOfBirth: '1985-06-15',
      age: 38,
      hasAllergies: true,
      hasCriticalCondition: false,
      photoUrl: '/api/placeholder/120/120',
    },
    healthMetrics: [
      {
        title: "Blood Pressure",
        value: "120/80",
        icon: Heart,
        trend: "stable",
      },
      {
        title: "Heart Rate",
        value: "72 bpm",
        icon: Activity,
        trend: "improving",
      },
      {
        title: "BMI",
        value: "22.5",
        icon: UserCircle,
        trend: "stable",
      },
    ],
    medications: {
      current: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          timeLeft: "15 days",
          status: "Active",
        },
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          timeLeft: "7 days",
          status: "Refill Required",
        },
      ],
      schedule: [
        {
          time: "Morning (8:00 AM)",
          status: "Completed",
        },
        {
          time: "Evening (8:00 PM)",
          status: "Upcoming",
        },
      ],
    },
    recentActivities: [
      {
        type: "Appointment",
        description: "General Checkup with Dr. Smith",
        date: "2024-03-28",
        status: "upcoming",
      },
      {
        type: "Prescription",
        description: "Medication Refill",
        date: "2024-03-25",
        status: "completed",
      },
      {
        type: "Lab Result",
        description: "Blood Test Results Available",
        date: "2024-03-20",
        status: "completed",
      },
    ],
    appointments: [
      {
        doctor: "Dr. Smith",
        specialty: "General Practitioner",
        date: "March 28, 2024",
        time: "10:00 AM",
      },
      {
        doctor: "Dr. Johnson",
        specialty: "Cardiologist",
        date: "April 5, 2024",
        time: "2:30 PM",
      },
    ],
    healthData: [
      { month: "Jan", weight: 75, bloodPressure: 120, bloodSugar: 95 },
      { month: "Feb", weight: 73, bloodPressure: 118, bloodSugar: 92 },
      { month: "Mar", weight: 72, bloodPressure: 115, bloodSugar: 90 },
      { month: "Apr", weight: 71, bloodPressure: 117, bloodSugar: 88 },
    ],
    labReports: {
      "Blood Tests": [
        {
          name: "Complete Blood Count",
          date: "2024-03-15",
          doctor: "Dr. Smith",
          downloadUrl: "/reports/cbc.pdf",
        },
        {
          name: "Lipid Profile",
          date: "2024-03-15",
          doctor: "Dr. Smith",
          downloadUrl: "/reports/lipid.pdf",
        },
      ],
      "Imaging": [
        {
          name: "Chest X-Ray",
          date: "2024-02-20",
          doctor: "Dr. Johnson",
          downloadUrl: "/reports/xray.pdf",
        },
        {
          name: "MRI Scan",
          date: "2024-01-10",
          doctor: "Dr. Wilson",
          downloadUrl: "/reports/mri.pdf",
        },
      ],
      "Cardiology": [
        {
          name: "ECG Report",
          date: "2024-03-01",
          doctor: "Dr. Johnson",
          downloadUrl: "/reports/ecg.pdf",
        },
      ],
    },
  };
};

// PatientHeader Component
const PatientHeader = ({ name, patientId, dateOfBirth, age, hasAllergies, hasCriticalCondition, photoUrl }) => {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center text-gray-600 hover:text-gray-900"
           onClick={() => router.push('/Doctor/patients')} >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to List
          </button>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Printer className="w-5 h-5" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center">
          <div className="relative">
            <img
              src={photoUrl}
              alt={name}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-lg"
            />
            {(hasAllergies || hasCriticalCondition) && (
              <div className="absolute -top-2 -right-2">
                <Bell className="w-6 h-6 text-red-500" />
              </div>
            )}
          </div>
          
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <div className="mt-2 flex items-center space-x-6 text-gray-600">
              <div>
                <span className="text-sm">Patient ID:</span>
                <span className="ml-2 font-medium">{patientId}</span>
              </div>
              <div>
                <span className="text-sm">DOB:</span>
                <span className="ml-2 font-medium">{dateOfBirth}</span>
              </div>
              <div>
                <span className="text-sm">Age:</span>
                <span className="ml-2 font-medium">{age} years</span>
              </div>
            </div>
            {(hasAllergies || hasCriticalCondition) && (
              <div className="mt-2 flex items-center space-x-4">
                {hasAllergies && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Allergies
                  </span>
                )}
                {hasCriticalCondition && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Critical Condition
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Overview Component
const Overview = ({ patientData }) => {
  const { healthMetrics, recentActivities, appointments } = patientData;

  const quickActions = [
    {
      label: "Schedule Appointment",
      icon: Calendar,
    },
    {
      label: "Request Prescription",
      icon: Pill,
    },
    {
      label: "View Test Results",
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {healthMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-500">
                      {metric.title}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <Badge variant="outline" className="ml-2">
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-full">
                      {activity.type === "Appointment" ? (
                        <Calendar className="h-5 w-5 text-blue-500" />
                      ) : activity.type === "Prescription" ? (
                        <Pill className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Clipboard className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{activity.type}</h4>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {activity.date}
                    </span>
                    <Badge
                      variant={
                        activity.status === "upcoming" ? "default" : "success"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">{appointment.doctor}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {appointment.specialty}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Medications Component
const Medications = ({ patientData }) => {
  const { medications } = patientData;
  const { current: currentMedications, schedule: todaySchedule } = medications;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentMedications.map((medication, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Pill className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{medication.name}</h4>
                    <p className="text-sm text-gray-500">
                      {medication.dosage} - {medication.frequency}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Time Left</span>
                    <p className="font-semibold">{medication.timeLeft}</p>
                  </div>
                  <Badge
                    variant={
                      medication.status === "Active" ? "success" : "destructive"
                    }
                  >
                    {medication.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medication Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Today's Schedule</h4>
              <div className="space-y-2">
                {todaySchedule.map((schedule, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{schedule.time}</span>
                    </div>
                    <Badge variant="outline">{schedule.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Progress Component
const Progress = ({ patientData }) => {
  const { healthData } = patientData;
  const [metric, setMetric] = useState("weight");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Progress Tracking</CardTitle>
            <div className="flex gap-4">
              <Button
                variant={metric === "weight" ? "default" : "outline"}
                onClick={() => setMetric("weight")}
              >
                Weight
              </Button>
              <Button
                // Continuing from where we left off in Progress Component...

                variant={metric === "bloodPressure" ? "default" : "outline"}
                onClick={() => setMetric("bloodPressure")}
              >
                Blood Pressure
              </Button>
              <Button
                variant={metric === "bloodSugar" ? "default" : "outline"}
                onClick={() => setMetric("bloodSugar")}
              >
                Blood Sugar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px]">
            <ResponsiveContainer>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={metric}
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Lab Results Component
const LabResults = ({ patientData }) => {
  const { labReports } = patientData;
  const [activeCategory, setActiveCategory] = useState("Blood Tests");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lab Results</CardTitle>
            <TabsList>
              {Object.keys(labReports).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className={
                    activeCategory === category ? "bg-blue-500 text-white" : ""
                  }
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {labReports[activeCategory].map((report, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border rounded-lg bg-white"
              >
                <div>
                  <h4 className="font-semibold">{report.name}</h4>
                  <p className="text-sm text-gray-500">
                    Date: {report.date} | Doctor: {report.doctor}
                  </p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// More Features Component
const More = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Additional Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg">
            <p className="text-gray-500">More features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main PatientDetail Component
const PatientDetail = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("medical-history");
  const [showNotifications, setShowNotifications] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        setLoading(true);
        const data = await fetchPatientData(params.pname);
        setPatientData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load patient data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.pname) {
      loadPatientData();
    }
  }, [params.pname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading patient data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Patient not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="min-h-screen transition-colors duration-200">
        <div className="max-w-7xl mx-auto p-6">
          <PatientHeader {...patientData.patient} />

          {showNotifications && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You have upcoming appointments and medication refills due.
                Please review your schedule.
              </AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-5 gap-4">
              <TabsTrigger value="medical-history">Overview</TabsTrigger>
              <TabsTrigger value="prescriptions">Medications</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>

            <TabsContent value="medical-history">
              <Overview patientData={patientData} />
            </TabsContent>
            <TabsContent value="prescriptions">
              <Medications patientData={patientData} />
            </TabsContent>
            <TabsContent value="progress">
              <Progress patientData={patientData} />
            </TabsContent>
            <TabsContent value="lab-results">
              <LabResults patientData={patientData} />
            </TabsContent>
            <TabsContent value="more">
              <More />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;