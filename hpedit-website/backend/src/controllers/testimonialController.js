import prisma from '../config/prisma.js';

export const list = async (req, res) => {
  const list = await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
  res.json(list);
};
export const get = async (req, res) => {
  const item = await prisma.testimonial.findUnique({ where: { id: Number(req.params.id) } });
  res.json(item);
};
export const create = async (req, res) => {
  const item = await prisma.testimonial.create({ data: req.body });
  res.json(item);
};
export const update = async (req, res) => {
  const item = await prisma.testimonial.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json(item);
};
export const remove = async (req, res) => {
  await prisma.testimonial.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
};
