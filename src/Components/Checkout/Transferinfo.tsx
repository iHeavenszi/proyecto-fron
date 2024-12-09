import React from "react";

const TransferInfo = ({ onBack, total }) => {
  return (
    <div className="transfer-info">
      <h2>Información para Transferencia</h2>
      <ul>
        <li>
          <strong>Banco:</strong> BBVA
        </li>
        <li>
          <strong>Nombre del Beneficiario:</strong> Nombre Apellido
        </li>
        <li>
          <strong>Número de Cuenta:</strong> 1234567890123456
        </li>
        <li>
          <strong>CLABE:</strong> 123456789012345678
        </li>
        <li>
          <strong>Referencia:</strong> Compra #12345
        </li>
      </ul>
      <h3>Total a pagar: ${total}</h3> {/* Total dinámico */}
      <p>Por favor, envíe su comprobante a: pagos@tuempresa.com</p>
      <button className="checkout-btn" onClick={onBack}>
        Regresar
      </button>
    </div>
  );
};

export default TransferInfo;
