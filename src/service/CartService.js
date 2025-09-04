import axios from "axios";

const BASE_URL = "http://localhost:8080/api/cart";

export const loadCartData = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.items; // return only items
  } catch (error) {
    console.error("Error loading cart items:", error);
    throw error; // rethrow to handle in component if needed
  }
};

export const addToCart = async (foodId , token) => {
    try {
          await axios.post(
            BASE_URL,
            { foodId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error('Failed to increase quantity:', error);
          if (error.response && error.response.status === 403) {
            console.error('403 Forbidden – check permissions or token.');
          }
        }
    
}


export const removeQtyFromCart = async (foodId , token) => {

    try {
      await axios.post(
        BASE_URL+"/remove",
        { foodId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Failed to increase quantity:', error);
      if (error.response && error.response.status === 403) {
        console.error('403 Forbidden – check permissions or token.');
      }
    }

}


