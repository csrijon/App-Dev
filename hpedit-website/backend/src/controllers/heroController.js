import prisma from '../config/prisma.js';
export const get = async (req, res) => { const h = await prisma.hero.findFirst({ where: { isActive: true } }); res.json(h); };
export const update = async (req, res) => {
  const updated = await prisma.hero.update({ where: { id: Number(req.params.id) || 1 }, data: req.body });
  req.io.emit('hero:updated', updated); res.json(updated);
};
