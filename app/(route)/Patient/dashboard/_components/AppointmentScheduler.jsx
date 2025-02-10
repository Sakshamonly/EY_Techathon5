import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../@/components/ui/card"
import { Button } from "../../../../../@/components/ui/button"
import { Calendar as CalendarIcon, Clock, Video, Phone } from "lucide-react"

export function AppointmentScheduler({ nextAppointment }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          Upcoming Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-900">
                  {nextAppointment.date}
                </span>
              </div>
              <span className="text-sm text-blue-600">
                {nextAppointment.time}
              </span>
            </div>
            <h3 className="font-semibold text-blue-900">
              {nextAppointment.doctor}
            </h3>
            <p className="text-sm text-blue-600">{nextAppointment.type}</p>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-blue-200 hover:bg-blue-100"
              >
                <Video className="h-4 w-4 mr-2" />
                Join Video
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-blue-200 hover:bg-blue-100"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            Schedule New Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
