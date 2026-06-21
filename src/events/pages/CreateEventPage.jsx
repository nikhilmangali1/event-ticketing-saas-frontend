import { useState } from "react";
import { createEvent } from "../services/eventsService";
import Layout from "../../components/Layout";
import EventForm from "../components/EventForm";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toastService";

function CreateEventPage() {

    const navigate = useNavigate();

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    })();

    const canCreate = user?.role === "ORGANIZER" || user?.role === "ADMIN";

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        eventDate: "",
        totalSeats: "",
        price: ""
    });

    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (file) => {
        setImage(file);
    };

    const handleSubmit = async (e) => {
        setSubmitting(true);

        try {
            const event = await createEvent({
                ...formData,
                image
            });
            navigate(`/events/${event.id}`);
        } catch (error) {
            console.error(error);
            showErrorToast(
                error.response?.data?.message || "Unable to create event.",
                error.response?.data?.details || null
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!canCreate) {
        return (
            <Layout>
                <div className="event-form-page">
                    <div className="empty-state">
                        <div className="empty-state-icon">🚫</div>
                        <h2>Access Restricted</h2>
                        <p>Only organizers and admins can create events.</p>
                        <p>Submit an organizer request from your profile to gain access.</p>
                        <button
                            className="btn-create-event empty-cta"
                            onClick={() => navigate("/become-organizer")}
                        >
                            Request Organizer Access
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="event-form-page">
                <div className="event-form-header">
                    <div className="event-form-header-text">
                        <h1>Create Event</h1>
                        <p>Fill in the details below to publish your event.</p>
                    </div>
                    <button
                        className="btn-form-page-back"
                        onClick={() => navigate("/events")}
                    >
                        &larr; Events
                    </button>
                </div>

                <EventForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    submitButtonText="Create Event"
                    showTotalSeats={true}
                    onImageChange={handleImageChange}
                    selectedImage={image}
                    submitting={submitting}
                    onCancel={() => navigate("/events")}
                />
            </div>
        </Layout>
    );
}

export default CreateEventPage;