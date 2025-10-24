// import React, { useState } from 'react';
import Emptycart from './EmptyCart';
import { useCartStore } from './useCart';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCartStore();
  // return <div>{!cartItem && <Emptycart /> && setCartItem(0)}</div>;
  return (
    <>
      <div>
        {cart.length === 0 ? (
          <Emptycart />
        ) : (
          <>
            <h2>🛒Cart</h2>
            {cart.map((item) => (
              <div key={item.id} style={{ marginBottom: '1rem' }}>
                <strong>{item.title}</strong> - ${item.price} × {item.quantity}
                {/* {item.image} */}
                <div>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>
                    delete
                  </button>
                </div>
              </div>
            ))}

            <button onClick={clearCart}>Clear cart</button>
          </>
        )}
      </div>
    </>
  );
}
