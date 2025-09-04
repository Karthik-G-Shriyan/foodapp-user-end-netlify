import axios from "axios";

const API_URL = "https://online-food-application-backend-railway-app-production.up.railway.app/api";

export const registerUser = async (data) => {
    try {
        const response = await axios.post(
            API_URL + "/register"
            , data
        );
        return response;
    }
    catch (error) {
        console.log("error while registering");
        throw error;
    }
}


export const login = async (data) => {

    try {
        const response = await axios.post(
            API_URL + "/login", data
        );
        return response;
    }
    catch (error) {
        console.log("error while log in");
        throw error;
    }

}
