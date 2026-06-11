import Card from "../../components/Card";

function TicketCard({ ticket, onCancel }) {
    return (
        <Card>           
            <h3>{ticket.detailsResponse.title}</h3>

            <p>
                <strong>Ticket ID:</strong> {ticket.ticketId}
            </p>

            <p>
                <strong>Venue:</strong> {ticket.detailsResponse.venue}
            </p>

            <p>
                <strong>Status:</strong> {ticket.status}
            </p>

            {ticket.status !== "CANCELLED" && (
                <button
                    onClick={() => onCancel(ticket.ticketId)}
                >
                    Cancel Ticket
                </button>
            )}
        </Card>
    );
}

export default TicketCard;