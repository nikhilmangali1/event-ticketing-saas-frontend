import { useEffect, useState } from "react";
import { getMyTickets,cancelTicket } from "../services/ticketService";
import TicketCard from "../components/TicketCard";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { showErrorToast } from "../../utils/toastService";
import "../../styles/tickets.css"

function MyTicketsPage() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTickets = async () => {
        try {
            const data = await getMyTickets();
            setTickets(data);
        } catch (error) {
            console.error(error);
            showErrorToast(
                error.response?.data?.message || "Failed to load your tickets.",
                error.response?.data?.details || null
            );
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
            showErrorToast(
                error.response?.data?.message || "Failed to cancel ticket.",
                error.response?.data?.details || null
            );
        }
    };

    if (loading) {
        return (
            <Layout>
                <LoadingSpinner />
            </Layout>
        );
    }

    return (
        <Layout>
           <div className="tickets-page">
               <div className="tickets-header">
                <h1>My Tickets</h1>
                <p>
                    View and manage all your booked event tickets.
                </p>
            </div>
            {tickets.length === 0 ? (
                <div className="empty-state">
                    <h2>No Tickets Yet</h2>

                    <p>
                        You haven't booked any events yet.
                    </p>
                </div>
            ) : (
                <div className="tickets-grid">
                    {tickets.map(ticket => (
                        <TicketCard
                            key={ticket.ticketId}
                            ticket={ticket}
                            onCancel={handleCancel}
                        />
                    ))}
                </div>
            )}
           </div>
        </Layout>
    );
}

export default MyTicketsPage;