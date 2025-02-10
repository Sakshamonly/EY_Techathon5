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
import { Download, Eye, Upload, Search } from "lucide-react"
import { format } from "date-fns"
import { PreviewModal } from "./PreviewModal"
import { motion } from "framer-motion"

const mockDocuments = [
  { id: "1", name: "Annual Physical Report", type: "PDF", date: "2023-05-15" },
  { id: "2", name: "X-Ray Results", type: "Image", date: "2023-06-01" },
  { id: "3", name: "Specialist Consultation", type: "PDF", date: "2023-06-15" }
]

export default function MedicalDocuments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [documents, setDocuments] = useState(mockDocuments)
  const [previewDocument, setPreviewDocument] = useState(null)

  const filteredDocuments = documents.filter(
    doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.date.includes(searchTerm)
  )

  const handleUpload = () => {
    console.log("Opening file upload dialog")
    alert("Opening file upload dialog")
  }

  const handlePreview = doc => {
    setPreviewDocument(doc)
  }

  const handleDownload = doc => {
    const pdfContent = `
      %PDF-1.4
      1 0 obj
      <<
        /Type /Catalog
        /Pages 2 0 R
      >>
      endobj
      2 0 obj
      <<
        /Type /Pages
        /Kids [3 0 R]
        /Count 1
      >>
      endobj
      3 0 obj
      <<
        /Type /Page
        /Parent 2 0 R
        /Resources <<
          /Font <<
            /F1 4 0 R 
          >>
        >>
        /MediaBox [0 0 612 792]
        /Contents 5 0 R
      >>
      endobj
      4 0 obj
      <<
        /Type /Font
        /Subtype /Type1
        /Name /F1
        /BaseFont /Helvetica
      >>
      endobj
      5 0 obj
      << /Length 44 >>
      stream
      BT
      /F1 24 Tf
      100 700 Td
      (Sample ${doc.name}) Tj
      ET
      endstream
      endobj
      xref
      0 6
      0000000000 65535 f 
      0000000009 00000 n 
      0000000056 00000 n 
      0000000111 00000 n 
      0000000255 00000 n 
      0000000335 00000 n 
      trailer
      <<
        /Size 6
        /Root 1 0 R
      >>
      startxref
      427
      %%EOF
    `

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${doc.name}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md flex-grow mr-4">
          <Search className="text-primary" />
          <Input
            type="text"
            placeholder="Search documents"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>
        <Button
          onClick={handleUpload}
          className="bg-primary hover:bg-primary/90"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Documents
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg text-primary">
                  {doc.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-500">{doc.type}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(doc.date), "MMMM d, yyyy")}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview(doc)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(doc)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {previewDocument && (
        <PreviewModal
          isOpen={!!previewDocument}
          onClose={() => setPreviewDocument(null)}
          document={previewDocument}
        />
      )}
    </motion.div>
  )
}
