import { Link, useNavigate } from "react-router-dom";

function Navbar(){

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "15px",
                borderBottom: "10px solid #cc"
            }}
        >
            <h3>TicketFlow</h3>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/events">Events</Link>
            <Link to="/events/create">Create Event</Link>
            <Link to="/my-tickets">My Tickets</Link>

            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )


}

export default Navbar