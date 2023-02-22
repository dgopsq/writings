import { PDFViewer } from '@react-pdf/renderer'
import { Resume } from './Resume'

export const ResumeWeb = () => (
  <PDFViewer width='1024' height='768' showToolbar={true}>
    <Resume />
  </PDFViewer>
)
