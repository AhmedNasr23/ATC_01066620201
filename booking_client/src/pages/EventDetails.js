import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE}/events/${id}`);
        setEvent(response.data);
        
        if (user) {
          try {
            const bookingCheck = await axios.get(
              `${process.env.REACT_APP_API_BASE}/bookings/check`,
              { 
                params: { eventId: id },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
              }
            );
            setIsBooked(bookingCheck.data.isBooked);
          } catch (err) {
            console.error("Booking check error:", err);
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, user]);

  const handleBookEvent = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }

    setIsBooking(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE}/bookings`,
        { eventId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // REDIRECT TO CONGRATS PAGE AFTER SUCCESSFUL BOOKING
      navigate('/congrats', { 
        state: { 
          eventName: event.name,
          eventDate: event.date,
          eventVenue: event.venue 
        } 
      });
      
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <img src={event.image} alt={event.name} />
      <p>{event.description}</p>
      <div className="event-meta">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Price:</strong> ${event.price}</p>
      </div>
      
      {isBooked ? (
        <button className="booked-btn" disabled>✓ Already Booked</button>
      ) : (
        <button 
          className="book-btn" 
          onClick={handleBookEvent}
          disabled={isBooking}
        >
          {isBooking ? 'Processing...' : 'Book Now'}
        </button>
      )}
    </div>
  );
}

export default EventDetails;