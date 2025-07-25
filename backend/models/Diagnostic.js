const mongoose = require('mongoose');

const DiagnosticSchema = new mongoose.Schema({
  symptoms: { type: String, required: true },
  reportFile: { type: String }, // file path or filename
  diagnosis: {
    conditions: String,
    tests: String,
    specialist: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Diagnostic', DiagnosticSchema); 