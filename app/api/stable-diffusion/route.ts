import { NextResponse } from 'next/server';
import replicate from '../utils/replicate';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
          scheduler: "K_EULER"
        }
      }
    );

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}