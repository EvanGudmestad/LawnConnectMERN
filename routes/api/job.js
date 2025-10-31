import express from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { 
  saveAuditLog, 
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../../database.js';
import debug from 'debug';
const debugJob = debug('app:job');
import { hasRole } from '../../middleware/hasRole.js';

const router = express.Router();

// Get all jobs
router.get('', isAuthenticated, async (req, res) => {
  try {
    debugJob('Fetching all jobs');
    const jobs = await getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    debugJob('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.status(200).json(job);
  } catch (error) {
    debugJob('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Create new job
router.post('/', isAuthenticated, hasRole('customer'), async (req, res) => {
  try {
    req.body.customerId = req.user.id; // Set customerId from authenticated user
    const createdJob = await createJob(req.body);
    res.status(201).json(createdJob);
  } catch (error) {
    debugJob('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Update job (owner-only)
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const existing = await getJobById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Job not found' });
    if (existing.customerId?.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const result = await updateJob(req.params.id, req.body);
    if (!result.value) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(result.value);
  } catch (error) {
    debugJob('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete job (owner-only)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const existing = await getJobById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Job not found' });
    if (existing.customerId?.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const result = await deleteJob(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const logEntry = {
      timeStamp: new Date(),
      operation: "delete",
      collection: "jobs",
      documentId: req.params.id,
      performedBy: req.user.email
    };
    await saveAuditLog(logEntry);

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    debugJob('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

export { router as jobRouter };