import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cardform.css';

// Definir la interfaz para las props
interface CardFormProps {
  onBack: () => void; // Función que se ejecutará al hacer clic en el botón de "Regresar"
  total: number; // Total a pagar
}

const CardForm: React.FC<CardFormProps> = ({ onBack, total }) => {
  const navigate = useNavigate();
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Manejar la confirmación del pago
  const handleConfirmPayment = () => {
    const orderDetails = {
      referenceNumber: "123456789",
      shippingName: shippingDetails.name,
      shippingAddress: shippingDetails.address,
      shippingCity: shippingDetails.city,
      shippingState: shippingDetails.state,
      shippingZip: shippingDetails.zip,
      items: [
        { name: "Producto 1", quantity: 2, price: 100 },
        { name: "Producto 2", quantity: 1, price: 50 },
      ],
      total: total,
      paymentMethod: "Tarjeta de Crédito",
    };

    navigate("/receipt", { state: orderDetails });
  };

  // Actualizar los detalles de la tarjeta
  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Actualizar los detalles de envío
  const handleChangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="payment-form">
      <div className="textcard">
        <h2>Paga con Tarjeta</h2>
        <h3>Total a pagar: ${total}</h3> {/* Total dinámico */}
      </div>

      <div className="form-sections">
        {/* Sección de datos de la tarjeta */}
        <div className="form-section card-details">
          <h2>Datos de la Tarjeta</h2>
          <form>
            <div className="form-group">
              <label htmlFor="cardNumber">Número de la Tarjeta</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleChangeCard}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Nombre en la Tarjeta</label>
              <input
                type="text"
                id="cardName"
                placeholder="Nombre Apellido"
                value={cardDetails.cardName}
                onChange={handleChangeCard}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Fecha de Expiración</label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/AA"
                value={cardDetails.expiryDate}
                onChange={handleChangeCard}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleChangeCard}
              />
            </div>
          </form>
        </div>

        {/* Sección de dirección de envío */}
        <div className="form-section shipping-details">
          <h2>Dirección de Envío</h2>
          <form>
            <div className="form-group">
              <label htmlFor="shippingName">Nombre del Destinatario</label>
              <input
                type="text"
                id="name"
                placeholder="Nombre Apellido"
                value={shippingDetails.name}
                onChange={handleChangeShipping}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shippingAddress">Dirección</label>
              <input
                type="text"
                id="address"
                placeholder="Calle, Número, Colonia"
                value={shippingDetails.address}
                onChange={handleChangeShipping}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shippingCity">Ciudad</label>
              <input
                type="text"
                id="city"
                placeholder="Ciudad"
                value={shippingDetails.city}
                onChange={handleChangeShipping}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shippingState">Estado</label>
              <input
                type="text"
                id="state"
                placeholder="Estado"
                value={shippingDetails.state}
                onChange={handleChangeShipping}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shippingZip">Código Postal</label>
              <input
                type="text"
                id="zip"
                placeholder="Código Postal"
                value={shippingDetails.zip}
                onChange={handleChangeShipping}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="form-actions">
        <button className="checkout-btn" onClick={onBack}>Regresar</button> {/* Usar onBack para volver */}
        <button className="checkout-btn" onClick={handleConfirmPayment}>
          Confirmar Pago
        </button>
      </div>
    </div>
  );
};

export default CardForm;
