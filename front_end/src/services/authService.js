import axiosInstance from "../api/axiosInstance";

export const login = async (username, password) => {
  const response = await axiosInstance.post("/api/login", {
    username,
    password,
  });

  return response.data;
};