"use client"

import React from "react"
import { StatsOverview } from "./_components/stats/StatsOverview"
import { DiseaseAnalytics } from "./_components/analytics/DiseaseAnalytics"
import { PatientTrends } from "./_components/analytics/PatientTrends"
import { EnhancedPatientTable } from "./_components/patients/EnhancedPatientTable"
import { PatientDemographics } from "./_components/analytics/PatientDemographics"
import { motion } from "framer-motion"
import { Header } from "./_components/Header"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1516557070061-c3d1653fa646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80')] bg-cover opacity-5" />
      <div className="relative">
        <Header />
        <main className="max-w-7xl mx-auto ">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StatsOverview />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DiseaseAnalytics />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PatientTrends />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <PatientDemographics />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <EnhancedPatientTable />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default App
