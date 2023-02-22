import { PDFViewer } from '@react-pdf/renderer'
import { Resume } from './Resume'

export const ResumeWeb = () => (
  <PDFViewer>
    <Resume />
  </PDFViewer>
)
