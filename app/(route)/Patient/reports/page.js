"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../@/components/ui/tabs"

import { motion } from "framer-motion"
import LabResults from "./_components/LabResults"
import ImmunizationHistory from "./_components/ImmunizationHistory"
import MedicalDocuments from "./_components/MedicalDocuments"

export default function HealthRecords() {
  const [activeTab, setActiveTab] = useState("lab-results")

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-primary text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Health Records
      </motion.h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 rounded-lg bg-blue-100 p-1">
          <TabsTrigger
            value="lab-results"
            className="rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md"
          >
            Lab Results
          </TabsTrigger>
          <TabsTrigger
            value="immunization-history"
            className="rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md"
          >
            Immunization History
          </TabsTrigger>
          <TabsTrigger
            value="medical-documents"
            className="rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md"
          >
            Medical Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lab-results">
          <LabResults />
        </TabsContent>
        <TabsContent value="immunization-history">
          <ImmunizationHistory />
        </TabsContent>
        <TabsContent value="medical-documents">
          <MedicalDocuments />
        </TabsContent>
      </Tabs>
    </div>
  )
}
