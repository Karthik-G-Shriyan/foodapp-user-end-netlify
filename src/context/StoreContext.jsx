import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/FoodService";

import { addToCart, loadCartData, removeQtyFromCart } from "../service/CartService";


export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

  const [foodList, setFoodList] = useState([]);

  const [quantities, setQuantities] = useState({});

  const [token, setToken] = useState("");



  const increaseQty = async (foodId) => {

    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
      await addToCart(foodId, token);
    
  }

  const decreaseQty = async (foodId) => {

    setQuantities((prev) => ({ ...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0 }));
    await removeQtyFromCart(foodId, token);

  }

  const removeFromCart = (foodId) => {

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[foodId];
      return updatedQuantities;
    }
    )
  }


  const loadCartItems = async (token) => {
    if (!token) return;
    try {
      
      const items = await loadCartData(token);
      setQuantities(items);
    } catch (error) {

      console.log("Failed to fetch cart:", error.message);
    }
  };

  const contextValue = {
    token,
    setToken,
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    setQuantities,
    loadCartItems
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
      } catch (error) {
        console.error("Error fetching food list:", error);
        setFoodList([]); // fallback to empty list
      }

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartItems(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
