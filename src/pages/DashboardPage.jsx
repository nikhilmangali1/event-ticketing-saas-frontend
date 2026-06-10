import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import "../styles/dashboard.css"

function DashboardPage(){

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

    const navigate = useNavigate();
    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <h1>TicketFlow Dashboard</h1>
                <p>Manage events and bookings</p>
            </div>

            <div className="dashboard-actions">

                <div className="dashboard-card">
                    <button onClick={() => navigate("/create-event")}>
                        Create Event
                    </button>
                </div>

                <div className="dashboard-card">
                    <button onClick={() => navigate("/events")}>
                        Browse Events
                    </button>
                </div>

                <div className="dashboard-card">
                    <button onClick={() => navigate("/my-tickets")}>
                        My Tickets
                    </button>
                </div>

                <div className="dashboard-card">
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;