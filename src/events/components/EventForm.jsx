import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";

function EventForm({
    formData,
    handleChange,
    handleSubmit,
    submitButtonText,
    showTotalSeats = false
}) {
    return (
        <form onSubmit={handleSubmit}>

            <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            />

            <br /><br />

            <TextArea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <br /><br />

            <Input
                name="venue"
                placeholder="Venue"
                value={formData.venue}
                onChange={handleChange}
            />

            <br /><br />

            <Input
                type="datetime-local"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
            />

            <br /><br />

            {showTotalSeats && (
                <>
                    <Input
                        type="number"
                        name="totalSeats"
                        placeholder="Total Seats"
                        value={formData.totalSeats}
                        onChange={handleChange}
                    />

                    <br /><br />
                </>
            )}

            <Input
                type="number"
                step="0.01"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
            />

            <br /><br />

            <Button type="submit">
                {submitButtonText}
            </Button>

        </form>
    );
}

export default EventForm;