import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const CongratsPage = () => {
  const location = useLocation();
  const { eventName, eventDate, eventVenue } = location.state || {};

  return (
    <div className="congrats-container">
      <div className="congrats-card">
        <h1>🎉 Booking Confirmed!</h1>
        <div className="confirmation-details">
          {eventName && <p><strong>Event:</strong> {eventName}</p>}
          {eventDate && <p><strong>Date:</strong> {new Date(eventDate).toLocaleDateString()}</p>}
          {eventVenue && <p><strong>Venue:</strong> {eventVenue}</p>}
        </div>
        <p className="thank-you">Thank you for your booking!</p>
        <div className="action-buttons">
          <Link to="/" className="home-btn">Back to Home</Link>
          
        </div>
      </div>
    </div>
  );
};

export default CongratsPage;