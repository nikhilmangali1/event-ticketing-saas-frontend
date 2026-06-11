import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/eventsService";
import { bookTicket } from "../../tickets/services/ticketService";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "../../styles/event-details.css";

function EventDetailsPage() {

    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [bookingMessage, setBookingMessage] = useState("");
    const [bookingLoading, setBookingLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load event");
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
        return <ErrorMessage message={error}/>;
    }

    if (!event) {
    return <ErrorMessage message="Event not found" />;
    }

    const handleBookTicket = async () => {
        try {
            setBookingLoading(true);

            const response = await bookTicket(id);

            setBookingMessage(
                `Ticket booked successfully. Ticket ID: ${response.ticketId}`
            );
            const updatedEvent = await getEventById(id);
            setEvent(updatedEvent);

        } catch (error) {

            console.error(error);

            if (error.response?.data?.message) {
                setBookingMessage(error.response.data.message);
            } else {
                setBookingMessage("Failed to book ticket");
            }

        } finally {
            setBookingLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteEvent(id);

            navigate("/events");

        } catch (error) {
            console.error(error);
            alert("Failed to delete event");
        }
    };
    

    return (
        <Layout>

            <div className="event-details-container">

                <Card>

                    <h1 className="event-details-title">
                        {event.title}
                    </h1>

                    <p className="event-details-description">
                        {event.description}
                    </p>

                    <div className="event-info">

                        <div className="event-info-item">
                            <strong>Venue</strong>
                            <div>{event.venue}</div>
                        </div>

                        <div className="event-info-item">
                            <strong>Date</strong>
                            <div>
                            {new Date(event.eventDate).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short"
                            })}
                        </div>
                        </div>

                        <div className="event-info-item">
                            <strong>Price</strong>
                            <div>₹{event.price}</div>
                        </div>

                        <div className="event-info-item">
                            <strong>Seats</strong>
                            <div>
                                {event.availableSeats}/
                                {event.totalSeats}
                            </div>
                        </div>

                        <div className="event-info-item">
                            <strong>Organizer</strong>
                            <div>
                                {event.organizerName}
                            </div>
                        </div>

                    </div>

                    <div className="event-actions">

                        <Button
                            onClick={handleBookTicket}
                            disabled={bookingLoading}
                        >
                            {bookingLoading
                                ? "Booking..."
                                : "Book Ticket"}
                        </Button>

                        <Button
                            onClick={() =>
                                navigate(`/events/edit/${id}`)
                            }
                        >
                            Update Event
                        </Button>

                        <Button
                            onClick={handleDelete}
                        >
                            Delete Event
                        </Button>

                    </div>

                    {bookingMessage && (
                        <div className="booking-message">
                            {bookingMessage}
                        </div>
                    )}

                </Card>

            </div>

        </Layout>
    );
}

export default EventDetailsPage;