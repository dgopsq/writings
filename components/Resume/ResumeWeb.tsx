import { PDFViewer } from '@react-pdf/renderer'
import { Resume } from './Resume'

export const ResumeWeb = () => (
  <PDFViewer width='100%' height='100%' showToolbar={true}>
    <Resume />
  </PDFViewer>
)
