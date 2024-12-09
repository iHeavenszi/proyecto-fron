import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../Banner/Banner";
import { useAuth } from "../Auth/AuthProvider";
import { useCart } from "../Cart/Cartcontext";
import "../../../src/app.css";
import "./Home.css";
import { Product } from "../types/types";



const Dashboard: React.FC = () => {
  const auth = useAuth();
  const { addToCart } = useCart();  // Usa solo el addToCart del contexto
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://server-3dlw.onrender.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        toast.error("Error al cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.getUser()) {
      fetchProducts();
    }
  }, [auth]);

  const handleAddProduct = (product: Product) => {
    addToCart(product); // Usa solo el addToCart del contexto
    toast.success(`${product.name} agregado al carrito`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="home-container">
        <Banner />
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <button onClick={() => handleAddProduct(product)}>
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};


export default Dashboard;
