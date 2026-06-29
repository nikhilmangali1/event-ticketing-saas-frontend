import axiosClient from "../../api/axiosClient";

export const getOrganizerRequests = async () => {
    const response = await axiosClient.get(
        "/admin/user-organizer/requests"
    );
    return response.data;
};

export const approveRequest = async (requestId) => {
    await axiosClient.patch(
        `/admin/user-organizer/${requestId}/approve`
    );
};

export const rejectRequest = async (requestId) => {
    await axiosClient.patch(
        `/admin/user-organizer/${requestId}/reject`
    );
};