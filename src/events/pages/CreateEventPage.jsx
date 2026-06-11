import { useState } from "react";
import { createEvent } from "../services/eventsService";
import Layout from "../../components/Layout";
import EventForm from "../components/EventForm";

function CreateEventPage() {

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
            await createEvent(formData);
            alert("Event created successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to create event");
        }
    };

    return (
        <Layout>
            <h1>Create Event</h1>

            <EventForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                submitButtonText="Create Event"
                showTotalSeats={true}
            />
        </Layout>
    );
}

export default CreateEventPage;