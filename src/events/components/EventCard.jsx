import { Link } from "react-router-dom";
import Card from "../../components/Card";
import "../../styles/events.css";

function EventCard({ event }) {

    return (
        <Card className="event-card">
            <h2 className="event-card-title">{event.title}</h2>

            <div className="event-card-details">

                <div className="event-card-detail-item">
                    <strong>Venue</strong>
                    <span>{event.venue}</span>
                </div>

                <div className="event-card-detail-item">
                    <strong>Date</strong>
                    <span>{new Date(event.eventDate).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short"
                    })}</span>
                </div>

                <div className="event-card-detail-item">
                    <strong>Price</strong>
                    <span>₹{event.price}</span>
                </div>

                <div className="event-card-detail-item">
                    <strong>Seats</strong>
                    <span>{event.availableSeats}/{event.totalSeats}</span>
                </div>

            </div>

            <div className="event-card-footer">
                <Link
                    className="event-card-link"
                    to={`/events/${event.id ?? event._id}`}
                >
                    View Details
                </Link>
            </div>

        </Card>
    );
}

export default EventCard;