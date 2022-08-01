const mongoose = require('mongoose');
require('dotenv').config();

const dbRoute = process.env.DB_ROUTE;

// connect, drop, then disconnect
mongoose.connect( dbRoute, function() {
  mongoose.connection.db.dropCollection('testcases', function() {
    mongoose.disconnect();
  });
});
