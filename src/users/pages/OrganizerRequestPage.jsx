import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestOrganizerRole, getMyOrganizerRequest } from "../services/userService";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../styles/auth.css";

function OrganizerRequestPage() {
    const [reason, setReason] = useState("");
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const loadRequest = async () => {
        setLoading(true);
        try {
            const data = await getMyOrganizerRequest();
            setRequest(data);
        } catch (error) {
            console.error(error);
            setMessage("Unable to load your organizer request.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequest();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!reason.trim()) {
            setMessage("Please provide a reason for your organizer request.");
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            await requestOrganizerRole(reason.trim());
            setMessage("Your request has been submitted.");
            setReason("");
            await loadRequest();
        } catch (error) {
            console.error(error);
            setMessage("Failed to submit request. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner />
            </Layout>
        );
    }

    const isPending = request?.status === "PENDING";
    const isApproved = request?.status === "APPROVED";
    const isRejected = request?.status === "REJECTED";

    return (
        <Layout>
            <div className="auth-container">
                <h1>Organizer Role Request</h1>
                <p className="auth-subtitle">
                    Submit your organizer request and track its status here.
                </p>

                {request ? (
                    <div className="auth-card">
                        <div className="status-row">
                            <span className={`status-chip status-${request.status?.toLowerCase()}`}>
                                {request.status || "Unknown"}
                            </span>
                            <span className="status-meta">
                                Submitted: {request.requestedAt ? new Date(request.requestedAt).toLocaleString() : "-"}
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
                        {isApproved && (
                            <p className="auth-message">Your organizer access has been approved. You can logout and login again for the new role to take effect.</p>
                        )}
                        {isRejected && (
                            <p className="auth-message">Your request was rejected. You may submit a new request with more detail.</p>
                        )}
                    </div>
                ) : (
                    <div className="auth-card auth-card-alt">
                        <p>
                            Write a clear reason for why you need organizer access. Admins will review this request and respond.
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <label htmlFor="reason">Request Reason</label>
                    <textarea
                        id="reason"
                        rows="6"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Describe why you want organizer access"
                        disabled={isPending || isApproved}
                    />

                    <button type="submit" disabled={submitting || isPending || isApproved} className="auth-primary-btn">
                        {submitting ? "Submitting..." : isApproved ? "Approved" : isPending ? "Pending Approval" : "Submit Request"}
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                <button className="auth-secondary-btn" type="button" onClick={() => navigate("/home")}>Back to Home</button>
            </div>
        </Layout>
    );
}

export default OrganizerRequestPage;
