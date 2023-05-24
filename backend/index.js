const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Work = require('./models/Work');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://pavan:pavan@cluster0.idbadvj.mongodb.net/work', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});




// API endpoints
app.post('/api/works', async (req, res) => {
  try {
    const work = new Work(req.body);
    await work.save();

    // Send immediate email notification
    sendNotificationEmail(work);

    // Schedule email notifications every 2 hours until the deadline
    const deadline = new Date(work.deadline);
    const rule = new schedule.RecurrenceRule();
    rule.minute = 0; // Send at the start of every hour
    schedule.scheduleJob(rule, () => {
      const currentTime = new Date();
      if (currentTime < deadline) {
        sendNotificationEmail(work);
      }
    });

    res.status(201).json(work);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add work.' });
  }
});

app.get('/api/works', async (req, res) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve works.' });
  }
});

app.delete('/api/works/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWork = await Work.findByIdAndDelete(id);

    if (!deletedWork) {
      return res.status(404).json({ error: 'Work not found.' });
    }

    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete work.' });
  }
});

// Assuming you have the necessary imports and app configuration

// Update a work
app.put('/api/works/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { workName, endTime, type } = req.body;

    // Find the work by ID
    const work = await Work.findByIdAndUpdate(id, { workName, endTime, type }, { new: true });

    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json({ message: 'Work updated successfully', work });
  } catch (error) {
    console.error('Failed to update work:', error);
    res.status(500).json({ message: 'Failed to update work' });
  }
});



// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
