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
    const formData = new FormData();
    
    // Add text fields
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("venue", eventData.venue);
    formData.append("eventDate", eventData.eventDate);
    formData.append("price", eventData.price);
    formData.append("totalSeats", eventData.totalSeats);
    
    // Add image file if present
    if (eventData.image instanceof File) {
        formData.append("image", eventData.image);
    }
    
    const response = await axiosClient.post(
        `${BASE_URL}/create`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const updateEvent = async (eventId, eventData) => {
    const formData = new FormData();
    
    // Add optional text fields
    if (eventData.title) formData.append("title", eventData.title);
    if (eventData.description) formData.append("description", eventData.description);
    if (eventData.venue) formData.append("venue", eventData.venue);
    if (eventData.eventDate) formData.append("eventDate", eventData.eventDate);
    if (eventData.price) formData.append("price", eventData.price);
    
    // Add image file if present
    if (eventData.image instanceof File) {
        formData.append("image", eventData.image);
    }
    
    const response = await axiosClient.put(
        `${BASE_URL}/${eventId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const deleteEvent = async (eventId) => {
    await axiosClient.delete(
        `${BASE_URL}/${eventId}`
    );
};