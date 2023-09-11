import React, { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import Reducer from "./Reducer";
import { getItemsCart } from "../Services/Services";
import { useState } from "react";

//default values
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Create Context
export const Context = createContext();

const Provider = ({ children }) => {
  const [ft, setUser] = useState(true);
  useEffect(() => {
    getItemsCart(window.BaseUrlGeneral + "Cart")
      .then((response) => {
        defaultCartState.items = response.data.listCart;
        defaultCartState.totalAmount = response.data.orderHeader.orderTotal;
        setUser(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [state, dispatchCartAction] = useReducer(Reducer, defaultCartState);

  const addItemToHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const decreaseItemToHandler = (item) => {
    dispatchCartAction({
      type: "DECREASE",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  return (
    <Context.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToHandler,
        decreaseItem: decreaseItemToHandler,
        removeItem: removeItemFromCartHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
