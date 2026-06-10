import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventsService";
import EventCard from "../components/EventCard";

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
        return <h2>Loading events...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>All Events</h1>

            {events.length === 0 ? (
                <p>No events available</p>
            ) : (
                events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                    />
                ))
            )}
        </div>
    );
}

export default EventsPage;