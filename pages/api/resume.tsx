import { NextApiRequest, NextApiResponse } from 'next'
import ReactPDF from '@react-pdf/renderer'
import { Resume } from '../../components/Resume'
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const stream = await ReactPDF.renderToStream(<Resume />)

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf')

  res.send(stream)
}
