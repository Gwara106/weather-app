import axios from "axios";
import { API_ENDPOINTS } from '../config';

export const callAuthInit = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(API_ENDPOINTS.AUTH.INIT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.data) {
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      return response.data;
    } else {
      throw new Error("Invalid response format from server");
    }
  } catch (error) {
    console.error("Error calling auth init:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};
