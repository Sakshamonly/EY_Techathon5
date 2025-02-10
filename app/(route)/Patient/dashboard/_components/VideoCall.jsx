import { Card, CardContent } from "../../../../../@/components/ui/card"
import { Button } from "../../../../../@/components/ui/button"
import { Video, Mic, MicOff, VideoOff, Phone } from "lucide-react"
import { useState } from "react"

export function VideoCall({ doctorName, onEnd }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  return (
    <Card className="bg-blue-900 text-white">
      <CardContent className="p-6">
        <div className="aspect-video bg-blue-800 rounded-lg mb-4 flex items-center justify-center">
          <p className="text-blue-200">Video call with Dr. {doctorName}</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-full p-3 hover:bg-blue-700"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="outline"
            className="rounded-full p-3 hover:bg-blue-700"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? (
              <Video className="h-5 w-5" />
            ) : (
              <VideoOff className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="destructive"
            className="rounded-full p-3 bg-red-500 hover:bg-red-600"
            onClick={onEnd}
          >
            <Phone className="h-5 w-5 rotate-225" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
