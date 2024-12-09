import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentOptions from "./PaymentOptions";
import CardForm from "./CardForm";
import TransferInfo from "./TransferInfo";
import "./Checkout.css";

const Checkout = () => {
  // Obtener cartItems desde el estado de la ruta
  const { state } = useLocation();
  const { cartItems } = state || {};

  // Estado para la opción de pago seleccionada
  const [selectedOption, setSelectedOption] = useState(null);

  // Calcular el total del carrito
  const totalAmount = cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  // Función para regresar a las opciones iniciales
  const handleBack = () => {
    setSelectedOption(null); // Regresar a las opciones iniciales
  };

  return (
    <div className="checkout-container">
      <div className="payment-container">
        {!selectedOption ? (
          <>
            <div className="pedido">
              <h2>Resumen del Pedido</h2>
              {cartItems?.length === 0 ? (
                <p>No hay productos en el carrito.</p>
              ) : (
                <>
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        {item.name} x {item.quantity} - ${item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                  <h3>Total a pagar: ${totalAmount}</h3>
                </>
              )}
            </div>
            <div className="options">
              <PaymentOptions onSelect={setSelectedOption} />
            </div>
          </>
        ) : selectedOption === "tarjetas" ? (
          <CardForm onBack={handleBack} total={totalAmount} />
        ) : (
          <TransferInfo onBack={handleBack} total={totalAmount} />
        )}
      </div>
    </div>
  );
};

export default Checkout;
