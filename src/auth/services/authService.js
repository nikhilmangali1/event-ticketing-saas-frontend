import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/auth";

export const login = async (email, password) => {

    const response = await axios.post(
        `${BASE_URL}/login`,
        {
            email,
            password
        }
    );
    return response.data;
};


export const register = async(
    name,
    email,
    password
) => {
    const response = await axios.post(
        `${BASE_URL}/register`,
        {
            name,
            email,
            password
        }
    );
    return response.data;
};


export const logout = async(refreshToken) => {
    await axios.post(
        `${BASE_URL}/logout`,
        {
            refreshToken
        }
    );
};

export const refreshAccessToken = async (refreshToken) => {
    const response = await axios.post(
        `${BASE_URL}/refresh`,
        {
            refreshToken
        }
    );
    return response.data;
};