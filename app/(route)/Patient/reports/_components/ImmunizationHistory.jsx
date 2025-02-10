"use client"
import { useState } from "react"
import { Button } from "../../../../../@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../../../@/components/ui/table"
import { Badge } from "../../../../../@/components/ui/badge"
import { Upload, Check, AlertTriangle } from "lucide-react"
import { format, isPast, isToday } from "date-fns"
import { motion } from "framer-motion"

const mockVaccinations = [
  { id: "1", name: "Influenza", date: "2023-10-15", status: "Completed" },
  { id: "2", name: "COVID-19 Booster", date: "2023-12-01", status: "Due Soon" },
  { id: "3", name: "Tetanus", date: "2024-03-15", status: "Overdue" }
]

export default function ImmunizationHistory() {
  const [vaccinations, setVaccinations] = useState(mockVaccinations)

  const getStatusColor = status => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Due Soon":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const markAsComplete = id => {
    setVaccinations(prev =>
      prev.map(vacc =>
        vacc.id === id
          ? {
              ...vacc,
              status: "Completed",
              date: format(new Date(), "yyyy-MM-dd")
            }
          : vacc
      )
    )
  }

  const handleUpload = () => {
    console.log("Opening file upload dialog")
    alert("Opening file upload dialog")
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">
          Immunization History
        </h2>
        <Button
          onClick={handleUpload}
          className="bg-primary hover:bg-primary/90"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload New Record
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Vaccination</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccinations.map((vacc, index) => {
              const vaccDate = new Date(vacc.date)
              const isPastOrToday = isPast(vaccDate) || isToday(vaccDate)
              return (
                <motion.tr
                  key={vacc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TableCell>{vacc.name}</TableCell>
                  <TableCell>{format(vaccDate, "MMMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vacc.status)}>
                      {vacc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {vacc.status !== "Completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsComplete(vacc.id)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Complete Mark as Complete
                      </Button>
                    )}
                    {vacc.status === "Overdue" && isPastOrToday && (
                      <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500 inline" />
                    )}
                  </TableCell>
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}
