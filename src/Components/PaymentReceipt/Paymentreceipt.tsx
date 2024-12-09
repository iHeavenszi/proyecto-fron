import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import './Paymentreceipt.css';

const PaymentReceipt = () => {
  const { state: orderDetails } = useLocation();  // Recibir los datos desde el state

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Comprobante de Pago", 10, 20);
    doc.setFontSize(12);
    doc.text(`Número de Referencia: ${orderDetails.referenceNumber}`, 10, 30);
    doc.text(`Nombre del Destinatario: ${orderDetails.shippingName}`, 10, 40);
    doc.text(`Dirección: ${orderDetails.shippingAddress}, ${orderDetails.shippingCity}, ${orderDetails.shippingState} ${orderDetails.shippingZip}`, 10, 50);
    doc.text(`Método de Pago: ${orderDetails.paymentMethod}`, 10, 60);

    // Detalles de los productos
    let yPosition = 70;
    orderDetails.items.forEach(item => {
      doc.text(`${item.name} - Cantidad: ${item.quantity} - Precio: $${item.price}`, 10, yPosition);
      yPosition += 10;
    });

    doc.text(`Total: $${orderDetails.total}`, 10, yPosition + 10);
    doc.save(`Comprobante_${orderDetails.referenceNumber}.pdf`);
  };

  return (
    <div className="receipt">
      <h2>¡Pago Confirmado!</h2>
      <h3>Gracias por tu compra. A continuación, puedes descargar tu comprobante:</h3>
      <div>
        <p><strong>Número de Referencia:</strong> {orderDetails.referenceNumber}</p>
        <p><strong>Nombre del Destinatario:</strong> {orderDetails.shippingName}</p>
        <p><strong>Dirección de Envío:</strong> {orderDetails.shippingAddress}, {orderDetails.shippingCity}, {orderDetails.shippingState}, {orderDetails.shippingZip}</p>
        <p><strong>Método de Pago:</strong> {orderDetails.paymentMethod}</p>

        <h4>Detalles del Pedido:</h4>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>{item.name} - Cantidad: {item.quantity} - Precio: ${item.price}</li>
          ))}
        </ul>

        <p><strong>Total a Pagar:</strong> ${orderDetails.total}</p>
      </div>

      <button className="download-btn" onClick={generatePDF}>Descargar Comprobante</button>
    </div>
  );
};

export default PaymentReceipt;
