import { NextRequest } from 'next/server';

// Mock resume storage (in production, use Prisma + PostgreSQL)
const resumes = new Map<string, object>();

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId') || 'default';
  
  const userResumes = Array.from(resumes.entries())
    .filter(([key]) => key.startsWith(userId))
    .map(([, value]) => value);

  return Response.json({ success: true, resumes: userResumes });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resume, userId = 'default' } = body;

    if (!resume) {
      return Response.json({ success: false, error: 'Resume data required' }, { status: 400 });
    }

    const id = resume.id || `${userId}_${Date.now()}`;
    const savedResume = { ...resume, id, updatedAt: new Date().toISOString() };
    
    resumes.set(id, savedResume);

    return Response.json({ success: true, resume: savedResume });
  } catch (error) {
    console.error('Resume API error:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  
  if (!id) {
    return Response.json({ success: false, error: 'Resume ID required' }, { status: 400 });
  }

  resumes.delete(id);
  return Response.json({ success: true });
}
