// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with a database if needed)
let timeLogs = [];

// Endpoint to save time logs
app.post('/api/time-log', (req, res) => {
  const { employeeId, employeeName, loginTime, breakInTime, breakOutTime, logoutTime, totalTime } = req.body;

  const newLog = { employeeId, employeeName, loginTime, breakInTime, breakOutTime, logoutTime, totalTime };
  timeLogs.push(newLog);

  // Save to a file (optional, for persistence across server restarts)
  fs.writeFileSync('timeLogs.json', JSON.stringify(timeLogs));

  res.status(200).send({ message: 'Time log saved successfully' });
});

// Endpoint to get all time logs
app.get('/api/time-log', (req, res) => {
  res.status(200).json(timeLogs);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
