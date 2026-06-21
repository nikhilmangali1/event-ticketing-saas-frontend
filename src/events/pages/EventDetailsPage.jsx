import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/eventsService";
import { bookTicket } from "../../tickets/services/ticketService";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import Card from "../../components/Card";
import EventHero from "../components/EventHero";
import { showErrorToast } from "../../utils/toastService";
import "../../styles/event-details.css";

function EventDetailsPage() {

    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [errorDetails, setErrorDetails] = useState(null);
    const [bookingMessage, setBookingMessage] = useState("");
    const [bookingMessageType, setBookingMessageType] = useState("");
    const [bookingLoading, setBookingLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    })();

    useEffect(() => {

        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to load event");
                setErrorDetails(err.response?.data?.details || null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();

    }, [id]);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorMessage message={error} details={errorDetails} />;
    }

    if (!event) {
        return <ErrorMessage message="Event not found" />;
    }

    const isOwner = user?.role === "ADMIN" || user?.email === event.organizerEmail;
    const isUser = user?.role === "USER";
    const canBook = isUser && !isOwner;
    const isSoldOut = event.availableSeats <= 0;

    const handleBookTicket = async () => {
        try {
            setBookingLoading(true);
            setBookingMessage("");

            const response = await bookTicket(id);

            setBookingMessageType("success");
            setBookingMessage(
                `Ticket booked successfully. Ticket ID: ${response.ticketId}`
            );
            const updatedEvent = await getEventById(id);
            setEvent(updatedEvent);

        } catch (error) {

            console.error(error);
            setBookingMessageType("error");

            if (error.response?.data?.message) {
                setBookingMessage(error.response.data.message);
            } else {
                setBookingMessage("Failed to book ticket");
            }

        } finally {
            setBookingLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true);
            await deleteEvent(id);
            navigate("/events");
        } catch (error) {
            console.error(error);
            showErrorToast(
                error.response?.data?.message || "Unable to delete event.",
                error.response?.data?.details || null
            );
            setShowDeleteModal(false);
        }
    };

    return (
        <Layout>

            <div className="event-details-container">

                <button
                    className="btn-back"
                    onClick={() => navigate("/events")}
                >
                    <span className="btn-back-arrow">&larr;</span>
                    Back to Events
                </button>

                <EventHero event={event} />

                <div className="event-details-content">

                    <div className="event-description-section">
                        <h2 className="section-title">About this event</h2>
                        <p className="event-description">
                            {event.description}
                        </p>

                        {isOwner && (
                            <div className="event-owner-actions">
                                <button
                                    onClick={() =>
                                        navigate(`/events/edit/${id}`)
                                    }
                                    className="btn-edit-event"
                                >
                                    ✎ Edit Event
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="btn-delete-event"
                                >
                                    🗑 Delete Event
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="event-booking-section">
                        <Card>
                            <h3 className="booking-card-title">
                                {canBook ? "Ready to attend?" : "Event Details"}
                            </h3>

                            <div className="booking-info-grid">
                                <div className="booking-info-item">
                                    <span className="booking-label">Price per ticket</span>
                                    <span className="booking-value">₹{event.price}</span>
                                </div>
                                <div className="booking-info-item">
                                    <span className="booking-label">Seats available</span>
                                    <span className={`booking-value ${isSoldOut ? "sold-out" : ""}`}>
                                        {isSoldOut ? "Sold Out" : `${event.availableSeats}/${event.totalSeats}`}
                                    </span>
                                </div>
                            </div>

                            {canBook ? (
                                <button
                                    onClick={handleBookTicket}
                                    disabled={bookingLoading || isSoldOut}
                                    className={`btn-book-ticket ${isSoldOut ? "btn-sold-out" : ""}`}
                                >
                                    {bookingLoading ? (
                                        <>
                                            <span className="btn-spinner" />
                                            Booking...
                                        </>
                                    ) : isSoldOut ? (
                                        "Sold Out"
                                    ) : (
                                        <>
                                            <span>🎫</span>
                                            Book Ticket Now
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="booking-notice">
                                    {isOwner ? "You are the organizer of this event." : "Booking is available for attendees."}
                                </div>
                            )}

                            {bookingMessage && (
                                <div className={`booking-message ${bookingMessageType}`}>
                                    {bookingMessage}
                                </div>
                            )}
                        </Card>
                    </div>

                </div>

            </div>

            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Delete Event</h3>
                        <p className="modal-message">
                            Are you sure you want to delete <strong>"{event.title}"</strong>? This action cannot be undone.
                        </p>
                        <div className="modal-actions">
                            <button
                                className="modal-btn-cancel"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-btn-delete"
                                onClick={handleDeleteConfirm}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? "Deleting..." : "Delete Event"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
}

export default EventDetailsPage;