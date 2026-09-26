import bcrypt from 'bcryptjs';
import prisma from '../src/config/prisma.js';

async function main() {
  // First admin
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({ where: { email: 'admin@hpedit.com' }, update: {}, create: { email: 'admin@hpedit.com', password: hash } });

  // Hero (existing content approximate)
  await prisma.hero.upsert({ where: { id: 1 }, update: { title: 'Creativity deserves a beautiful home', subtitle: 'Built for creators, by people who believe in you.', isActive: true }, create: { id: 1, title: 'Creativity deserves a beautiful home', subtitle: 'Built for creators, by people who believe in you.', isActive: true } });

  // Creators (approximate from FeaturedCreators cards — using placeholders based on site)
  await prisma.creator.createMany({ skipDuplicates: true, data: [
    { name: 'Creator A', sub: 'Illustrator', imageUrl: 'https://example.com/a.jpg', isActive: true },
    { name: 'Creator B', sub: 'Photographer', imageUrl: 'https://example.com/b.jpg', isActive: true },
  ]});

  // Testimonials
  await prisma.testimonial.createMany({ skipDuplicates: true, data: [
    { quote: 'HPEDIT changed how I share my work.', author: 'Jane Doe', isActive: true },
  ]});

  // Settings
  await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1, siteName: 'HPEDIT', footerText: 'Create · Share · Inspire · Belong' } });
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
