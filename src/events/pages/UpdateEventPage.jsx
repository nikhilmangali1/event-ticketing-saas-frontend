import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getEventById,
    updateEvent
} from "../services/eventsService";

function UpdateEventPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        eventDate: "",
        price: ""
    });

    useEffect(() => {

        const fetchEvent = async () => {
            try {

                const event = await getEventById(id);

                setFormData({
                    title: event.title || "",
                    description: event.description || "",
                    venue: event.venue || "",
                    eventDate: event.eventDate
                        ? event.eventDate.slice(0, 16)
                        : "",
                    price: event.price || ""
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();

    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await updateEvent(id, formData);

            alert("Event updated successfully");

            navigate(`/events/${id}`);

        } catch (error) {
            console.error(error);
            alert("Failed to update event");
        }
    };

    if (loading) {
        return <h2>Loading event...</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Update Event</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="venue"
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
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Update Event
                </button>

            </form>
        </div>
    );
}

export default UpdateEventPage;