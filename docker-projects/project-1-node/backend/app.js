const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Goal = require('./models/goal');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/goals', async (req, res) => {
  console.log('TRYING TO FETCH GOALS');
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log('FETCHED GOALS');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load goals.' });
  }
});

app.post('/goals', async (req, res) => {
  console.log('TRYING TO STORE GOAL');
  const goalText = req.body.text;

  if (!goalText || goalText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid goal text.' });
  }

  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: 'Goal saved', goal: { id: goal.id, text: goalText } });
    console.log('STORED NEW GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save goal.' });
  }
});

app.delete('/goals/:id', async (req, res) => {
  console.log('TRYING TO DELETE GOAL');
  try {
    await Goal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted goal!' });
    console.log('DELETED GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
});
//mongodb will be the conatiner name of mongo database, the container should be in the same network, hamza:12345 is name:password of the database
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongodb:27017/course-goals?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!');
      app.listen(80);
    }
  }
);



// MONGODB ------
//the mongodb conatiner and the backend is in the same network so we don't need to publish the port - 'mongodb://mongodb:27017/course-goals'
//docker run --name mongodb --network node-network mongo:4.4.22

//LINKED - mongo//docker run --rm -p 27017:27017 -v mongo_volume:/data/db --network my-network --name mongodb -e MONGO_INITDB_ROOT_USERNAME=hamza -e MONGO_INITDB_ROOT_PASSWORD=12345  mongo:4.4.22


// BACKEND -------
//docker run -p 80:80 --name backend_container --network node-network backend:v1
//docker run -p 80:80 --rm --name backend-container -v backend_logs:/app/logs -v /home/qhamza/practice/DevOps-Practice/docker-practice/prac-7-project-1/backend/:/app/ -v /app/node_modules --network my-network backend.ew:v1

//LINKED - backend//docker run -p 80:80 --rm --name backend-container -v backend_logs:/app/logs -v /home/qhamza/practice/DevOps-Practice/docker-practice/prac-7-project-1/backend/:/app/ -v /app/node_modules -e MONGO_USER=hamza -e MONGO_PASS=12345 --network my-network backend.new:v3


// FRONTEND -------
//docker run -it -p 3000:3000 --rm --name frontend_container frontend:v4.ip

//LINKED - frontend//docker run -it -p 3000:3000 -v /home/qhamza/practice/DevOps-Practice/docker-practice/prac-7-project-1/frontend/src/:/app/src/ --rm --name frontend-container frondend:v1