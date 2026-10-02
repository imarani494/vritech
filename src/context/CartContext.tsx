'use client';

import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { Product } from '@/types/product';
import { CartAction, CartContextType, CartItem, CartState } from '@/types/cart';

const STORAGE_KEY = 'store_cart_v1';

const initialState: CartState = {
  items: [],
  isHydrated: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'INITIALIZE_CART':
      return {
        ...state,
        items: action.payload.items,
        isHydrated: true,
      };

    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        const currentQty = updatedItems[existingIndex].quantity;
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: currentQty + quantity,
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload.productId),
      };

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validItems: CartItem[] = parsed.filter(
            (item: unknown) =>
              item &&
              typeof item === 'object' &&
              'product' in item &&
              'quantity' in item &&
              typeof (item as CartItem).quantity === 'number' &&
              (item as CartItem).quantity > 0 &&
              (item as CartItem).product?.id
          );
          dispatch({ type: 'INITIALIZE_CART', payload: { items: validItems } });
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse cart from localStorage:', e);
    }
    dispatch({ type: 'INITIALIZE_CART', payload: { items: [] } });
  }, []);

  useEffect(() => {
    if (!state.isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [state.items, state.isHydrated]);

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const subtotal = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [state.items]);

  const tax = useMemo(() => {
    return subtotal * 0.08;
  }, [subtotal]);

  const shipping = useMemo(() => {
    if (subtotal === 0 || subtotal >= 50) return 0;
    return 5.99;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + tax + shipping;
  }, [subtotal, tax, shipping]);

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    tax,
    shipping,
    total,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
