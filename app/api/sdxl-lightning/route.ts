import { NextResponse } from 'next/server';
import replicate from '../utils/replicate';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
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