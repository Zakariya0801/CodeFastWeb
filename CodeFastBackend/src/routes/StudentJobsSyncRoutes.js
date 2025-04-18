const express = require('express');
const router = express.Router();
const {
  syncJobsToStudentIndustry,
  applyToJob,
  avaliableJobs,
  appliedJobs,
  offeredJobs,
  ongoingJobs
} = require('../controllers/StudentJobSyncController');



// Sync jobs for current student
router.get('/sync', syncJobsToStudentIndustry);

// Apply to a job
router.put('/apply/:jobId', applyToJob);

// Get available jobs (request = -1)
router.get('/available', avaliableJobs);

// Get applied jobs (request = 0)
router.get('/applied',  appliedJobs);

// Get offered jobs (request = 1)
router.get('/offered',  offeredJobs);

// Get ongoing jobs (status = 1)
router.get('/ongoing', ongoingJobs);

module.exports = router;
