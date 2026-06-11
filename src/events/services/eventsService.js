import axiosClient from "../../api/axiosClient";

const BASE_URL = "/events";

export const getAllEvents = async () => {
    const response = await axiosClient.get(BASE_URL);
    return response.data;
};

export const getEventById = async (id) => {
    const response = await axiosClient.get(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

export const createEvent = async (eventData) => {
    const response = await axiosClient.post(
        `${BASE_URL}/create`,
        eventData
    );

    return response.data;
};

export const updateEvent = async (eventId, eventData) => {
    const response = await axiosClient.put(
        `${BASE_URL}/${eventId}`,
        eventData
    );

    return response.data;
};

export const deleteEvent = async (eventId) => {
    await axios.delete(
        `${BASE_URL}/${eventId}`
    );
};