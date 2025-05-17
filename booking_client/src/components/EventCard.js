import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function EventCard({ event }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);

  // Check booking status when user changes
  useEffect(() => {
    const checkBooking = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE}/bookings/check`,
            {
              params: { eventId: event._id },
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
          );
          setIsBooked(response.data.isBooked);
        } catch (err) {
          console.error('Booking check failed:', err);
        }
      }
    };

    checkBooking();
  }, [user, event._id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: `/events/${event._id}` } });
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE}/bookings`,
        { eventId: event._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setIsBooked(true);
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  return (
    <div className="event-card">
      <Link to={`/events/${event._id}`}>
        <img src={event.image} alt={event.name} />
        <div className="content">
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()} • {event.venue}</p>
        </div>
      </Link>
      
      {isBooked ? (
        <button className="booked" disabled>✓ Booked</button>
      ) : (
        <button className="book-btn" onClick={handleBook}>
          Book Now
        </button>
      )}
    </div>
  );
}

export default EventCard;