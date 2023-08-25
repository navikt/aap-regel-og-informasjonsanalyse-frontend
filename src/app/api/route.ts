import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ token: process.env.SANITY_API_TOKEN }, { status: 200 });
}
