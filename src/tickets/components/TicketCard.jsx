import Button from "../../components/Button";
import Card from "../../components/Card";
import "../../styles/tickets.css"

function TicketCard({ ticket, onCancel }) {
    const details = ticket.detailsResponse || {};

    return (
        <Card className="ticket-card">

            <h3 className="ticket-title">{details.title}</h3>

            <div className="ticket-card-details">

                <div className="ticket-card-detail-item">
                    <strong>Ticket ID</strong>
                    <span>{ticket.ticketId}</span>
                </div>

                <div className="ticket-card-detail-item">
                    <strong>Venue</strong>
                    <span>{details.venue}</span>
                </div>

                <div className="ticket-card-detail-item">
                    <strong>Event Date</strong>
                    <span>{new Date(details.eventDate).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                </div>

                <div className="ticket-card-detail-item">
                    <strong>Price</strong>
                    <span>₹{details.price}</span>
                </div>

            </div>

            <div>
                <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                </span>
            </div>

            <div className="ticket-card-footer">
                {ticket.status !== "CANCELLED" && (
                    <Button className="cancel-ticket-btn" onClick={() => onCancel(ticket.ticketId)}>
                        Cancel Ticket
                    </Button>
                )}
            </div>

        </Card>
    );
}

export default TicketCard;