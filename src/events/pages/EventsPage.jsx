import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventsService";
import EventCard from "../components/EventCard";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import "../../styles/events.css"

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    })();

    const canCreate = user?.role === "ORGANIZER" || user?.role === "ADMIN";

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

    const filteredEvents = events.filter((event) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            event.title?.toLowerCase().includes(query) ||
            event.venue?.toLowerCase().includes(query) ||
            event.description?.toLowerCase().includes(query) ||
            event.organizerName?.toLowerCase().includes(query)
        );
    });

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Layout>
                <ErrorMessage message={error} />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="events-page">
                <div className="events-header">
                    <div className="events-header-top">
                        <div>
                            <h1>Events</h1>
                            <p>Discover and book tickets for upcoming events.</p>
                        </div>
                        {canCreate && (
                            <button
                                className="btn-create-event"
                                onClick={() => navigate("/events/create")}
                            >
                                + Create Event
                            </button>
                        )}
                    </div>
                    <div className="search-bar">
                        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search events by title, venue, or organizer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                className="search-clear"
                                onClick={() => setSearchQuery("")}
                                type="button"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>

                {events.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📋</div>
                        <h2>No Events Yet</h2>
                        <p>There are no events available right now.</p>
                        {canCreate && (
                            <button
                                className="btn-create-event empty-cta"
                                onClick={() => navigate("/events/create")}
                            >
                                Create Your First Event
                            </button>
                        )}
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h2>No Results Found</h2>
                        <p>No events match your search. Try different keywords.</p>
                        <button
                            className="btn-create-event empty-cta"
                            onClick={() => setSearchQuery("")}
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="events-grid">
                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default EventsPage;