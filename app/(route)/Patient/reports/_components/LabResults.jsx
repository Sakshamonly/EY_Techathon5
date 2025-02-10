"use client"
import { useState } from "react"
import { Input } from "../../../../../@/components/ui/input"
import { Button } from "../../../../../@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../../../@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "../../../../../@/components/ui/collapsible"
import { Download, ChevronDown, ChevronUp, Search } from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"

const mockLabResults = [
  {
    id: "1",
    date: "2023-05-15",
    testName: "Complete Blood Count",
    result: "Within normal range",
    interpretation: "normal"
  },
  {
    id: "2",
    date: "2023-06-01",
    testName: "Lipid Panel",
    result: "Slightly elevated LDL",
    interpretation: "borderline"
  },
  {
    id: "3",
    date: "2023-06-15",
    testName: "HbA1c",
    result: "Above target range",
    interpretation: "critical"
  }
]

export default function LabResults() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedResults, setExpandedResults] = useState([])

  const filteredResults = mockLabResults.filter(
    result =>
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.date.includes(searchTerm)
  )

  const toggleExpand = id => {
    setExpandedResults(prev =>
      prev.includes(id)
        ? prev.filter(resultId => resultId !== id)
        : [...prev, id]
    )
  }

  const getInterpretationColor = interpretation => {
    switch (interpretation) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "borderline":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = result => {
    console.log(`Downloading PDF for ${result.testName}`)
    alert(`Downloading PDF for ${result.testName}`)
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md">
        <Search className="text-primary" />
        <Input
          type="text"
          placeholder="Search by test name or date"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResults.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg text-primary">
                  {result.testName}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-500">
                  {format(new Date(result.date), "MMMM d, yyyy")}
                </p>
                <p
                  className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${getInterpretationColor(
                    result.interpretation
                  )}`}
                >
                  {result.interpretation.charAt(0).toUpperCase() +
                    result.interpretation.slice(1)}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Collapsible
                  open={expandedResults.includes(result.id)}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(result.id)}
                    >
                      {expandedResults.includes(result.id) ? (
                        <>
                          <ChevronUp className="mr-2 h-4 w-4" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-2 h-4 w-4" />
                          Show Details
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <p className="text-sm">{result.result}</p>
                  </CollapsibleContent>
                </Collapsible>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(result)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
