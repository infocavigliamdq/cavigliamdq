import userData from "../app/constants/userData"
import logoEmpresa from '../../public/logos/imgPDF.png'
import whats from '../../public/logos/whatsapp.png'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import getImageBase64 from "./getImageBase64"

const generarPDF = async (empresa, items, tipoDocumento, fecha, pagos) => {
  const imageData = await getImageBase64(logoEmpresa.src)
  const whatsLogo = await getImageBase64(whats.src)

  const doc = new jsPDF()
  const clienteX = 120

  const fechaPresupuesto = fecha || new Date().toLocaleDateString('es-AR')

  // Logo
  doc.addImage(imageData, 'PNG', 160, 10, 35, 15)

  // Título principal
  doc.setFontSize(16)
  tipoDocumento === 'recibo'
    ? doc.text('RECIBO', 15, 15)
    : doc.text('PRESUPUESTO', 15, 15)

  doc.setFontSize(12)
  doc.text(`Fecha: ${fechaPresupuesto}`, 15, 20)

  // Información del presupuesto
  doc.setFontSize(10)

  // Datos de la empresa emisora
  doc.text(`${userData.name}`, 15, 35)
  doc.text(`${userData.email}`, 15, 42)
  doc.addImage(whatsLogo, 'PNG', 15, 46.5, 5, 5); // x, y, width, height
  doc.text(`+${userData.codigoPais}${userData.administracion.contacto}`, 22, 50);
  doc.addImage(whatsLogo, 'PNG', 15, 53.5, 5, 5); // x, y, width, height
  doc.text(`+${userData.codigoPais}${userData.ventas.contacto}`, 22, 57);
  doc.text(`${userData.cuil}`, 15, 64)

  // Datos del cliente
  doc.text(`Empresa: ${empresa.nombre || '-'}`, clienteX, 35)
  doc.text(`Dirección: ${empresa.direccion || '-'}`, clienteX, 42)
  doc.text(`Email: ${empresa.mail || '-'}`, clienteX, 49)
  doc.text(`Teléfono: ${empresa.telefono || '-'}`, clienteX, 56)
  doc.text(`CUIL: ${empresa.cuil || '-'}`, clienteX, 63)
  doc.text(`Tipo: ${empresa.tipo || '-'}`, clienteX, 70)

  // Tabla según tipo de documento
  const tablaStartY = empresa.tipo ? 75 : 80
  doc.setFontSize(12)

  if (tipoDocumento === 'presupuesto') {
    autoTable(doc, {
      head: [['Cantidad', 'Producto', 'Código', 'Precio', 'Total']],
      body: items.map(item => [
        item.cantidad,
        item.producto,
        item.codigo || '-',
        item.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }),
        (item.cantidad * item.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
      ]),
      startY: tablaStartY,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [28, 58, 109] },
      margin: { bottom: 20 }
    })
  } else {
    autoTable(doc, {
      head: [['Forma de pago', 'Valor', 'N° cheque', 'Banco', 'Fecha']],
      body: pagos?.map(pago => [
        pago.tipo || 'Efectivo',
        pago.monto?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) || '-',
        pago.CH_n || '-',
        pago.Bco || '-',
        pago.date || '-'
      ]) || [],
      startY: tablaStartY,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [28, 58, 109] },
      margin: { bottom: 20 }
    })
  }

  const finalY = doc.lastAutoTable?.finalY || tablaStartY + 10
    const total = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0)
    const totalPagos = pagos.reduce((acc, pago) => acc + (pago.monto || 0), 0)

  // Total
  doc.setFontSize(11)
  if (tipoDocumento === 'presupuesto') {
    doc.text(`Total: ${total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`, 150, finalY + 20)
  }else{
    doc.text(`Total recibido: ${totalPagos.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`, 150, finalY + 20)
  }
  // Observaciones
  doc.setFont(undefined, 'bold')
  doc.text(`Observaciones:`, 15, 260)
  doc.setFont(undefined, 'normal')
  doc.text(empresa.observaciones || 'Ninguna', 15, 265)

  // Footer
  doc.setFillColor(28, 58, 109)
  doc.rect(0, 280, 210, 17, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text('Este documento no es válido como factura. Contiene precios finales con impuestos incluidos.', 30, 285)
  doc.textWithLink('Para ver más productos puede ingresar en www.caviglia.com', 30, 291, {
    url: 'https://www.repuestoscaviglia.com'
  })

  // Exportar archivo
  const pdfBlob = doc.output('blob')
  const nombreArchivo = `${tipoDocumento}_${empresa.nombre || 'cliente'}.pdf`
  const file = new File([pdfBlob], nombreArchivo, {
    type: 'application/pdf'
  })

  doc.save(nombreArchivo)
  return file
}

export default generarPDF
