import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginForm from './Components/LoginForm/LoginForm.tsx'
import Dashboard from './Components/Dashboard/Dashboard.tsx'
import Registro from './Components/LoginForm/Registro.tsx'
import RutaProtegida from './Components/Dashboard/Rutaprotegida.tsx'
import { AuthProvider } from './Components/Auth/AuthProvider.tsx'
import { Product } from './Components/types/types.ts';
import Cart from './Components/Cart/Cart.tsx';
import { CartProvider } from './Components/Cart/Cartcontext.tsx';
import Checkout from './Components/Checkout/Checkout.tsx';  
import PaymentReceipt from './Components/PaymentReceipt/Paymentreceipt.tsx';

// Definir la función onAddToCart
const onAddToCart = (product: Product) => {
  // Lógica para agregar al carrito
  console.log(`${product.name} ha sido agregado al carrito.`);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Componente raíz con Navbar
    children: [
      {
        path: "",
        element: <LoginForm />, // Ruta de inicio de sesión
      },
      {
        path: "registro",
        element: <Registro />, // Ruta de registro
      },
      {
        path: "dashboard",
        element: <RutaProtegida />, // Ruta protegida
        children: [
          {
            path: "",
            element: <Dashboard onAddToCart={onAddToCart} />,
          },
        ],
      },
      {
        path: "cart",
        element: <RutaProtegida />, // Protegido
        children: [
          {
            path: "",
            element: <Cart />,
          },
        ],
      },
      {
        path: "checkout",
        element: <RutaProtegida />, // Protegido
        children: [
          {
            path: "",
            element: <Checkout />,
          },
        ],
      },
      {
        path: "receipt",
        element: <RutaProtegida />, // Protegido
        children: [
          {
            path: "",
            element: <PaymentReceipt />,
          },
        ],
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
