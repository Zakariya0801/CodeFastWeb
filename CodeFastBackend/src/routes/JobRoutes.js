const express = require('express');
const router = express.Router();

const { createJob, getJobs, deleteJob, updateJob } = require('../controllers/JobController');
const {protect} = require('../middleware/AuthMiddleware');

router.post('/', protect, createJob); // Create a new job
router.get('/', protect, getJobs); // Get all jobs for the logged-in industry
router.delete('/:id', protect, deleteJob); // Delete a job by ID
router.put('/:id', protect, updateJob); // Update a job by ID

module.exports = router;