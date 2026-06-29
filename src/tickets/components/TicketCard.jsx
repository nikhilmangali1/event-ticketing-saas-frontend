import { useState, useRef, useCallback } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Button from "../../components/Button";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosClient from "../../api/axiosClient";
import "../../styles/tickets.css"

function TicketCard({ ticket, onCancel }) {
    const details = ticket.detailsResponse || {};
    const [showQR, setShowQR] = useState(false);
    const [qrSrc, setQrSrc] = useState(null);
    const [qrLoading, setQrLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const pdfTemplateRef = useRef(null);

    const toggleQR = async () => {
        if (qrSrc) {
            setShowQR(!showQR);
            return;
        }
        setQrLoading(true);
        try {
            const response = await axiosClient.get(`/tickets/${ticket.ticketId}/qr`, {
                responseType: "blob"
            });
            const url = URL.createObjectURL(response.data);
            setQrSrc(url);
            setShowQR(true);
        } catch {
            setQrLoading(false);
        } finally {
            setQrLoading(false);
        }
    };

    const ensureQrLoaded = useCallback(async () => {
        if (qrSrc) return qrSrc;
        const response = await axiosClient.get(`/tickets/${ticket.ticketId}/qr`, {
            responseType: "blob"
        });
        const url = URL.createObjectURL(response.data);
        setQrSrc(url);
        return url;
    }, [qrSrc, ticket.ticketId]);

    const downloadPDF = async () => {
        setPdfLoading(true);
        try {
            const qrUrl = await ensureQrLoaded();

            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(pdfTemplateRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`ticket-${ticket.ticketId}.pdf`);
        } catch (err) {
            console.error("Failed to generate PDF", err);
        } finally {
            setPdfLoading(false);
        }
    };

    const formattedDate = details.eventDate
        ? new Date(details.eventDate).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
        : "";

    return (
        <>
            <Card className="ticket-card">

                <h3 className="ticket-title">{details.title}</h3>

                <div className="ticket-card-details">

                    <div className="ticket-card-detail-item">
                        <strong>Ticket ID</strong>
                        <span>{ticket.ticketId}</span>
                    </div>

                    <div className="ticket-card-detail-item">
                        <strong>Venue</strong>
                        <span>{details.venue}</span>
                    </div>

                    <div className="ticket-card-detail-item">
                        <strong>Event Date</strong>
                        <span>{formattedDate}</span>
                    </div>

                    <div className="ticket-card-detail-item">
                        <strong>Price</strong>
                        <span>₹{details.price}</span>
                    </div>

                </div>

                <div>
                    <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                        {ticket.status}
                    </span>
                </div>

                {showQR && qrSrc && (
                    <div className="qr-display">
                        <img src={qrSrc} alt="Ticket QR Code" className="qr-image" />
                    </div>
                )}

                {qrLoading && (
                    <div className="qr-display">
                        <LoadingSpinner />
                    </div>
                )}

                <div className="ticket-card-footer">
                    {ticket.status !== "CANCELLED" && (
                        <>
                            <Button className="qr-btn" onClick={toggleQR}>
                                {showQR ? "Hide QR Code" : "Show QR Code"}
                            </Button>
                            <Button className="qr-btn" onClick={downloadPDF} disabled={pdfLoading}>
                                {pdfLoading ? "Generating PDF..." : "Download Ticket PDF"}
                            </Button>
                            <Button className="cancel-ticket-btn" onClick={() => onCancel(ticket.ticketId)}>
                                Cancel Ticket
                            </Button>
                        </>
                    )}
                </div>

            </Card>

            <div ref={pdfTemplateRef} className="pdf-ticket-template">
                <div className="pdf-ticket-header">
                    <h1>TicketFlow</h1>
                    <p>Event Management Platform</p>
                </div>

                <h2 className="pdf-ticket-title">{details.title}</h2>

                <table className="pdf-ticket-details">
                    <tbody>
                        <tr>
                            <td className="pdf-label">Ticket ID</td>
                            <td className="pdf-value">{ticket.ticketId}</td>
                        </tr>
                        <tr>
                            <td className="pdf-label">Venue</td>
                            <td className="pdf-value">{details.venue}</td>
                        </tr>
                        <tr>
                            <td className="pdf-label">Date & Time</td>
                            <td className="pdf-value">{formattedDate}</td>
                        </tr>
                        <tr>
                            <td className="pdf-label">Price</td>
                            <td className="pdf-value">₹{details.price}</td>
                        </tr>
                        <tr>
                            <td className="pdf-label">Organizer</td>
                            <td className="pdf-value">{details.organizerEmail}</td>
                        </tr>
                        <tr>
                            <td className="pdf-label">Status</td>
                            <td className="pdf-value">{ticket.status}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="pdf-ticket-qr">
                    {qrSrc && <img src={qrSrc} alt="QR" />}
                </div>

                <p className="pdf-ticket-footer">
                    Show this QR code at the venue for entry.
                </p>
            </div>
        </>
    );
}

export default TicketCard;
