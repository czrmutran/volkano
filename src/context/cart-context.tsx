"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  nome: string;
  codigo: string | null;
  desc: string;
  img: string;
  alt: string;
  linha: string;
  imagens: string[];
  slug: string | null;
  video_url?: string | null;
  quantity?: number; // New field for quantity
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // New function
  isInCart: (id: string) => boolean;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("volkano_orcamento");
    if (saved) {
      try {
        const parsedCart = JSON.parse(saved);
        // Ensure legacy items have quantity = 1
        const normalizedCart = parsedCart.map((item: CartItem) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCart(normalizedCart);
      } catch (e) {
        console.error("Erro ao carregar carrinho", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("volkano_orcamento", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (item: CartItem) => {
    if (!cart.some((i) => i.id === item.id)) {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: string) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        clearCart,
        cartCount: cart.length, // Count unique items, not total quantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
