import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Generates and downloads a high-resolution A4 PDF from a DOM element.
 * Works seamlessly on any hosting environment without server dependencies.
 *
 * @param {HTMLElement|string} elementOrId - The DOM element or its element ID
 * @param {string} fileName - Download filename
 */
export async function generateClientPdf(elementOrId, fileName = 'resume.pdf') {
  const target = typeof elementOrId === 'string'
    ? document.getElementById(elementOrId)
    : elementOrId

  if (!target) {
    throw new Error('Target preview element not found for PDF export.')
  }

  // Create an off-screen clone with exact A4 proportions (794px at 96 DPI = 210mm)
  const offscreenContainer = document.createElement('div')
  offscreenContainer.style.position = 'fixed'
  offscreenContainer.style.left = '-9999px'
  offscreenContainer.style.top = '0'
  offscreenContainer.style.width = '794px'
  offscreenContainer.style.background = '#ffffff'
  offscreenContainer.style.zIndex = '-9999'

  const clone = target.cloneNode(true)
  clone.style.transform = 'none'
  clone.style.width = '100%'
  clone.style.margin = '0'
  clone.style.boxShadow = 'none'

  offscreenContainer.appendChild(clone)
  document.body.appendChild(offscreenContainer)

  try {
    const canvas = await html2canvas(clone, {
      scale: 2, // 2x scale for sharp text and crisp lines
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.98)
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210 // mm
    const pageHeight = 297 // mm
    const imgHeight = (canvas.height * pageWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight, undefined, 'FAST')
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight
    }

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`
    pdf.save(cleanFileName)
  } finally {
    if (document.body.contains(offscreenContainer)) {
      document.body.removeChild(offscreenContainer)
    }
  }
}
