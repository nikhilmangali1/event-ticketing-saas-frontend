import "../../styles/EventHero.css";

function EventHero({ event }) {
  const formattedDate = new Date(event.eventDate).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const availabilityPercentage = (event.availableSeats / event.totalSeats) * 100;

  return (
    <div className="event-hero-section">
      {event.imageUrl ? (
        <>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="event-hero-image"
          />
          <div className="event-hero-overlay" />
        </>
      ) : (
        <div className="event-hero-placeholder" />
      )}

      <div className="event-hero-content">
        <div className="event-hero-header">
          <h1 className="event-hero-title">{event.title}</h1>
          <div className="event-hero-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{formattedDate}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span className="meta-text">{event.venue}</span>
            </div>
          </div>
        </div>

        <div className="event-hero-stats">
          <div className="stat-card">
            <span className="stat-label">Price</span>
            <span className="stat-value">₹{event.price}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Availability</span>
            <span className="stat-value">
              {event.availableSeats}/{event.totalSeats}
            </span>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{ width: `${availabilityPercentage}%` }}
              />
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-label">Organizer</span>
            <span className="stat-value-org">{event.organizerName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventHero;
