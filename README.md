# ATC_01066620201

//STRUCTURE OF FILES//


Event_booking_system/
├── booking_client/          # Frontend React application
│   ├── public/              
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Application pages
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point
│   └── package.json
│
├── booking_server/          # Backend Node.js application
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   ├── server.js            # Server entry point
│   └── package.json
└── README.md

//SETUP//

git clone https://github.com/ATC_01066620201/Event_booking_system.git
cd Event_booking_system

//BACKEND STEUP//



# Navigate to backend directory
cd booking_server

# Initialize Node.js project (if not already done)
npm init -y

# Install required dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken

# Install dev dependency (for hot-reloading)
npm install --save-dev nodemon

# Create a start script in package.json
# Add these to your package.json:
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

# Create .env file (fill in your details)
echo "PORT=5000
MONGO_URI=mongodb://localhost:27017/event_booking
JWT_SECRET=your_secure_secret_here" > .env

# Start development server
npm run dev




//FRONTEND SETUP//

# Navigate to frontend directory
cd ../booking_client

# Install dependencies (if not already done)
npm install

# Create .env file for frontend
echo "REACT_APP_API_BASE=http://localhost:5000" > .env

# Start React development server
npm start


 //API Documentation//

Authentication

Method	Endpoint	Description

POST	/auth/register	Register new user

POST	/auth/login	Login user

Events

Method	Endpoint	Description

GET	/events	Get all events

GET	/events/:id	Get single event

POST	/events	Create new event (Admin)

PUT	/events/:id	Update event (Admin)

DELETE	/events/:id	Delete event (Admin)

Bookings

Method	Endpoint	Description

POST	/bookings	Create new booking

GET	/bookings/user	Get user's bookings

