import axiosClient from "../../api/axiosClient";

export const requestOrganizerRole = async (reason) => {
    const formData = new FormData();
    formData.append("reason", reason);

    const response = await axiosClient.post(
        "/users/organizer-request",
        formData
    );
    return response.data;
};

export const getMyOrganizerRequest = async () => {
    const response = await axiosClient.get(
        "/users/organizer-request"
    );
    return response.data;
};

export const getProfile = async () => {
    const response = await axiosClient.get("/users/profile");
    return response.data;
};