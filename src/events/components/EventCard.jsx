import { Link } from "react-router-dom";
import Card from "../../components/Card";
import "../../styles/events.css";

function EventCard({ event }) {

    return (
        <Card className="event-card">

            <h2 className="event-card-title">
                {event.title}
            </h2>

            <div className="event-card-details">

                <div>
                    <strong>Venue:</strong> {event.venue}
                </div>

                <div>
                    <strong>Date:</strong>{" "}
                    {new Date(event.eventDate).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short"
                })}
                </div>

                <div>
                    <strong>Price:</strong> ₹{event.price}
                </div>

                <div>
                    <strong>Seats:</strong>{" "}
                    {event.availableSeats}/
                    {event.totalSeats}
                </div>

            </div>

            <div className="event-card-footer">
                <Link
                    className="event-card-link"
                    to={`/events/${event.id}`}
                >
                    View Details
                </Link>
            </div>

        </Card>
    );
}

export default EventCard;