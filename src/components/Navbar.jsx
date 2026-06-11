import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css"

function Navbar(){

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link 
                to="/dashboard"
                className="navbar-logo">
                TicketFlow
            </Link>
            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/events">Events</Link>
                <Link to="/events/create">Create Event</Link>
                <Link to="/my-tickets">My Tickets</Link>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )


}

export default Navbar