import { useState } from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import ImageUploadArea from "../../components/ImageUploadArea";
import "../../styles/EventForm.css"
import "../../styles/EventPage.css"

function EventForm({
    formData,
    handleChange,
    handleSubmit,
    submitButtonText,
    showTotalSeats = false,
    onImageChange = null,
    selectedImage = null,
    readOnlySeats = null,
    submitting = false,
    onCancel = null
}) {

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.title || !formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.venue || !formData.venue.trim()) {
            newErrors.venue = "Venue is required";
        }

        if (!formData.eventDate) {
            newErrors.eventDate = "Event date is required";
        } else if (new Date(formData.eventDate) <= new Date()) {
            newErrors.eventDate = "Event date must be in the future";
        }

        if (showTotalSeats) {
            if (!formData.totalSeats || Number(formData.totalSeats) <= 0) {
                newErrors.totalSeats = "Total seats must be greater than 0";
            }
        }

        if (formData.price === "" || formData.price === null || Number(formData.price) < 0) {
            newErrors.price = "Price must be 0 or greater";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleSubmit(e);
        }
    };

    return (
        <form
            className="event-form"
            onSubmit={onSubmit}
            noValidate
        >
            <div className="form-section">
                <div className="form-section-header">
                    <span className="form-section-icon">📋</span>
                    <div>
                        <h3 className="form-section-title">Event Information</h3>
                        <p className="form-section-subtitle">Basic details about your event</p>
                    </div>
                </div>

                <div className="form-section-body">
                    <div className="form-group">
                        <label className="field-label">
                            Title <span className="required">*</span>
                        </label>
                        <Input
                            name="title"
                            placeholder="Enter event title"
                            value={formData.title}
                            onChange={handleChange}
                            className={errors.title ? "input-error" : ""}
                        />
                        {errors.title && <span className="field-error">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Venue <span className="required">*</span>
                        </label>
                        <Input
                            name="venue"
                            placeholder="Enter venue name"
                            value={formData.venue}
                            onChange={handleChange}
                            className={errors.venue ? "input-error" : ""}
                        />
                        {errors.venue && <span className="field-error">{errors.venue}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label className="field-label">
                            Description
                        </label>
                        <TextArea
                            name="description"
                            placeholder="Describe your event — what attendees can expect, schedule, highlights..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="field-label">
                            Event Date & Time <span className="required">*</span>
                        </label>
                        <Input
                            type="datetime-local"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className={errors.eventDate ? "input-error" : ""}
                        />
                        {errors.eventDate && <span className="field-error">{errors.eventDate}</span>}
                    </div>

                    {showTotalSeats && (
                        <div className="form-group">
                            <label className="field-label">
                                Total Seats <span className="required">*</span>
                            </label>
                            <Input
                                type="number"
                                name="totalSeats"
                                placeholder="Enter total seats"
                                value={formData.totalSeats}
                                onChange={handleChange}
                                className={errors.totalSeats ? "input-error" : ""}
                            />
                            {errors.totalSeats && <span className="field-error">{errors.totalSeats}</span>}
                        </div>
                    )}

                    {readOnlySeats && (
                        <div className="form-group">
                            <label className="field-label">Seats</label>
                            <div className="readonly-seats">
                                <span className="readonly-label">
                                    <span className="readonly-dot" />
                                    Available / Total
                                </span>
                                <span className="readonly-value">{readOnlySeats.available}/{readOnlySeats.total}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="form-section">
                <div className="form-section-header">
                    <span className="form-section-icon">💰</span>
                    <div>
                        <h3 className="form-section-title">Pricing</h3>
                        <p className="form-section-subtitle">Set the ticket price for your event</p>
                    </div>
                </div>

                <div className="form-section-body">
                    <div className="form-group">
                        <label className="field-label">
                            Ticket Price (₹) <span className="required">*</span>
                        </label>
                        <div className="price-input-wrapper">
                            <span className="price-currency">₹</span>
                            <Input
                                type="number"
                                step="0.01"
                                min="0"
                                name="price"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={handleChange}
                                className={`price-input ${errors.price ? "input-error" : ""}`}
                            />
                        </div>
                        {errors.price && <span className="field-error">{errors.price}</span>}
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="form-section-header">
                    <span className="form-section-icon">🖼️</span>
                    <div>
                        <h3 className="form-section-title">Media</h3>
                        <p className="form-section-subtitle">Add an image to make your event stand out</p>
                    </div>
                </div>

                <div className="form-section-body">
                    <div className="form-group full-width">
                        <ImageUploadArea 
                            onImageChange={onImageChange} 
                            selectedImage={selectedImage}
                        />
                    </div>
                </div>
            </div>

            <div className="form-actions">
                {onCancel && (
                    <button
                        type="button"
                        className="btn-form-cancel"
                        onClick={onCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="btn-form-submit"
                    disabled={submitting}
                >
                    {submitting ? (
                        <>
                            <span className="btn-spinner-form" />
                            {submitButtonText === "Create Event" ? "Creating..." : "Saving..."}
                        </>
                    ) : (
                        submitButtonText
                    )}
                </button>
            </div>
        </form>
    );
}

export default EventForm;