import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/navbar.css"

function Navbar(){

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    })();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    return (
        <nav className="navbar">
            <Link 
                to="/home"
                className="navbar-logo">
                TicketFlow
            </Link>
            <div className="navbar-links">
                <Link to="/events">Events</Link>
                {user?.role === "USER" && (
                    <Link to="/my-tickets">My Tickets</Link>
                )}
                {(user?.role === "ORGANIZER" || user?.role === "ADMIN") && (
                    <Link to="/events/create">Create Event</Link>
                )}
                {user?.role === "USER" && (
                    <Link to="/become-organizer">Request Organizer</Link>
                )}
                {user?.role === "ADMIN" && (
                    <Link to="/admin/organizer-requests">Organizer Requests</Link>
                )}

                <div className="navbar-profile" ref={ref}>
                    <button
                        className="profile-avatar"
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        aria-haspopup="menu"
                    >
                        {user?.name ? user.name.split(" ").map(n => n[0]).slice(0,2).join("") : (user?.email ? user.email[0].toUpperCase() : "U")}
                    </button>

                    {open && (
                        <div className="profile-dropdown" role="menu">
                            <div className="profile-item" onClick={() => { setOpen(false); navigate('/profile'); }}>
                                Profile
                            </div>
                            <div className="profile-item" onClick={() => { setOpen(false); handleLogout(); }}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )


}

export default Navbar