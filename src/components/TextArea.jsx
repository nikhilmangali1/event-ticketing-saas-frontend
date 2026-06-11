function TextArea({
    name,
    value,
    onChange,
    placeholder,
    className = "",
    required = false,
    rows = 5
}) {
    return (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            required={required}
            rows={rows}
        />
    );
}

export default TextArea;