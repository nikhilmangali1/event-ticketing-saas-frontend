function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = "",
    variant = "primary"
}) {
    const baseClass = variant === "secondary" ? "button-secondary" : "button-primary";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClass} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;