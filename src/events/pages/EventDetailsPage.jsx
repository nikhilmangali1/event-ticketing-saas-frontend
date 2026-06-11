import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/eventsService";
import { bookTicket } from "../../tickets/services/ticketService";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import Button from "../../components/Button";

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
        return <h2>Event not found</h2>;
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
            <h1>{event.title}</h1>

            <p>
                <strong>Description:</strong> {event.description}
            </p>

            <p>
                <strong>Venue:</strong> {event.venue}
            </p>

            <p>
                <strong>Date:</strong> {event.eventDate}
            </p>

            <p>
                <strong>Total Seats:</strong> {event.totalSeats}
            </p>

            <p>
                <strong>Available Seats:</strong> {event.availableSeats}
            </p>
            <hr />

            <Button
                onClick={handleBookTicket}
                disabled={bookingLoading}
            >
                {bookingLoading ? "Booking..." : "Book Ticket"}
            </Button>

            {bookingMessage && (
                <p>{bookingMessage}</p>
            )}
            <Button onClick={() => navigate(`/events/edit/${id}`)}>
                Update Event
            </Button>

            <Button onClick={handleDelete}>
                Delete Event
            </Button>
        </Layout>
        
    );
}

export default EventDetailsPage;