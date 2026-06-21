function ErrorMessage({ message, details = null }) {
    return (
        <div className="error-message">
            <h2>{message}</h2>
            {details && (
                <div className="error-details">{details}</div>
            )}
        </div>
    );
}

export default ErrorMessage;