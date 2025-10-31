// import React, { useState } from 'react';
import Emptycart from './EmptyCart';
import { useCartStore } from './useCart';
import DeleteIcon from '@mui/icons-material/Delete';

// export default function Cart() {
//   const {
//     cart,
//     removeFromCart,
//     clearCart,
//     decreaseQuantity,
//     increaseQuantity,
//   } = useCartStore();
//   // return <div>{!cartItem && <Emptycart /> && setCartItem(0)}</div>;
//   return (
//     <>
//       <div>
//         {cart.length === 0 ? (
//           <Emptycart />
//         ) : (
//           <>
//             <h2>🛒Cart</h2>
//             {cart.map((item) => (
//               <div key={item.id} style={{ marginBottom: '1rem' }}>
//                 <strong>{item.title}</strong> - ${item.price} × {item.quantity}
//                 {/* {item.image} */}
//                 <div>
//                   <button onClick={() => decreaseQuantity(item.id)}>-</button>
//                   <button onClick={() => increaseQuantity(item.id)}>+</button>
//                   <button onClick={() => removeFromCart(item.id)}>
//                     delete
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button onClick={clearCart}>Clear cart</button>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
  const {
    cart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCartStore();
  return cart.length === 0 ? (
    <Emptycart />
  ) : (
    <>
      {' '}
      <h2 style={{ textAlign: 'center', padding: 7 }}>🛒Cart</h2>
      <TableContainer
        component={Paper}
        sx={{ height: 'auto', padding: 10, paddingTop: 0 }}
      >
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell align="start">title</TableCell>
              <TableCell align="center">price</TableCell>
              <TableCell align="center">quantity</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ margin: 'auto' }}>
            {cart.map((item) => (
              <TableRow
                key={item.title}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  align="start"
                  sx={{ color: '#111880ff', fontFamily: 'causten' }}
                >
                  {item.title}
                </TableCell>
                <TableCell align="center">
                  {`${item.price * item.quantity} $`}
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      padding: '8px 0',
                      backgroundColor: '#b8c9d7ff',
                      lineHeight: '0.5',
                      minWidth: '18px',
                      borderRadius: 5,
                      cursor: 'pointer',
                    }}
                  >
                    -
                  </button>
                  <span style={{ padding: 4 }}>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    style={{
                      padding: '8px 0',
                      backgroundColor: '#b8c9d7ff',
                      lineHeight: '0.5',
                      minWidth: '18px',
                      borderRadius: 5,
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={() => removeFromCart(item.id)}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <button onClick={clearCart}>Delete cart</button>
        </Table>
      </TableContainer>
    </>
  );
}
