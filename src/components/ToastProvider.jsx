import { useEffect, useState } from "react";
import { onShowToast } from "../utils/toastService";
import "../styles/toast.css";

function ToastItem({ toast, onRemove }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(toast.id);
        }, toast.duration);

        return () => clearTimeout(timer);
    }, [toast, onRemove]);

    return (
        <div className={`toast toast-${toast.type}`}>
            <div className="toast-content">{toast.message}</div>
            {toast.details && (
                <div className="toast-details">{toast.details}</div>
            )}
        </div>
    );
}

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        return onShowToast((toast) => {
            setToasts((prev) => [...prev, toast]);
        });
    }, []);

    const handleRemove = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <>
            {children}
            <div className="toast-portal">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={handleRemove} />
                ))}
            </div>
        </>
    );
}

export default ToastProvider;
