import React from 'react';
import { CartItem as CartItemType } from '@/types/cart';
import { CartItem } from './CartItem';

interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartList: React.FC<CartListProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
