const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Diagnostic = require('../models/Diagnostic');

// Set up multer for file uploads
const upload = multer({
  dest: path.join(__dirname, '../uploads'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF or image files allowed'));
  },
});

// Simulate Gemini LLM analysis
function mockGeminiAnalysis(symptoms, reportText) {
  // Simple logic for demonstration
  let conditions = 'General viral infection';
  let tests = 'CBC, CRP';
  let specialist = 'General Physician';
  if (symptoms.toLowerCase().includes('chest pain')) {
    conditions = 'Possible cardiac issue';
    tests = 'ECG, Troponin, Chest X-ray';
    specialist = 'Cardiologist';
  } else if (symptoms.toLowerCase().includes('headache')) {
    conditions = 'Migraine or tension headache';
    tests = 'MRI (if severe), Blood Pressure';
    specialist = 'Neurologist';
  }
  // Add more logic as needed
  return { conditions, tests, specialist };
}

const router = express.Router();

router.post('/', upload.single('report'), async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) return res.status(400).json({ error: 'Symptoms required' });
    let reportText = '';
    if (req.file) {
      // Simulate OCR or PDF text extraction
      reportText = `Extracted text from ${req.file.originalname}`;
    }
    // Simulate Gemini LLM analysis
    const diagnosis = mockGeminiAnalysis(symptoms, reportText);
    // Save to DB
    const diagnostic = new Diagnostic({
      symptoms,
      reportFile: req.file ? req.file.filename : undefined,
      diagnosis,
    });
    await diagnostic.save();
    res.json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 