const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const Data = require('./dataSchema');
require('dotenv').config();

const app = express();
const router = express.Router();
const dbRoute = process.env.DB_ROUTE;
// mongoDB connection to spark database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to database');
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use((req, res, next) => {
  console.log('Request received by express');
  next();
});


// for now GET gets all data, should be updated to only look in testcase collection?
router.get('/testCases', (req,res) => {
  Data.find((err, data) => {
    if (err) return res.json( {success: false, error: err });
    return res.json({ success:true, data: data });
  });
});

// get details for a single test case
router.get('/testCases/:key', (req, res) => {
  Data.findOne({key: req.params.key}, (err, data) => {
    if (err) return res.json ( {success:false, error: err });
    return res.json({ success:true, data: data });
  });
});

// create a new test case
router.post('/testCases', (req, res) => {
  let data = new Data();
  const { key, sortId, summary, description, steps, tags } = req.body;
  data.key = key;
  data.sortId = sortId;
  data.summary = summary;
  data.description = description;
  data.steps = steps;
  data.tags = tags;

  data.save(err => {
    if (err) return res.json({success:false, error: err });
    return res.json({ success: true });
  });
});

// update an existing test case
router.put('/testCases/:key', (req, res) => {
  Data.findOneAndUpdate({ key: req.params.key }, req.body.update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// delete a test case
router.delete('/testCases/:key', (req, res) => {
  Data.findOneAndDelete({ key: req.params.key }, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// append /api to http requests
app.use('/api', router);

app.listen(3001, () => console.log('Example app listening on port 3001!'));
