'use client';

import React from 'react';
import { Heart, Download } from 'lucide-react';

type ImageType = {
  id: string;
  url: string;
  likes: number;
  liked: boolean;
  model: string;
};

interface ImageGridProps {
  images?: ImageType[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images = [] }) => {
  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={image.id || index} className="relative group">
          <img
            src={image.url}
            alt={`Generated image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="text-white mr-2">
              <Heart size={24} />
            </button>
            <button className="text-white">
              <Download size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
