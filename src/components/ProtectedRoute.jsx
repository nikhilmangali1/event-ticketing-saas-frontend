import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles) {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (!user || !allowedRoles.includes(user.role)) {
            return <Navigate to="/home" />;
        }
    }

    return children;
}

export default ProtectedRoute;