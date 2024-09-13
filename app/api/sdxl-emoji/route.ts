import { NextResponse } from 'next/server';
import replicate from '../utils/replicate';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const output = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          prompt: `a TOK emoji of ${prompt}`,
          apply_watermark: false
        }
      }
    );

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}