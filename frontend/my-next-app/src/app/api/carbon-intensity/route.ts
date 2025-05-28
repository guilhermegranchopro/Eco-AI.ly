import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function GET() {
  try {
    console.log('🔄 Proxy: Fetching carbon intensity data from:', `${API_BASE_URL}/api/carbon-intensity`);
    
    const response = await fetch(`${API_BASE_URL}/api/carbon-intensity`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('❌ Proxy: API response not ok:', response.status);
      return NextResponse.json(
        { error: `API responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Proxy: Successfully fetched carbon intensity data');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Proxy: Error fetching carbon intensity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch carbon intensity data' },
      { status: 500 }
    );
  }
}
