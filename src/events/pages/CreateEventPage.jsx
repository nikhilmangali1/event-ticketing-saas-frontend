import { useState } from "react";
import { createEvent } from "../services/eventsService";
import Layout from "../../components/Layout";

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

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    value={formData.venue}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="datetime-local"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="totalSeats"
                    placeholder="Total Seats"
                    value={formData.totalSeats}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Create Event
                </button>

            </form>
        </Layout>
    );
}

export default CreateEventPage;