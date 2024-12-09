    // CartContext.tsx
    import React, { createContext, useContext, useState } from "react";
    import { Product } from "../types/types";

    interface CartItem extends Product {
    quantity: number; // Cada producto en el carrito tiene cantidad
    }

    interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
    }

    const CartContext = createContext<CartContextProps | undefined>(undefined);

    export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
            return prev.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        }
        return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, quantity } : item
        )
        );
    };

    return (
        <CartContext.Provider
        value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}
        >
        {children}
        </CartContext.Provider>
    );
    };

    export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de CartProvider");
    }
    return context;
    };
