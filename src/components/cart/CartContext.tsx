'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  getCartItems,
  saveCartItems,
  addCartItem,
  CartItem,
} from '@/lib/cart-storage';

interface CartContextType {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(getCartItems());
    const handler = () => setItems(getCartItems());
    window.addEventListener('rbs-cart-updated', handler);
    return () => window.removeEventListener('rbs-cart-updated', handler);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    addCartItem(item);
    setItems(getCartItems());
  }, []);

  const removeItem = useCallback((id: string) => {
    const updated = getCartItems().filter((i) => i.id !== id);
    saveCartItems(updated);
    setItems(updated);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    const updated = getCartItems().map((i) =>
      i.id === id ? { ...i, qty } : i,
    );
    saveCartItems(updated);
    setItems(updated);
  }, []);

  const clearCart = useCallback(() => {
    saveCartItems([]);
    setItems([]);
  }, []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((o) => !o),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
