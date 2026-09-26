import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.admin.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
  res.json({ token, user: { email: user.email } });
};

export const me = async (req, res) => {
  const user = await prisma.admin.findUnique({ where: { id: req.userId } });
  res.json({ email: user.email });
};
