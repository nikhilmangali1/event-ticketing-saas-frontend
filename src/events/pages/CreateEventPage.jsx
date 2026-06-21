import { useState } from "react";
import { createEvent } from "../services/eventsService";
import Layout from "../../components/Layout";
import EventForm from "../components/EventForm";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toastService";

function CreateEventPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        eventDate: "",
        totalSeats: "",
        price: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const event = await createEvent(formData);
            navigate(`/events/${event.id}`);
        } catch (error) {
            console.error(error);
            showErrorToast(
                error.response?.data?.message || "Unable to create event.",
                error.response?.data?.details || null
            );
        }
    };

    return (
        <Layout>
        <div className="event-form-page">
            <div className="event-form-header">
                <h1>Create Event</h1>
                <p>
                    Fill in the details below to publish your event.
                </p>
            </div>

            <EventForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                submitButtonText="Create Event"
                showTotalSeats={true}
            />
        </div>
    </Layout>
    );
}

export default CreateEventPage;