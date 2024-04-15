// app.js
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const TaskQueueHandler = require('./taskQueueHandler');

const app = express();
const port = 53508;

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Initialize TaskQueueHandler
const taskQueueHandler = new TaskQueueHandler();

// POST endpoint for accepting suggestions
app.post('/accept-suggestions', async (req, res, next) => {
  try {
    let {taskID, suggestions, priority} = req.body;  // Assuming suggestions are sent in the request body
    
    await taskQueueHandler.enqueueSuggestionsTask(taskID, suggestions, priority);

    res.status(200).json({ message: `Suggestions accepted and enqueued for processing: ${JSON.stringify(suggestions)}` });
  } catch (error) {
    console.error('Error accepting suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

// GET endpoint for showing task progress
app.get('/show-task', async (req, res, next) => {
  try {
    const progress = await taskQueueHandler.getTaskProgress();
    res.status(200).json({ progress });
  } catch (error) {
    console.error('Error retrieving task progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



