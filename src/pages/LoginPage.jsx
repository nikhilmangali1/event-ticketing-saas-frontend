import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/auth.css"

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

  const handleLogin = async ()=> {
    try{
      const data = await login(email, password);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      console.log("Login successful!");
      setMessage("Login Successful");
      navigate("/dashboard")
    }catch(error){
      console.error(error);
      setMessage("Invalid Credentials");
    }
  }

    return (
        <div className="auth-container">
            <h1>TicketFlow Login</h1>

            <div>
                <label>Email</label>
                <br />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                />
            </div>

            <br />

            <div>
                <label>Password</label>
                <br />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                />
            </div>

            <br />

            <button onClick={handleLogin}>
                Login
            </button><hr></hr>
            <button onClick={() => navigate("/register")}>
                Register
            </button>
            <p>{message}</p>
            <hr />
        </div>
    );
}

export default LoginPage;