import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import img from '../resources/img/logo512.png'; // Adjust the path as necessary

export const generateInvoice = (cartItems, total) => {
  const doc = new jsPDF();
  const date = new Date();
  const invoiceNumber = `INV-${date.getTime() % 1000000}`;

  doc.setFontSize(18);
  doc.setTextColor(41, 128, 185);
  doc.text('Factura de Compra', 15, 20);
  
  const logo = new Image();
  logo.src = '../resources/img/logo512.png';
  doc.addImage(img, 'PNG', 150, 10, 20, 20);

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Tienda Online', 15, 30);
  doc.text('CUIT: 30-12345678-9', 15, 35);
  doc.text('Dirección: Av. Principal 1234', 15, 40);
  doc.text('Email: info@tiendaonline.com', 15, 45);

  doc.setFontSize(12);
  doc.text(`N° Factura: ${invoiceNumber}`, 150, 30);
  doc.text(`Fecha: ${date.toLocaleDateString()}`, 150, 35);
  doc.text(`Hora: ${date.toLocaleTimeString()}`, 150, 40);

  const tableData = cartItems.map(item => [
    item.name,
    item.quantity,
    `$${item.price.toFixed(2)}`,
    `$${(item.price * item.quantity).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 85,
    head: [['Producto', 'Cantidad', 'Precio Unitario', 'Total']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text(`Subtotal: $${total.toFixed(2)}`, 150, finalY);
  doc.text(`IVA (21%): $${(total * 0.21).toFixed(2)}`, 150, finalY + 5);
  doc.setFontSize(14);
  doc.text(`Total: $${(total * 1.21).toFixed(2)}`, 150, finalY + 15);

  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('Gracias por su compra!', 15, 280);
  doc.text('Sistema automatizado de facturación - Tienda Online © 2025', 15, 285);

  doc.save(`factura-${invoiceNumber}.pdf`);
};