export function VitalRange({ current, min, max }) {
  const percentage = ((current - min) / (max - min)) * 100

  return (
    <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
      <div className="flex justify-between text-xs text-blue-600 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
