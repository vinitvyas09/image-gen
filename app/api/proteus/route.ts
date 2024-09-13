import { NextResponse } from 'next/server';
import replicate from '../utils/replicate';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const output = await replicate.run(
      "datacte/proteus-v0.2:06775cd262843edbde5abab958abdbb65a0a6b58ca301c9fd78fa55c775fc019",
      {
        input: {
          prompt: prompt
        }
      }
    );

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}