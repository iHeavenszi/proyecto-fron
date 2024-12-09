import React from "react";
import visaImage from "../assets/visamc.png";
import transImg from "../assets/bvva.png"; 

const PaymentOptions = ({ onSelect }) => {
  return (
    <div className="payment-options">
      <h2>Elige tus Opciones de pago</h2>
      <div
        className="payment-option"
        onClick={() => onSelect("tarjetas")}
      >
        <img src={visaImage} alt="Tarjetas" />
        <span>Paga con tus tarjetas</span>
      </div>
      <div
        className="payment-option"
        onClick={() => onSelect("transferencia")}
      >
        <img src={transImg} alt="Transferencia" />
        <span>Paga con transferencia</span>
      </div>
    </div>
  );
};

export default PaymentOptions;
