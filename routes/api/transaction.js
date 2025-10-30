import express from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { 
  saveAuditLog, 
  getAllTransactions,
  getTransactionsByJobId,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  getJobById
} from '../../database.js';
import debug from 'debug';
import { ObjectId } from 'mongodb';
const debugTransaction = debug('app:transaction');

const router = express.Router();

// Mock Stripe payment processing for development
const processMockPayment = async (amount, customerId) => {
  if (process.env.NODE_ENV === 'development') {
    return {
      id: `pi_mock_${Date.now()}`,
      status: 'succeeded',
      amount: amount,
      customer: `cus_mock_${customerId}`
    };
  }
  // TODO: Implement real Stripe integration for production
  throw new Error('Stripe not configured for production');
};

// Get all transactions
router.get('', isAuthenticated, async (req, res) => {
  try {
    debugTransaction('Fetching all transactions');
    const transactions = await getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    debugTransaction('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get transactions by job ID
router.get('/job/:jobId', isAuthenticated, async (req, res) => {
  try {
    const transactions = await getTransactionsByJobId(req.params.jobId);
    res.status(200).json(transactions);
  } catch (error) {
    debugTransaction('Error fetching job transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get transaction by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    res.status(200).json(transaction);
  } catch (error) {
    debugTransaction('Error fetching transaction:', error);
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

// Create new transaction (process payment)
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // Verify job exists
    const job = await getJobById(req.body.jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Process payment (mock for development)
    const paymentResult = await processMockPayment(
      req.body.amount, 
      req.body.customerId
    );
    
    const newTransaction = {
      jobId: new ObjectId(req.body.jobId),
      customerId: new ObjectId(req.body.customerId),
      providerId: new ObjectId(req.body.providerId),
      amount: req.body.amount,
      stripePaymentIntentId: paymentResult.id,
      stripeCustomerId: paymentResult.customer,
      status: paymentResult.status,
      description: req.body.description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const createdTransaction = await createTransaction(newTransaction);
    
    debugTransaction('Transaction created:', createdTransaction._id);
    res.status(201).json(createdTransaction);
  } catch (error) {
    debugTransaction('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to process transaction' });
  }
});

// Update transaction status (refund, etc.)
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const result = await updateTransactionStatus(req.params.id, req.body.status);
    
    if (!result.value) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    const logEntry = {
      timeStamp: new Date(),
      operation: "update",
      collection: "transactions",
      documentId: req.params.id,
      changes: { status: req.body.status, updatedAt: new Date() },
      performedBy: req.user.email
    };
    await saveAuditLog(logEntry);
    
    res.status(200).json(result.value);
  } catch (error) {
    debugTransaction('Error updating transaction:', error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
});

export { router as transactionRouter };