import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/events";

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
});

export const getAllEvents = async () => {
    const response = await axios.get(
        BASE_URL,
        getAuthHeaders()
    );

    return response.data;
};

export const getEventById = async (id) => {
    const response = await axios.get(
        `${BASE_URL}/${id}`,
        getAuthHeaders()
    );

    return response.data;
};

export const createEvent = async (eventData) => {
    const response = await axios.post(
        `${BASE_URL}/create`,
        eventData,
        getAuthHeaders()
    );

    return response.data;
};

export const updateEvent = async (eventId, eventData) => {
    const response = await axios.put(
        `${BASE_URL}/${eventId}`,
        eventData,
        getAuthHeaders()
    );

    return response.data;
};

export const deleteEvent = async (eventId) => {
    await axios.delete(
        `${BASE_URL}/${eventId}`,
        getAuthHeaders()
    );
};