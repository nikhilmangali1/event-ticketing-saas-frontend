import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { showErrorToast } from "../../utils/toastService";
import "../../styles/auth.css"

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleRegister = async () => {
        try {
            await register(name, email, password);
            setMessage("Registration Successful");
            navigate("/login");

        } catch(error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Registration Failed");
        }
    };
    return (
        <div className="auth-container">
            <h1>Create Account</h1>
            <p className="auth-subtitle">
                Join TicketFlow and start booking events
            </p>

            <div className="auth-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                />

                <div className="auth-actions">
                    <button className="auth-primary-btn" onClick={handleRegister}>
                        Register
                    </button>

                    <button
                        type="button"
                        className="auth-secondary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </div>

            {message && <p className="auth-message">{message}</p>}
        </div>
    );
}

export default RegisterPage;