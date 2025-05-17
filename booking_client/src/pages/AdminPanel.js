import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/events'; // adjust if your backend URL is different

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    date: '',
    venue: '',
    price: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Submit form to add or update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example
    if (!form.name || !form.date) {
      alert('Name and Date are required!');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        // Update event
        await axios.put(`${API_BASE}/${editingId}`, form);
      } else {
        // Add new event
        await axios.post(API_BASE, form);
      }
      setForm({ name: '', description: '', category: '', date: '', venue: '', price: '', image: '' });
      setEditingId(null);
      fetchEvents();
      setLoading(false);
    } catch (err) {
      setError('Failed to save event');
      setLoading(false);
    }
  };

  // Load event data into form for editing
  const handleEdit = (event) => {
    setForm({
      name: event.name || '',
      description: event.description || '',
      category: event.category || '',
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : '',
      venue: event.venue || '',
      price: event.price || '',
      image: event.image || '',
    });
    setEditingId(event._id);
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE}/${id}`);
      fetchEvents();
      setLoading(false);
    } catch (err) {
      setError('Failed to delete event');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update Event' : 'Add Event'}</button>
        {editingId && <button type="button" onClick={() => {
          setEditingId(null);
          setForm({ name: '', description: '', category: '', date: '', venue: '', price: '', image: '' });
        }}>Cancel Edit</button>}
      </form>

      <h2>Existing Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)} style={{ marginLeft: '10px', color: 'red' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
