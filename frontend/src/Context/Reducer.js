const Reducer = (state, action) => {
  //console.log(state);
  //console.log(action);
  if (action.type === "ADD") {
    const updateTotalAmount = state.totalAmount + action.item.price * 1;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //return product
    const existingItemCar = state.items[existingCartItemIndex];
    let updateItems;

    if (existingItemCar) {
      const updateItem = {
        ...existingItemCar,
        count: existingItemCar.count + 1,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "DECREASE") {
    const updateTotalAmount = state.totalAmount - action.item.price * 1;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //return product
    const existingItemCar = state.items[existingCartItemIndex];
    let updateItems;

    if (existingItemCar.count !== 1) {
      const updateItem = {
        ...existingItemCar,
        count: existingItemCar.count - 1,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = state.items.filter((item) => item.id !== action.item.id);
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updateTotalAmount =
      state.totalAmount - existingItem.price * existingItem.count;
    let updateItems;
    if (existingItem) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItem = { ...existingItem };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  return state;
};
export default Reducer;
