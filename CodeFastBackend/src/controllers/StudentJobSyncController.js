const StudentIndustry = require('../models/Student-IndustryModel');
const Job = require('../models/JobModel');

const syncJobsToStudentIndustry = async (req, res) => {
  try {
    const studentId = req.user._id;

    const jobs = await Job.find({ status: "OPEN" });
    const inserted = [];
    console.log("jobs = ", jobs)
    for (const job of jobs) {
      const exists = await StudentIndustry.findOne({ studentId, jobId: job._id });
      if (!exists) {
        const newEntry = new StudentIndustry({
          studentId,
          jobId: job._id,
          request: -1,
          status: 0,
        });
        await newEntry.save();
        inserted.push(newEntry);
      }
    }
    console.log("inserted = ", inserted)

    res.status(200).json({ message: "Synced jobs to student-industry model", inserted });
  } catch (error) {
    console.log("error = ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const applyToJob = async (req, res) => {
    try {
      const studentId = req.user._id;
      const { jobId } = req.params;
  
      const updated = await StudentIndustry.findOneAndUpdate(
        { studentId, jobId },
        { request: 0, status: 0 },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Student-Job relation not found" });
      }
  
      res.status(200).json({ message: "Applied successfully", updated });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 const avaliableJobs = async (req, res) => {
    try {
        const studentId = req.user._id;
        const jobs = await StudentIndustry.find({ studentId, request: -1 })
                      .populate({
                        path: 'jobId',
                        populate: {
                          path: 'industry',
                        },
                      });
        console.log("jobs = ", jobs)
        if (!jobs) return res.status(404).json({ message: 'Jobs not found' });
        res.status(200).json({message: 'Jobs avaliable', jobs});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  const appliedJobs = async (req, res) => {
    try {
        const studentId = req.user._id;
        const jobs = await StudentIndustry.find({ studentId, request: 0 }).populate({
          path: 'jobId',
          populate: {
            path: 'industry',
          },
        });
        if (!jobs) return res.status(404).json({ message: 'Jobs not found' });
        res.status(200).json({message: 'Jobs applied', jobs});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  const offeredJobs = async (req, res) => {
    try {
        const studentId = req.user._id;
        const jobs = await StudentIndustry.find({ studentId, request: 1 }).populate({
          path: 'jobId',
          populate: {
            path: 'industry',
          },
        });
        if (!jobs) return res.status(404).json({ message: 'Jobs not found' });
        res.status(200).json({message: 'Jobs offered', jobs});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  const ongoingJobs = async (req, res) => {
    try{
        const studentId = req.user._id;
        const jobs= await StudentIndustry.find({ studentId, status:1}).populate({
          path: 'jobId',
          populate: {
            path: 'industry',
          },
        });
        if (!jobs) return res.status(404).json({ message: 'Jobs not found' });
        res.status(200).json({message: 'Jobs ongoing', jobs});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  module.exports = { syncJobsToStudentIndustry, applyToJob, avaliableJobs, appliedJobs, offeredJobs, ongoingJobs };

