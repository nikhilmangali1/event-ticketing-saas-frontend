import { useEffect, useState } from "react";
import { getMyTickets,cancelTicket } from "../services/ticketService";
import TicketCard from "../components/TicketCard";
import Layout from "../../components/Layout";

function MyTicketsPage() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTickets = async () => {
        try {
            const data = await getMyTickets();
            setTickets(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    const handleCancel = async (ticketId) => {
        try {
            await cancelTicket(ticketId);

            await loadTickets();

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <h2>Loading tickets...</h2>;
    }

    return (
        <Layout>
            <h1>My Tickets</h1>

            {tickets.length === 0 ? (
                <p>No tickets booked.</p>
            ) : (
                tickets.map(ticket => (
                    <TicketCard
                        key={ticket.ticketId}
                        ticket={ticket}
                        onCancel={handleCancel}
                    />
                ))
            )}
        </Layout>
    );
}

export default MyTicketsPage;