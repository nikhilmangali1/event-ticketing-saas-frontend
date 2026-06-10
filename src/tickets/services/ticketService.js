import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/tickets";

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
});

export const bookTicket = async (eventId) => {
    const response = await axios.post(
        `${BASE_URL}/book/${eventId}`,
        {},
        getAuthHeaders()
    );

    return response.data;
};

export const getMyTickets = async () => {
    const response = await axios.get(
        `${BASE_URL}/my`,
        getAuthHeaders()
    );

    return response.data;
};

export const cancelTicket = async (ticketId) => {
    await axios.patch(
        `${BASE_URL}/cancel/${ticketId}`,
        {},
        getAuthHeaders()
    );
};