import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getOrganizerRequests, approveRequest, rejectRequest } from "../services/adminService";
import { showErrorToast } from "../../utils/toastService";
import "../../styles/events.css";

function OrganizerRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [message, setMessage] = useState("");

    const loadRequests = async () => {
        setLoading(true);
        try {
            const data = await getOrganizerRequests();
            setRequests(data || []);
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Failed to load organizer requests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const handleApprove = async (requestId) => {
        setActionLoading(requestId);
        try {
            await approveRequest(requestId);
            setMessage("Request approved.");
            await loadRequests();
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Failed to approve request.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (requestId) => {
        setActionLoading(requestId);
        try {
            await rejectRequest(requestId);
            setMessage("Request rejected.");
            await loadRequests();
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Failed to reject request.");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="events-page">
                <div className="events-header">
                    <h1>Organizer Requests</h1>
                    <p>Review pending organizer role requests and respond with approval or rejection.</p>
                </div>

                {message && <p className="auth-message">{message}</p>}

                {requests.length === 0 ? (
                    <div className="empty-state">
                        <h2>No organizer requests found.</h2>
                        <p>Users will appear here after they submit organizer requests.</p>
                    </div>
                ) : (
                    <div className="events-grid">
                        {requests.map((request) => (
                            <div key={request.requestId} className="request-card">
                                <div className="request-card-header">
                                    <div>
                                        <h3>{request.userEmail || request.userName || request.name || "User"}</h3>
                                        <p className="request-meta">Requested: {request.requestedAt ? new Date(request.requestedAt).toLocaleString() : "-"}</p>
                                    </div>
                                    <span className={`status-chip status-${request.status?.toLowerCase()}`}>
                                        {request.status}
                                    </span>
                                </div>

                                <div className="request-detail">
                                    <strong>Reason</strong>
                                    <p>{request.reason || request.requestReason || "-"}</p>
                                </div>

                                {request.reviewComment && (
                                    <div className="request-detail">
                                        <strong>Admin Comment</strong>
                                        <p>{request.reviewComment}</p>
                                    </div>
                                )}

                                {request.status === "PENDING" && (
                                    <div className="request-actions">
                                        <button
                                            onClick={() => handleApprove(request.requestId)}
                                            disabled={actionLoading === request.requestId}
                                            className="approve-btn"
                                        >
                                            {actionLoading === request.requestId ? "Working..." : "Approve"}
                                        </button>
                                        <button
                                            onClick={() => handleReject(request.requestId)}
                                            disabled={actionLoading === request.requestId}
                                            className="reject-btn"
                                        >
                                            {actionLoading === request.requestId ? "Working..." : "Reject"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default OrganizerRequestsPage;
