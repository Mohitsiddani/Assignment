// Import necessary packages
const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // For parsing JSON request bodies

// Mock database (for this demo, use an array)
let doctors = [];

// POST route to add a doctor
app.post('/add-doctor', (req, res) => {
  const { name, specialty, experience } = req.body;

  // Validate request
  if (!name || !specialty || !experience) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create new doctor object
  const newDoctor = {
    id: doctors.length + 1,
    name,
    specialty,
    experience,
  };

  // Add to "database" (mocked with an array)
  doctors.push(newDoctor);

  return res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
});

// GET route to list doctors with filters and pagination
app.get('/list-doctors', (req, res) => {
  const { page = 1, limit = 10, specialty } = req.query;

  // Filtering doctors by specialty
  let filteredDoctors = doctors;
  if (specialty) {
    filteredDoctors = doctors.filter((doctor) =>
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  return res.json({
    total: filteredDoctors.length,
    page,
    limit,
    doctors: paginatedDoctors,
  });
});

// Set up a simple route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
