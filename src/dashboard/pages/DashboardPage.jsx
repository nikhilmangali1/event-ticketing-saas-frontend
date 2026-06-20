import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/services/authService";
import "../../styles/dashboard.css"
import Button from "../../components/Button";

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
                    <Button onClick={() => navigate("/events/create")}>
                        Create Event
                    </Button>
                </div>

                <div className="dashboard-card">
                    <Button onClick={() => navigate("/events")}>
                        Browse Events
                    </Button>
                </div>

                <div className="dashboard-card">
                    <Button onClick={() => navigate("/my-tickets")}>
                        My Tickets
                    </Button>
                </div>

                <div className="dashboard-card">
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;