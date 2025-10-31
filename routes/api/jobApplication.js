import express from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { 
  saveAuditLog,
  getAllJobApplications,
  getJobApplicationsByJobId,
  getJobApplicationById,
  createJobApplication,
  updateJobApplication,
  getJobById,
  updateJob
} from '../../database.js';
import debug from 'debug';
import { ObjectId } from 'mongodb';
const debugJobApp = debug('app:jobApplication');

const router = express.Router();

// Get all applications for a specific job
router.get('/job/:jobId', isAuthenticated, async (req, res) => {
  try {
    const applications = await getJobApplicationsByJobId(req.params.jobId);
    res.status(200).json(applications);
  } catch (error) {
    debugJobApp('Error fetching job applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get application by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const application = await getJobApplicationById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.status(200).json(application);
  } catch (error) {
    debugJobApp('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Provider applies for a job
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const job = await getJobById(req.body.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.status !== 'pending') {
      return res.status(400).json({ error: 'Job is no longer accepting applications' });
    }

    const newApplication = {
      jobId: req.body.jobId,
      providerId: req.user.id,
      // CHANGED: remove single serviceId; allow optional proposedServiceIds[]
      proposedServiceIds: Array.isArray(req.body.proposedServiceIds)
        ? req.body.proposedServiceIds.map(id => new ObjectId(id))
        : undefined,
      proposedPrice: req.body.proposedPrice,
      proposedDate: req.body.proposedDate,
      estimatedDuration: req.body.estimatedDuration,
      message: req.body.message || '',
      status: 'pending',
      appliedAt: new Date(),
      respondedAt: null
    };
    
    const createdApplication = await createJobApplication(newApplication);

    if (job.status === 'open') {
      await updateJob(req.body.jobId, { status: 'applied' });
    }

    res.status(201).json(createdApplication);
  } catch (error) {
    debugJobApp('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Customer accepts/rejects an application
router.patch('/:id/respond', isAuthenticated, async (req, res) => {
  try {
    const application = await getJobApplicationById(req.params.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });

    const newStatus = req.body.status; // 'accepted' or 'rejected'
    if (!['accepted', 'rejected'].includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = { status: newStatus, respondedAt: new Date() };
    const updatedApplication = await updateJobApplication(req.params.id, updateData);

    if (newStatus === 'accepted') {
      // CHANGED: don’t overwrite job.serviceIds unless app explicitly proposed them
      const jobUpdate = {
        providerId: application.providerId,
        status: 'assigned',
        scheduledDate: application.proposedDate,
        agreedPrice: application.proposedPrice,
        estimatedDuration: application.estimatedDuration
      };
      if (Array.isArray(application.proposedServiceIds) && application.proposedServiceIds.length) {
        jobUpdate.serviceIds = application.proposedServiceIds;
      }

      await updateJob(application.jobId.toString(), jobUpdate);

      const allApplications = await getJobApplicationsByJobId(application.jobId.toString());
      for (const app of allApplications) {
        if (app._id.toString() !== req.params.id && app.status === 'pending') {
          await updateJobApplication(app._id.toString(), {
            status: 'rejected',
            respondedAt: new Date()
          });
        }
      }
    }

    await saveAuditLog({
      timeStamp: new Date(),
      operation: "update",
      collection: "jobApplications",
      documentId: req.params.id,
      changes: updateData,
      performedBy: req.user.email
    });

    res.status(200).json(updatedApplication);
  } catch (error) {
    debugJobApp('Error responding to application:', error);
    res.status(500).json({ error: 'Failed to respond to application' });
  }
});

export { router as jobApplicationRouter };