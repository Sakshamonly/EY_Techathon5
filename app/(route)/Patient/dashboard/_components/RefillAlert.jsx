import { Alert, AlertTitle, AlertDescription } from "../../../../../@/components/ui/alert"
import { Button } from "../../../../../@/components/ui/button"
import { Pill } from "lucide-react"

export function RefillAlert({ medication, onRequestRefill }) {
  return (
    <Alert className="border-l-4 border-orange-500 bg-orange-50">
      <Pill className="h-4 w-4 text-orange-500" />
      <AlertTitle className="text-orange-800">Refill Needed</AlertTitle>
      <AlertDescription className="text-orange-700">
        <div className="flex items-center justify-between">
          <span>
            {medication.name} - {medication.remainingDoses} doses remaining
          </span>
          <Button
            variant="outline"
            className="border-orange-200 hover:bg-orange-100 text-orange-700"
            onClick={() => onRequestRefill(medication.id)}
          >
            Request Refill
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
