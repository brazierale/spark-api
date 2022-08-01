const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepSchema = new Schema(
  {
    id: Number,
    name: String
  }
);

const TestCaseSchema = new Schema(
  {
    key: String,
    sortId: Number,
    summary: String,
    description: String,
    steps: [StepSchema],
    tags: [String]
  },
);

module.exports = mongoose.model('TestCase', TestCaseSchema);
