import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import "../../styles/EventForm.css"
import "../../styles/EventPage.css"

function EventForm({
    formData,
    handleChange,
    handleSubmit,
    submitButtonText,
    showTotalSeats = false
}) {
    return (
        <form
            className="event-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <Input
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <TextArea
                    name="description"
                    placeholder="Event Description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <Input
                    name="venue"
                    placeholder="Venue"
                    value={formData.venue}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <Input
                    type="datetime-local"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                />
            </div>

            {showTotalSeats && (
                <div className="form-group">
                    <Input
                        type="number"
                        name="totalSeats"
                        placeholder="Total Seats"
                        value={formData.totalSeats}
                        onChange={handleChange}
                    />
                </div>
            )}

            <div className="form-group">
                <Input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="Ticket Price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit">
                {submitButtonText}
            </Button>
        </form>
    );
}

export default EventForm;