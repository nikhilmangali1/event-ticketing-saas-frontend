import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../auth/services/authService";
import "../../styles/dashboard.css"
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { getAllEvents } from "../../events/services/eventsService";
import { getMyTickets } from "../../tickets/services/ticketService";

function DashboardPage(){
    const navigate = useNavigate();
    const [eventsCount, setEventsCount] = useState(0);
    const [ticketsCount, setTicketsCount] = useState(0);
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [loadingStats, setLoadingStats] = useState(true);

    const handleLogout = async() => {
        try{
            const refreshToken = localStorage.getItem("refreshToken");
            await logout(refreshToken);
            localStorage.clear();
            navigate("/login")
        } catch(error){
            console.error(error);
        }
    }

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    })();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const events = await getAllEvents();
                setEventsCount(Array.isArray(events) ? events.length : 0);

                const tickets = await getMyTickets();
                setTicketsCount(Array.isArray(tickets) ? tickets.length : 0);

                const now = new Date();
                const upcoming = (Array.isArray(events) ? events : []).filter(e => {
                    try {
                        return new Date(e.eventDate) > now;
                    } catch { return false; }
                }).length;
                setUpcomingCount(upcoming);

            } catch (error) {
                console.error(error);
            } finally {
                setLoadingStats(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <Layout>
        <div className="dashboard-container">

            <div className="dashboard-header">
                <h1>Welcome{user?.name ? `, ${user.name}` : ""}</h1>
                <p>Quick overview of your events and bookings</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{loadingStats ? "—" : eventsCount}</div>
                    <div className="stat-label">Events</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{loadingStats ? "—" : ticketsCount}</div>
                    <div className="stat-label">My Tickets</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{loadingStats ? "—" : upcomingCount}</div>
                    <div className="stat-label">Upcoming</div>
                </div>
            </div>

            <div className="dashboard-actions">

                <div className="action-card">
                    <h3>Create an Event</h3>
                    <p className="muted">Publish a new event and start selling tickets.</p>
                    <Button onClick={() => navigate("/events/create")}>
                        Create Event
                    </Button>
                </div>

                <div className="action-card">
                    <h3>Browse Events</h3>
                    <p className="muted">View all events in a clean list.</p>
                    <Button onClick={() => navigate("/events")}>
                        Browse Events
                    </Button>
                </div>

                <div className="action-card">
                    <h3>My Tickets</h3>
                    <p className="muted">Manage your bookings quickly.</p>
                    <Button onClick={() => navigate("/my-tickets")}>
                        My Tickets
                    </Button>
                </div>

                {user?.role === "USER" && (
                    <div className="action-card">
                        <h3>Organizer Request</h3>
                        <p className="muted">Apply to become an organizer.</p>
                        <Button onClick={() => navigate("/become-organizer") }>
                            Request Role
                        </Button>
                    </div>
                )}

                {user?.role === "ADMIN" && (
                    <div className="action-card">
                        <h3>Review Requests</h3>
                        <p className="muted">Approve or reject organizer applications.</p>
                        <Button onClick={() => navigate("/admin/organizer-requests") }>
                            Review
                        </Button>
                    </div>
                )}

                {/* Account actions moved to profile menu in the navbar */}

            </div>
        </div>
        </Layout>
    );
}

export default DashboardPage;