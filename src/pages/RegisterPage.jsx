import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/auth.css"

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
            setMessage("Registration Failed");
        }
    };
    return (
        <div className="auth-container">
            <h1>Create Account</h1>
            <p className="auth-subtitle">
                Join TicketFlow and start booking events
            </p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />
            <br/><br/>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <br/><br/>

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <br/><br/><br/>

            <button onClick={handleRegister}>
                Register
            </button><hr/>
            <button onClick={() => navigate("/login")}>
                Login
            </button>
            <p>{message}</p>
        </div>
    );
}

export default RegisterPage;