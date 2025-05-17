import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/events`);
        setEvents(res.data);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container">
      <h1>Upcoming Events</h1>
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event._id || event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;