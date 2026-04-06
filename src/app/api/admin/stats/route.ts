import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    totalUsers,
    totalResumes,
    newUsersThisMonth,
    newResumesThisMonth,
    activeUsersThisWeek,
    recentLogins,
    dailyUsers,
    dailyResumes,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.resume.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.user.count({ where: { lastLoginAt: { gte: sevenDaysAgo } } }),
    prisma.loginHistory.findMany({
      orderBy: { loginAt: 'desc' },
      take: 10,
      include: { user: { select: { name: true, email: true, image: true } } },
    }),
    // Daily new users for last 30 days
    prisma.$queryRaw<Array<{ date: unknown; count: unknown }>>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM "User"
      WHERE "createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
    // Daily new resumes for last 30 days
    prisma.$queryRaw<Array<{ date: unknown; count: unknown }>>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM "Resume"
      WHERE "createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
  ]);

  // Daily active users (logins per day for last 30 days)
  const dailyActiveUsers = await prisma.$queryRaw<Array<{ date: unknown; count: unknown }>>`
    SELECT DATE("loginAt") as date, COUNT(DISTINCT "userId") as count
    FROM "LoginHistory"
    WHERE "loginAt" >= ${thirtyDaysAgo}
    GROUP BY DATE("loginAt")
    ORDER BY date ASC
  `;

  return NextResponse.json({
    overview: {
      totalUsers,
      totalResumes,
      newUsersThisMonth,
      newResumesThisMonth,
      activeUsersThisWeek,
    },
    recentLogins,
    charts: {
      dailyUsers: dailyUsers.map((d: { date: unknown; count: unknown }) => ({ date: String(d.date), count: Number(d.count) })),
      dailyResumes: dailyResumes.map((d: { date: unknown; count: unknown }) => ({ date: String(d.date), count: Number(d.count) })),
      dailyActiveUsers: dailyActiveUsers.map((d: { date: unknown; count: unknown }) => ({ date: String(d.date), count: Number(d.count) })),
    },
  });
}
