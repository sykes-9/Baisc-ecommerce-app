import React, {createContext, useState, useEffect} from 'react';

// create context
export const CartContext = createContext();

const CartProvider = ({children}) => {
  // cart state
  const [cart, setCart ] = useState([]);
  // item amount state
  const [itemAmount, setAmount] = useState(0);

  // add to cart
  const addToCart = (product, id)=>{
    const newItem = { ...product, amount: 1 };
    // check if the item is already in the cart
    const carItem = cart.find((item) => {
       return item.id === id;
    });
    // if cart item is already in the cart
    if (carItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id){
          return { ...item, amount: carItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove from cart
const removeFromCart = (id) => {
  const newCart = cart.filter((item) => {
    return item.id !== id;
  });
  setCart(newCart);
};

// clear cart
const clearCart = () => {
  setCart([]);
};

// increase amount
const increaseAmount = (id) => {
  const cartItem = cart.find((item) => item.id === id);
  addToCart(cartItem, id);
};

// decrease amount
const decreaseAmount = (id) => {
  const carItem = cart.find((item) => {
    return item.id === id;
  });
  if (carItem) {
    const newCart = cart.map(item => {
      if (item.id === id) {
        return {...item, amount: carItem.amount - 1}
      } else {
        return item;
      }
    });
    setCart(newCart);
  }

  if (carItem.amount < 2) {
  removeFromCart(id);
  }
};

  return( 
    <CartContext.Provider 
     value={{ 
       cart, 
       addToCart, 
       removeFromCart, 
       clearCart,
       increaseAmount, 
       decreaseAmount,
       itemAmount, 
     }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
