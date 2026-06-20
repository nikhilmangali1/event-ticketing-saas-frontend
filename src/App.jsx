import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import DashboardPage from "./dashboard/pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventsPage from "./events/pages/EventsPage";
import EventDetailsPage from "./events/pages/EventDetailsPage";
import MyTicketsPage from "./tickets/pages/MyTicketsPage";
import CreateEventPage from "./events/pages/CreateEventPage";
import UpdateEventPage from "./events/pages/UpdateEventPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute> <DashboardPage /></ProtectedRoute>
                }/>
                <Route path="/events" element={
                    <ProtectedRoute>
                        <EventsPage />
                    </ProtectedRoute>
                }/>
                <Route
                    path="/events/:id"
                    element={
                        <ProtectedRoute>
                            <EventDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-tickets"
                    element={
                        <ProtectedRoute>
                            <MyTicketsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/create"
                    element={
                        <ProtectedRoute>
                            <CreateEventPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/edit/:id"
                    element={
                        <ProtectedRoute>
                            <UpdateEventPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;