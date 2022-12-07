import React, {createContext, useState} from 'react';

export const CartContext = createContext({
  ids: [],
  Qty: [],
  addCart: id => {},
  removeCart: id => {},
  resetCart: id => {},
  updateQuantity: id => {},
});

function CartContextProvider({children}) {
  const [CartId, setCartId] = useState([]);
  const [Quantity, setQuantity] = useState([]);

  function addCartItem(id, Qty) {
    // console.log('From Contexts' + id);
    setCartId(currentCartId => [...currentCartId, id]);
    setQuantity(currentCartQty => [...currentCartQty, Qty]);
  }

  function updateQuantity(id, Qty) {
    // const IndexOF = CartId.indexOf(id);
    const IndexOF = CartId.findIndex(x => x._id === id);
    console.log('INDEX FROM CTX', IndexOF);
    Quantity[IndexOF] = Qty;
  }

  function removeCartItem(id) {
    // console.log('FromContext' + id);
    // const IndexOF = CartId.indexOf(id);
    const IndexOF = CartId.findIndex(x => x._id === id);
    CartId.splice(IndexOF, 1);
    Quantity.splice(IndexOF, 1);
  }

  function resetCartItem() {
    setCartId([]);
    setQuantity([]);
  }
  const value = {
    ids: CartId,
    Qty: Quantity,
    addCart: addCartItem,
    removeCart: removeCartItem,
    resetCart: resetCartItem,
    updateQuantity: updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
