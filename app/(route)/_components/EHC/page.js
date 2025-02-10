"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../@/components/ui/card";
import { ScrollArea } from "../../../../@/components/ui/scroll-area";
import { Alert, AlertDescription } from "../../../../@/components/ui/alert";
import { Badge } from "../../../../@/components/ui/badge";
import { 
  FileText, 
  Activity, 
  Beaker, 
  FileImage, 
  Clipboard, 
  PenTool, 
  Users, 
  Syringe,
  Bell,
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react';

const VitalCard = ({ data }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">{data.label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{data.value}</span>
            <span className="text-sm text-gray-500">{data.unit}</span>
          </div>
        </div>
        <Badge variant={data.trend === "stable" ? "secondary" : "outline"}>
          {data.trend}
        </Badge>
      </div>
      <div className="h-10 w-full flex items-end gap-1">
        {data.history.map((value, index) => (
          <div
            key={index}
            style={{ height: `${(value / Math.max(...data.history)) * 100}%` }}
            className="flex-1 bg-blue-500 opacity-75 rounded-t"
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState("medical-history");

  const vitalsData = [
    { 
      label: "Blood Pressure", 
      value: "120/80", 
      unit: "mmHg",
      trend: "stable",
      history: [115, 118, 120, 117, 120]
    },
    { 
      label: "Heart Rate", 
      value: "72", 
      unit: "bpm",
      trend: "decreasing",
      history: [78, 76, 75, 74, 72]
    },
    { 
      label: "Temperature", 
      value: "98.6", 
      unit: "°F",
      trend: "stable",
      history: [98.4, 98.5, 98.6, 98.6, 98.6]
    }
  ];

  const recentUpdates = [
    {
      type: "alert",
      title: "Critical Lab Result",
      description: "Elevated A1C levels detected",
      timestamp: "2 hours ago",
      priority: "high"
    },
    {
      type: "medication",
      title: "Medication Update",
      description: "Metformin dosage adjusted to 1000mg",
      timestamp: "1 day ago",
      priority: "medium"
    },
    {
      type: "appointment",
      title: "Upcoming Appointment",
      description: "Cardiology follow-up on April 5th",
      timestamp: "2 days ago",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Health Records</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">ID: 12345</Badge>
            <span className="text-gray-600">John Doe, 45</span>
            <Badge className="bg-green-100 text-green-800">Active Patient</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Alert className="w-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Last Updated: 2 hours ago
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
          <TabsTrigger value="medical-history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Medical History</span>
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Vitals</span>
          </TabsTrigger>
          <TabsTrigger value="lab-results" className="flex items-center gap-2">
            <Beaker className="h-4 w-4" />
            <span className="hidden sm:inline">Lab Results</span>
          </TabsTrigger>
          <TabsTrigger value="imaging" className="flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            <span className="hidden sm:inline">Imaging</span>
          </TabsTrigger>
          <TabsTrigger value="treatment" className="flex items-center gap-2">
            <Clipboard className="h-4 w-4" />
            <span className="hidden sm:inline">Treatment</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            <span className="hidden sm:inline">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Family History</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Syringe className="h-4 w-4" />
            <span className="hidden sm:inline">Medications</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-6">
            <TabsContent value="medical-history">
              <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <FileText className="h-5 w-5" />
                    Medical History
                  </CardTitle>
                  <CardDescription>Complete patient medical history and records</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full pr-4">
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Current Conditions</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                            <span className="font-medium">Hypertension</span>
                            <span className="text-sm text-gray-500">Diagnosed: 2018</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                            <span className="font-medium">Type 2 Diabetes</span>
                            <span className="text-sm text-gray-500">Diagnosed: 2019</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Past Medical History</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                            <span className="font-medium">Asthma</span>
                            <span className="text-sm text-gray-500">Diagnosed: 2005, Resolved: 2015</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                            <span className="font-medium">Chronic Bronchitis</span>
                            <span className="text-sm text-gray-500">Diagnosed: 2010, Resolved: 2018</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Surgical History</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-800">Surgery</Badge>
                            <span className="font-medium">Appendectomy</span>
                            <span className="text-sm text-gray-500">Year: 2008</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-800">Surgery</Badge>
                            <span className="font-medium">Knee Replacement</span>
                            <span className="text-sm text-gray-500">Year: 2017</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals">
              <div className="grid gap-6 md:grid-cols-2">
                {vitalsData.map((data, index) => (
                  <VitalCard key={index} data={data} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lab-results">
              <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Beaker className="h-5 w-5" />
                    Lab Results
                  </CardTitle>
                  <CardDescription>Latest laboratory test results</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full pr-4">
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Recent Tests</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-100 text-red-800">Critical</Badge>
                            <span className="font-medium">A1C Level</span>
                            <span className="text-sm text-gray-500">9.5% (Normal: 4-5.6%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Alert</Badge>
                            <span className="font-medium">Cholesterol</span>
                            <span className="text-sm text-gray-500">220 mg/dL (Normal: 200 mg/dL)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Normal</Badge>
                            <span className="font-medium">Vitamin D</span>
                            <span className="text-sm text-gray-500">30 ng/mL (Normal: 20-40 ng/mL)</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Previous Tests</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Normal</Badge>
                            <span className="font-medium">Kidney Function</span>
                            <span className="text-sm text-gray-500">Creatinine: 1.0 mg/dL</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Alert</Badge>
                            <span className="font-medium">Liver Function</span>
                            <span className="text-sm text-gray-500">ALT: 55 U/L</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="imaging">
              <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-600">
                    <FileImage className="h-5 w-5" />
                    Imaging
                  </CardTitle>
                  <CardDescription>Recent imaging results and scans</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full pr-4">
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Recent Scans</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-100 text-red-800">Critical</Badge>
                            <span className="text-sm text-gray-500">Detected: Pneumonia</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Alert</Badge>
                            <span className="font-medium">MRI Brain</span>
                            <span className="text-sm text-gray-500">Detected: Small Lesion</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Previous Scans</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Normal</Badge>
                            <span className="font-medium">Abdominal Ultrasound</span>
                            <span className="text-sm text-gray-500">No Abnormalities</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Normal</Badge>
                            <span className="font-medium">Spinal MRI</span>
                            <span className="text-sm text-gray-500">No Abnormalities</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Bell className="h-5 w-5" />
                  Recent Updates
                </CardTitle>
                <CardDescription>Latest alerts, updates, and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg ${getPriorityColor(update.priority)}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{update.title}</span>
                      <span className="text-xs text-gray-500">{update.timestamp}</span>
                    </div>
                    <p className="text-sm">{update.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-600">
                  <Calendar className="h-5 w-5" />
                  Appointments
                </CardTitle>
                <CardDescription>Upcoming and past appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Consultation with Dr. Smith</span>
                      <span className="text-xs text-gray-500">March 12, 2024</span>
                    </div>
                    <p className="text-sm text-gray-500">Location: General Hospital</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Dental Checkup</span>
                      <span className="text-xs text-gray-500">April 15, 2024</span>
                    </div>
                    <p className="text-sm text-gray-500">Location: Downtown Dental Clinic</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}