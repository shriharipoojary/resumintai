import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ success: true, resumes });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { resume } = body;

    if (!resume) {
      return NextResponse.json({ success: false, error: 'Resume data required' }, { status: 400 });
    }

    const title = resume.personalInfo?.fullName || 'Untitled Resume';
    const slug = resume.id
      ? undefined
      : `${session.user.id}-${Date.now()}`;

    const saved = resume.id
      ? await prisma.resume.update({
          where: { id: resume.id, userId: session.user.id },
          data: {
            title,
            data: resume,
            template: resume.template ?? 'minimal',
          },
        })
      : await prisma.resume.create({
          data: {
            userId: session.user.id,
            title,
            data: resume,
            template: resume.template ?? 'minimal',
            slug,
          },
        });

    return NextResponse.json({ success: true, resume: saved });
  } catch (error) {
    console.error('Resume API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Resume ID required' }, { status: 400 });
  }

  await prisma.resume.deleteMany({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}
