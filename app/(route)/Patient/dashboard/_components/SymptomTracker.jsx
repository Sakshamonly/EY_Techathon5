import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../@/components/ui/card"
import { Button } from "../../../../../@/components/ui/button"
import { Slider } from "../../../../../@/components/ui/slider"
import { Plus, Activity } from "lucide-react"

const symptoms = ["Headache", "Fatigue", "Nausea", "Pain", "Dizziness"]

export function SymptomTracker() {
  const [selectedSymptom, setSelectedSymptom] = useState("")
  const [intensity, setIntensity] = useState(0)
  const [trackedSymptoms, setTrackedSymptoms] = useState([])

  const handleTrackSymptom = () => {
    if (selectedSymptom) {
      setTrackedSymptoms([
        {
          symptom: selectedSymptom,
          intensity,
          time: new Date().toLocaleTimeString()
        },
        ...trackedSymptoms
      ])
      setSelectedSymptom("")
      setIntensity(0)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-600" />
          Symptom Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {symptoms.map(symptom => (
              <Button
                key={symptom}
                variant={selectedSymptom === symptom ? "default" : "outline"}
                onClick={() => setSelectedSymptom(symptom)}
                className="text-sm"
              >
                {symptom}
              </Button>
            ))}
          </div>

          {selectedSymptom && (
            <div className="space-y-4 p-4 bg-white rounded-lg">
              <div>
                <label className="text-sm font-medium">Intensity</label>
                <Slider
                  value={[intensity]}
                  onValueChange={([value]) => setIntensity(value)}
                  max={10}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Mild</span>
                  <span>Severe</span>
                </div>
              </div>
              <Button onClick={handleTrackSymptom} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Track Symptom
              </Button>
            </div>
          )}

          <div className="space-y-2 mt-4">
            {trackedSymptoms.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-white rounded-lg text-sm"
              >
                <span className="font-medium">{item.symptom}</span>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    Level {item.intensity}/10
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
