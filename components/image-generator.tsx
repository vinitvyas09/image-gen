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

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingModels, setGeneratingModels] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<{ [key: string]: string }>({});

  const generateImages = async () => {
    setIsGenerating(true);
    setGeneratedImages({});
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
          setGeneratedImages((prev) => ({ ...prev, [model.id]: data.output[0] }));
          saveGeneratedImage(model.id, data.output[0]);
        }
      } catch (error) {
        console.error(`Error generating image for ${model.name}:`, error);
      } finally {
        setGeneratingModels((prev) => prev.filter((id) => id !== model.id));
      }
    });

    setIsGenerating(false);
  };

  const saveGeneratedImage = (modelId: string, imageUrl: string) => {
    const newImage = {
      id: uuidv4(),
      url: imageUrl,
      likes: 0,
      liked: false,
      model: models.find((m) => m.id === modelId)?.name || 'Unknown',
    };

    const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '[]');
    savedImages.unshift(newImage);
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
        {models.map((model) => (
          <ModelImage
            key={model.id}
            imageUrl={generatedImages[model.id]}
            modelName={model.name}
            isGenerating={generatingModels.includes(model.id)}
          />
        ))}
      </div>
    </Card>
  );
}
