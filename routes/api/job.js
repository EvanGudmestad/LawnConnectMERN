import express from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import debug from 'debug';
const debugJob = debug('app:job');

const router = express.Router();

let jobs = [
  { id: '101', customerName: 'John Doe', address: '123 Main St', description: 'Weekly lawn mowing', status: 'pending' },
  { id: '102', customerName: 'Jane Smith', address: '456 Oak Ave', description: 'One-time trimming and edging', status: 'completed' }
];

router.get('', isAuthenticated, (req, res) => {
  res.status(200).json(jobs);
});

router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).send('Job not found.');
  }
  res.status(200).json(job);
});

router.post('/', (req, res) => {
  const newJob = {
    id: (jobs.length + 101).toString(),
    ...req.body,
    status: 'pending'
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

router.put('/:id', (req, res) => {
  const jobIndex = jobs.findIndex(j => j.id === req.params.id);
  if (jobIndex === -1) {
    return res.status(404).send('Job not found.');
  }
  jobs[jobIndex] = { ...jobs[jobIndex], ...req.body };
  res.status(200).json(jobs[jobIndex]);
});

router.delete('/:id', (req, res) => {
  const initialLength = jobs.length;
  jobs = jobs.filter(j => j.id !== req.params.id);
  if (jobs.length === initialLength) {
    return res.status(404).send('Job not found.');
  }
  res.status(200).send('Job deleted successfully.');
});


export {router as jobRouter};