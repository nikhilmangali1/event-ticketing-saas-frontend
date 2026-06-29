import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../services/eventsService";
import EventForm from "../components/EventForm";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { showErrorToast } from "../../utils/toastService";

function UpdateEventPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [existingImageUrl, setExistingImageUrl] = useState(null);
    const [readOnlySeats, setReadOnlySeats] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        eventDate: "",
        price: ""
    });

    const [image, setImage] = useState(null);

    useEffect(() => {

        const fetchEvent = async () => {
            try {

                const event = await getEventById(id);

                setFormData({
                    title: event.title || "",
                    description: event.description || "",
                    venue: event.venue || "",
                    eventDate: event.eventDate
                        ? event.eventDate.slice(0, 16)
                        : "",
                    price: event.price || ""
                });

                if (event.imageUrl) {
                    setExistingImageUrl(event.imageUrl);
                }

                if (event.availableSeats !== undefined && event.totalSeats !== undefined) {
                    setReadOnlySeats({
                        available: event.availableSeats,
                        total: event.totalSeats
                    });
                }

            } catch (error) {
                console.error(error);
                    showErrorToast(
                        error.response?.data?.message || "Unable to load event details.",
                        error.response?.data?.details || null
                    );
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();

    }, [id]);

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
            await updateEvent(id, {
                ...formData,
                image
            });
            navigate(`/events/${id}`);
        } catch (error) {
            console.error(error);
            showErrorToast(
                error.response?.data?.message || "Unable to update event.",
                error.response?.data?.details || null
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Layout>
            <div className="event-form-page">
                <div className="event-form-header">
                    <div className="event-form-header-text">
                        <h1>Update Event</h1>
                        <p>Modify event details and save your changes</p>
                    </div>
                    <button
                        className="btn-form-page-back"
                        onClick={() => navigate(`/events/${id}`)}
                    >
                        &larr; Back
                    </button>
                </div>

                {existingImageUrl && !image && (
                    <div className="current-image-section" style={{ maxWidth: 880, margin: "0 auto 20px" }}>
                        <div className="current-image-preview">
                            <img src={existingImageUrl} alt="Current event" />
                        </div>
                    </div>
                )}

                <EventForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    submitButtonText="Update Event"
                    onImageChange={handleImageChange}
                    selectedImage={image}
                    readOnlySeats={readOnlySeats}
                    submitting={submitting}
                    onCancel={() => navigate(`/events/${id}`)}
                />
            </div>
        </Layout>
    );
}

export default UpdateEventPage;