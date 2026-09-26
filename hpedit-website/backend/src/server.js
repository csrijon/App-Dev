import express from 'express';
import cors from 'cors';
import prisma from './config/prisma.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.set('io', io);

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Hero
app.get('/api/hero', async (req, res) => {
  const h = await prisma.hero.findFirst({ where: { isActive: true } });
  res.json(h);
});
app.put('/api/hero', async (req, res) => {
  // auth omitted for brevity; in production use JWT middleware
  const updated = await prisma.hero.update({ where: { id: 1 }, data: req.body });
  io.emit('hero:updated', updated);
  res.json(updated);
});

// Creators
app.get('/api/creators', async (req, res) => {
  const list = await prisma.creator.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
  res.json(list);
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
  const list = await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
  res.json(list);
});

// Settings
app.get('/api/settings', async (req, res) => {
  const s = await prisma.siteSettings.findFirst();
  res.json(s);
});

import routes from './routes/index.js';
app.use('/api', routes);

io.on('connection', s => { console.log('Socket connected', s.id); });

server.listen(process.env.PORT || 4000, () => console.log('API + Socket.IO running'))
