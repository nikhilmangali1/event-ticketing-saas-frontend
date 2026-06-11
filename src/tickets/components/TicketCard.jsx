import Button from "../../components/Button";
import Card from "../../components/Card";
import "../../styles/tickets.css"

function TicketCard({ ticket, onCancel }) {
    return (
        <Card className="ticket-card">
            <h3 className="ticket-title">
                {ticket.detailsResponse.title}
            </h3>

            <p>
                <strong>Ticket ID:</strong> {ticket.ticketId}
            </p>

            <p>
                <strong>Venue:</strong> {ticket.detailsResponse.venue}
            </p>

            <p>
                <strong>Event Date:</strong> {ticket.detailsResponse.eventDate}
            </p>

            <p>
                <strong>Price:</strong> ₹{ticket.detailsResponse.price}
            </p>

            <div>
                <span
                    className={`ticket-status ${ticket.status.toLowerCase()}`}
                >
                    {ticket.status}
                </span>
            </div>

            {ticket.status !== "CANCELLED" && (
                <Button
                    className="cancel-ticket-btn"
                    onClick={() => onCancel(ticket.ticketId)}
                >
                    Cancel Ticket
                </Button>
            )}
        </Card>
    );
}

export default TicketCard;