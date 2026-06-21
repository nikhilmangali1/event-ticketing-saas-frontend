const listeners = new Set();

export const onShowToast = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const showToast = ({ message, details = null, type = "error", duration = 3500 }) => {
    const toast = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        message,
        details,
        type,
        duration
    };

    listeners.forEach((listener) => listener(toast));
};

export const showErrorToast = (message, details = null, duration = 3500) => {
    showToast({ message, details, type: "error", duration });
};

export const showSuccessToast = (message, details = null, duration = 3500) => {
    showToast({ message, details, type: "success", duration });
};
