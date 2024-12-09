import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Cartcontext"; // Asegúrate de que la ruta sea correcta
import "./Cart.css";
import Banner from "../Banner/Banner";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // Hook para redirigir

  const handleQuantityChange = (event, productId: string) => {
    const quantity = parseInt(event.target.value);
    if (quantity > 0 && !isNaN(quantity)) {
      updateQuantity(productId, quantity);
    }
  };
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <div className="cart-container">
      <Banner />
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-card">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-image"
              />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Precio: ${item.price}</p>
                <div className="quantity-container">
                  <label htmlFor={`quantity-${item.id}`}>Cantidad:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                    min="1"
                  />
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
            <h3>Total: ${totalCost.toFixed(2)}</h3>
          </div>
      {cartItems.length > 0 && (
        <div className="cart-actions">
          <button className="clear-btn" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Ir al Checkout
          </button>
        </div>
      )}
    </div>
  );
};


export default Cart;
