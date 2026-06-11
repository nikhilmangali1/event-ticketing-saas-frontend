function Card({ children }) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px"
            }}
        >
            {children}
        </div>
    );
}

export default Card;