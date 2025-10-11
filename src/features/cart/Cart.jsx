import { useState } from 'react';
import Emptycart from './EmptyCart';

export default function Cart() {
  const [cartItem, setCartItem] = useState(null);
  return (
    <>
      {cartItem.length === 0 && <Emptycart />}
      <div>cart</div>
    </>
  );
}
