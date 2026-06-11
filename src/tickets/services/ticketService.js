import axiosClient from "../../api/axiosClient";

const BASE_URL = "/tickets";

export const bookTicket = async (eventId) => {
    const response = await axiosClient.post(
        `${BASE_URL}/book/${eventId}`
    );

    return response.data;
};

export const getMyTickets = async () => {
    const response = await axiosClient.get(
        `${BASE_URL}/my`
    );

    return response.data;
};

export const cancelTicket = async (ticketId) => {
    await axiosClient.patch(
        `${BASE_URL}/cancel/${ticketId}`
    );
};