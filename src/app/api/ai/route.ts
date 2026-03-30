import { NextRequest } from 'next/server';
import { enhanceWithAI, analyzeResume, enhanceExperience } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data, text, type } = body;

    switch (action) {
      case 'enhance': {
        const enhanced = await enhanceWithAI(text || '', type || 'bullet');
        return Response.json({ success: true, result: enhanced });
      }

      case 'analyze': {
        if (!data) {
          return Response.json({ success: false, error: 'Resume data required' }, { status: 400 });
        }
        const analysis = await analyzeResume(data);
        return Response.json({ success: true, result: analysis });
      }

      case 'enhance-experience': {
        if (!text) {
          return Response.json({ success: false, error: 'Description text required' }, { status: 400 });
        }
        const highlights = await enhanceExperience(text);
        return Response.json({ success: true, result: highlights });
      }

      default:
        return Response.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('AI API error:', error);
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
