import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';
import { login, me } from '../controllers/authController.js';
import { get, update } from '../controllers/heroController.js';
import { list as categoryList, get as categoryGet, create as categoryCreate, update as categoryUpdate, remove as categoryRemove } from '../controllers/categoryController.js';
import { list as socialList, get as socialGet, create as socialCreate, update as socialUpdate, remove as socialRemove } from '../controllers/socialLinkController.js';
import { list as contactList, get as contactGet, remove as contactRemove } from '../controllers/contactController.js';
import { list as creatorList, get as creatorGet, create as creatorCreate, update as creatorUpdate, remove as creatorRemove } from '../controllers/creatorController.js';
import { list as testimonialList, get as testimonialGet, create as testimonialCreate, update as testimonialUpdate, remove as testimonialRemove } from '../controllers/testimonialController.js';
import { list as featureStripList, get as featureStripGet, create as featureStripCreate, update as featureStripUpdate, remove as featureStripRemove } from '../controllers/featureStripController.js';

const router = express.Router();

// Auth
router.post('/auth/login', login);
router.get('/auth/me', auth, me);

// Hero
router.get('/hero', get);
router.put('/hero/:id', auth, (req, res, next) => { req.io = req.app.get('io'); next(); }, update);

// Categories
router.get('/categories', categoryList);
router.get('/categories/:id', categoryGet);
router.post('/categories', auth, categoryCreate);
router.put('/categories/:id', auth, categoryUpdate);
router.delete('/categories/:id', auth, categoryRemove);

// Social Links
router.get('/social-links', socialList);
router.get('/social-links/:id', socialGet);
router.post('/social-links', auth, socialCreate);
router.put('/social-links/:id', auth, socialUpdate);
router.delete('/social-links/:id', auth, socialRemove);

// Contacts
router.get('/contacts', auth, contactList);
router.get('/contacts/:id', auth, contactGet);
router.delete('/contacts/:id', auth, contactRemove);

// Creators
router.get('/creators', creatorList);
router.get('/creators/:id', creatorGet);
router.post('/creators', auth, creatorCreate);
router.put('/creators/:id', auth, creatorUpdate);
router.delete('/creators/:id', auth, (req, res, next) => { req.io = req.app.get('io'); next(); }, async (req, res) => { await creatorRemove(req, res); req.app.get('io').emit('creator:deleted', Number(req.params.id)); });

// Feature Strips
router.get('/feature-strips', featureStripList);
router.get('/feature-strips/:id', featureStripGet);
router.post('/feature-strips', auth, featureStripCreate);
router.put('/feature-strips/:id', auth, featureStripUpdate);
router.delete('/feature-strips/:id', auth, featureStripRemove);

// Testimonials
router.get('/testimonials', testimonialList);
router.get('/testimonials/:id', testimonialGet);
router.post('/testimonials', auth, testimonialCreate);
router.put('/testimonials/:id', auth, testimonialUpdate);
router.delete('/testimonials/:id', auth, (req, res, next) => { req.io = req.app.get('io'); next(); }, async (req, res) => { await testimonialRemove(req, res); req.app.get('io').emit('testimonial:deleted', Number(req.params.id)); });

import prisma from '../config/prisma.js';

// Settings
router.get('/settings', async (req, res) => {
  const s = await prisma.siteSettings.findFirst();
  res.json(s);
});
router.put('/settings', auth, async (req, res) => {
  const updated = await prisma.siteSettings.update({ where: { id: 1 }, data: req.body });
  res.json(updated);
});

export default router;
