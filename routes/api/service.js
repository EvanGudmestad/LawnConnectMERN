import express from 'express';
import debug from 'debug';
import { ObjectId } from 'mongodb';
import {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  saveAuditLog
} from '../../database.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';
import { validId } from '../../middleware/validId.js';

const debugServices = debug('app:services');
const router = express.Router();

// GET /api/services
// Supports optional filters and pagination
router.get('/', async (req, res) => {
  try {
    const { page, limit, sortBy, sortDir, name, active, companyId, minPrice, maxPrice } = req.query;

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 0; // 0 = no limit
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    // Filter construction (opt-in only for known fields)
    const filter = {};
    if (name) {
      filter.name = { $regex: String(name), $options: 'i' };
    }
    if (typeof active !== 'undefined') {
      if (active === 'true' || active === true) filter.active = true;
      if (active === 'false' || active === false) filter.active = false;
    }
    if (companyId) {
      try { filter.companyId = new ObjectId(companyId); } catch {}
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
      // clean up if NaN
      if (Object.keys(filter.price).length === 0) delete filter.price;
    }

    // Sorting
    const allowedSorts = new Set(['name', 'price', 'createdAt', 'updatedAt']);
    const sortField = allowedSorts.has(sortBy) ? sortBy : undefined;
    const sortDirection = String(sortDir).toLowerCase() === 'desc' ? -1 : 1;
    const sort = sortField ? { [sortField]: sortDirection } : {};

    debugServices(`GET services filter=${JSON.stringify(filter)} sort=${JSON.stringify(sort)} limit=${limitNum} skip=${skip}`);
    const services = await getServices(filter, sort, limitNum, skip);
    res.status(200).json(services);
  } catch (err) {
    debugServices(`Error listing services: ${err?.message || err}`);
    res.status(500).json({ message: 'Error retrieving services' });
  }
});

// GET /api/services/:id
router.get('/:id', validId('id'), async (req, res) => {
  try {
    const service = await getServiceById(req.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (err) {
    debugServices(`Error getting service: ${err?.message || err}`);
    res.status(500).json({ message: 'Error retrieving service' });
  }
});

// POST /api/services
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const service = req.body || {};
    const now = new Date();
    service.createdAt = now;
    service.updatedAt = now;
    service.createdBy = req.user?.email || 'system';
    if (service.companyId && typeof service.companyId === 'string') {
      try { service.companyId = new ObjectId(service.companyId); } catch {}
    }

    const result = await addService(service);
    if (result?.insertedId) {
      await saveAuditLog({
        timeStamp: now,
        operation: 'create',
        collection: 'service',
        documentId: result.insertedId,
        performedBy: req.user?.email || 'system'
      });
      return res.status(201).json({ _id: result.insertedId, ...service });
    }
    res.status(500).json({ message: 'Error creating service' });
  } catch (err) {
    debugServices(`Error creating service: ${err?.message || err}`);
    res.status(500).json({ message: 'Error creating service' });
  }
});

// PATCH /api/services/:id
router.patch('/:id', isAuthenticated, validId('id'), async (req, res) => {
  try {
    const updates = { ...req.body };
    updates.updatedAt = new Date();
    updates.updatedBy = req.user?.email || 'system';
    if (updates.companyId && typeof updates.companyId === 'string') {
      try { updates.companyId = new ObjectId(updates.companyId); } catch {}
    }
    const result = await updateService(req.id, updates);
    if (result?.modifiedCount === 1) {
      await saveAuditLog({
        timeStamp: new Date(),
        operation: 'update',
        collection: 'service',
        documentId: req.id,
        performedBy: req.user?.email || 'system'
      });
      return res.status(200).json({ message: 'Service updated successfully' });
    }
    res.status(404).json({ message: 'Service not updated' });
  } catch (err) {
    debugServices(`Error updating service: ${err?.message || err}`);
    res.status(500).json({ message: 'Error updating service' });
  }
});

// DELETE /api/services/:id
router.delete('/:id', isAuthenticated, validId('id'), async (req, res) => {
  try {
    const result = await deleteService(req.id);
    if (result?.deletedCount === 1) {
      await saveAuditLog({
        timeStamp: new Date(),
        operation: 'delete',
        collection: 'service',
        documentId: req.id,
        performedBy: req.user?.email || 'system'
      });
      return res.status(200).json({ message: 'Service deleted successfully' });
    }
    res.status(404).json({ message: 'Service not found' });
  } catch (err) {
    debugServices(`Error deleting service: ${err?.message || err}`);
    res.status(500).json({ message: 'Error deleting service' });
  }
});

export { router as serviceRouter };
