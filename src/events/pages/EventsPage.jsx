import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventsService";
import EventCard from "../components/EventCard";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import "../../styles/events.css"

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Layout>
            <h1>All Events</h1>

            {events.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h3>No Events Available</h3>
                <p>Create your first event.</p>
            </div>
        ) : (
            <div className="events-grid">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        )}
        </Layout>
    );
}

export default EventsPage;