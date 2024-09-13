'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ModelImage from '@/components/model-image';

const models = [
  { id: 'sdxl-lightning', name: 'SDXL Lightning', time: '~5s' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', time: '~5s' },
  { id: 'proteus', name: 'Proteus', time: '~10s' },
  { id: 'sdxl-emoji', name: 'SDXL Emoji', time: '~20s' },
];

type GeneratedImage = {
  id: string;
  url: string;
  likes: number;
  liked: boolean;
  model: string;
  time: string;
};

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingModels, setGeneratingModels] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const generateImages = async () => {
    setIsGenerating(true);
    setGeneratedImages([]);
    setGeneratingModels(models.map((model) => model.id));

    models.forEach(async (model) => {
      try {
        const response = await fetch(`/api/${model.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        if (data.output && data.output[0]) {
          const newImage: GeneratedImage = {
            id: uuidv4(),
            url: data.output[0],
            likes: 0,
            liked: false,
            model: model.name,
            time: model.time,
          };
          setGeneratedImages((prev) => [...prev, newImage]);
          saveGeneratedImage(newImage);
        }
      } catch (error) {
        console.error(`Error generating image for ${model.name}:`, error);
      } finally {
        setGeneratingModels((prev) => prev.filter((id) => id !== model.id));
      }
    });

    setIsGenerating(false);
  };

  const saveGeneratedImage = (image: GeneratedImage) => {
    const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '[]');
    savedImages.unshift(image);
    localStorage.setItem('generatedImages', JSON.stringify(savedImages));
  };

  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
        />
        <Button
          onClick={generateImages}
          disabled={isGenerating || !prompt}
          className="w-full sm:w-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {models.map((model) => {
          const image = generatedImages.find((img) => img.model === model.name);

          return (
            <ModelImage
              key={model.id}
              imageUrl={image?.url}
              modelName={model.name}
              isGenerating={generatingModels.includes(model.id)}
              time={model.time}
              initialLikes={image?.likes || 0}
              initialLiked={image?.liked || false}
              imageId={image?.id || model.id}
            />
          );
        })}
      </div>
    </Card>
  );
}
