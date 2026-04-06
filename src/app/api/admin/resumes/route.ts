import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const search = request.nextUrl.searchParams.get('search') ?? '';
  const userId = request.nextUrl.searchParams.get('userId') ?? '';
  const page = parseInt(request.nextUrl.searchParams.get('page') ?? '1');
  const limit = 20;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (userId) where.userId = userId;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { user: { name: { contains: search, mode: 'insensitive' } } },
      { user: { email: { contains: search, mode: 'insensitive' } } },
    ];
  }

  const [resumes, total] = await Promise.all([
    prisma.resume.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
    }),
    prisma.resume.count({ where }),
  ]);

  return NextResponse.json({ resumes, total, page, pages: Math.ceil(total / limit) });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Resume ID required' }, { status: 400 });
  }

  await prisma.resume.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
