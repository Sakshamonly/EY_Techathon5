import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../../../../../@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../../../@/components/ui/table"
import { motion } from "framer-motion"

export function PreviewModal({ isOpen, onClose, document }) {
  // Mock data for preview
  const previewData = [
    { key: "Blood Pressure", value: "120/80 mmHg" },
    { key: "Heart Rate", value: "72 bpm" },
    { key: "Temperature", value: "98.6°F" },
    { key: "Oxygen Saturation", value: "98%" },
    { key: "Respiratory Rate", value: "16 breaths/min" }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">{document.name}</DialogTitle>
          <DialogDescription>
            {document.type} - {document.date}
          </DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Measurement</TableHead>
                <TableHead className="font-bold">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((item, index) => (
                <TableRow
                  key={item.key}
                  className="hover:bg-primary/5 transition-colors duration-200"
                >
                  <TableCell>{item.key}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
