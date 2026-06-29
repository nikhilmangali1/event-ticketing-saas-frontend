import { Link } from "react-router-dom";
import Card from "../../components/Card";
import "../../styles/events.css";

function EventCard({ event }) {
    const formattedDate = new Date(event.eventDate).toLocaleString("en-IN", {
        dateStyle: "short",
        timeStyle: "short"
    });

    const availabilityPercentage = (event.availableSeats / event.totalSeats) * 100;
    const isLowInventory = availabilityPercentage < 20;

    return (
        <Link 
            to={`/events/${event.id ?? event._id}`}
            className="event-card-link-wrapper"
        >
            <Card className="event-card">
                <div className="event-card-image-wrapper">
                    {event.imageUrl && (
                        <img 
                            src={event.imageUrl} 
                            alt={event.title}
                            className="event-card-image"
                        />
                    )}
                    {!event.imageUrl && (
                        <div className="event-card-image-placeholder" />
                    )}
                    {isLowInventory && (
                        <div className="event-card-badge">
                            Low Inventory
                        </div>
                    )}
                </div>

                <div className="event-card-header">
                    <h3 className="event-card-title">{event.title}</h3>
                    <p className="event-card-date">
                        <span className="date-icon">📅</span>
                        {formattedDate}
                    </p>
                </div>

                <div className="event-card-body">
                    <div className="event-card-detail-item">
                        <span className="detail-label">Venue</span>
                        <span className="detail-value">{event.venue}</span>
                    </div>

                    <div className="event-card-detail-item">
                        <span className="detail-label">Price</span>
                        <span className="detail-value highlight">₹{event.price}</span>
                    </div>

                    <div className="event-card-detail-item">
                        <span className="detail-label">Available</span>
                        <div className="availability-container">
                            <span className="detail-value">
                                {event.availableSeats}/{event.totalSeats}
                            </span>
                            <div className="availability-bar">
                                <div
                                    className={`availability-fill ${isLowInventory ? 'low' : ''}`}
                                    style={{ width: `${availabilityPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="event-card-footer">
                    <span className="view-details-text">
                        View Details
                        <span className="arrow-icon">→</span>
                    </span>
                </div>
            </Card>
        </Link>
    );
}

export default EventCard;