import { Link } from "react-router-dom";

function EventCard({ event }) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
            }}
        >
            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>{event.venue}</p>

            <Link to={`/events/${event.id}`}>
                View Details
            </Link>
        </div>
    );
}

export default EventCard;