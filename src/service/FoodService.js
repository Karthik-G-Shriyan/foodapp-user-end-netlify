import axios from "axios";

const API_URL = "https://online-food-application-backend-railway-app-production.up.railway.app/api/foods";

export const fetchFoodList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // returns JSON array
  } catch (error) {
    console.error("Error fetching food list:", error);
    throw error;
  }
};


export const fetchFoodDetails = async (id) => {
    try {
      const response = await axios.get(API_URL+"/"+id);
      if (response.status === 200) {
        return response.data;
       
      }
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };