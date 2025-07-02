import { Prescription } from '../types';

export async function generatePrescriptionPDF(prescription) {
  // In a real application, you'd use a PDF library like pdfmake or jspdf
  // For this example, we'll create a simple text blob
  
  // Generate the content first
  const content = `
MEDICARE PRESCRIPTION

Patient Information:
------------------
Name: John Doe
ID: PT-2024-001

Diagnosis:
---------
${prescription.diagnosis.symptoms}

Prescribed Medications:
---------------------
${prescription.medications.map(med => 
  `- ${med.name}
   Frequency: ${med.frequency}
   Duration: ${med.duration}`
).join('\n')}
`;

  // Now create the blob from the content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Now that blob is ready, you can create the download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "prescription.txt"; // You can change this to .pdf or other file types
  link.click();

  // Return the blob for any other uses, if needed
  return blob;
}

export function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
