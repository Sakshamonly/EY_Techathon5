import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../@/components/ui/card"
import { Button } from "../../../../../@/components/ui/button"
import { Pill, Check } from "lucide-react"

export function MedicationTimeline({ medications, onMedicationTaken }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-blue-500" />
          Medication Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Pill className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">{med.name}</h3>
                  <p className="text-sm text-blue-600">{med.instructions}</p>
                  <p className="text-xs text-blue-500">{med.schedule}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-900">Next Dose</p>
                  <p className="text-sm text-blue-600">{med.nextDose}</p>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-100"
                  onClick={() => onMedicationTaken(med.name)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Taken
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
