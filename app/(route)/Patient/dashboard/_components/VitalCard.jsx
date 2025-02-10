import { Card, CardHeader, CardTitle, CardContent } from "../../../../../@/components/ui/card"
import { Progress } from "../../../../../@/components/ui/progress"

export function VitalCard({
  icon: Icon,
  title,
  value,
  progress,
  color,
  subtitle
}) {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {progress && <Progress value={progress} className="mt-2" />}
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}
