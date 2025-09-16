import { NextRequest, NextResponse } from 'next/server';

interface Feedback {
  id: string;
  customerName: string;
  customerEmail: string;
  npsScore: number;
  comments: string;
  company: string;
  timestamp: string;
}

// In-memory storage (resets on server restart)
const feedbacks: Feedback[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const feedback: Feedback = {
      id: Date.now().toString(),
      ...body,
    };

    feedbacks.push(feedback);

    return NextResponse.json({ success: true, id: feedback.id });
  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');

    if (company) {
      const companyFeedbacks = feedbacks.filter(f => f.company === company);
      return NextResponse.json(companyFeedbacks);
    }

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}