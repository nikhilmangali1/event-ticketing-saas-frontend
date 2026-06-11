import { Link } from "react-router-dom";
import Card from "../../components/Card";

function EventCard({ event }) {
    return (
       <Card>
            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>{event.venue}</p>

            <Link to={`/events/${event.id}`}>
                View Details
            </Link>
        </Card>
    );
}

export default EventCard;