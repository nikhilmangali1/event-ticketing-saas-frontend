function TicketCard({ ticket, onCancel }) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
            }}
        >
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
        </div>
    );
}

export default TicketCard;