function Input({
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    className = "",
    required = false,
    disabled = false,
    min,
    max,
    step
}) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
        />
    );
}

export default Input;