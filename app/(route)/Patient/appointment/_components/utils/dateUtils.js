export function formatDistanceToNow(date) {
  const appointmentDate = new Date(date);
  const now = new Date();
  
  const diffTime = appointmentDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;
  
  return appointmentDate.toLocaleDateString();
}
