// import { useState } from 'react';

// import { createContext } from 'react';

// export default function useCart() {
// const cardContext = createContext(null);

//   const [cartItem, setCartItem] = useState([]);
//   const addToCart = function () {
//     return [...cartItem, newItem];
//   };

//   const deleteItem = function (id) {
//     return cartItem.filter((item) => item.id !== id);
//   };

//   return (
//     <div>
//       <cardContext value={(cartItem, addToCart, deleteItem)}></cardContext>
//     </div>
//   );
// }
