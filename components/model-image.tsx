'use client';

import React, { useEffect, useState } from 'react';
import { Heart, Download } from 'lucide-react';

type ModelImageProps = {
    imageUrl?: string;
    modelName: string;
    isGenerating: boolean;
    time: string;
    initialLikes: number;
    initialLiked: boolean;
    imageId: string;
  };
  

const ModelImage: React.FC<ModelImageProps> = ({
    imageUrl,
    modelName,
    isGenerating,
    time,
    initialLikes,
    initialLiked,
    imageId,
  }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);
  
    // Optional: Persist like status in localStorage
    useEffect(() => {
      const savedLiked = localStorage.getItem(`liked_${imageId}`);
      if (savedLiked !== null) {
        setLiked(savedLiked === 'true');
      }
    }, [imageId]);
  
    const handleLike = () => {
      if (!liked) {
        setLikes(likes + 1);
        setLiked(true);
        localStorage.setItem(`liked_${imageId}`, 'true');
      } else {
        setLikes(likes - 1);
        setLiked(false);
        localStorage.setItem(`liked_${imageId}`, 'false');
      }
  };
  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl, {
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${modelName.replace(/\s+/g, '_')}.png`; // Set the desired filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Generated by ${modelName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {isGenerating ? 'Generating...' : 'Image will appear here'}
          </div>
        )}
        {imageUrl && (
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button onClick={handleLike} className="text-white mr-2">
            {liked ? <Heart fill="currentColor" size={24} /> : <Heart size={24} />}
          </button>
          <button onClick={handleDownload} className="text-white">
            <Download size={24} />
          </button>
        </div>
        
        )}
      </div>
      <div className="text-center">
        <p className="font-semibold">{modelName}</p>
        <p className="text-sm text-gray-500">{time}</p>
        <p className="text-sm text-gray-500">Likes: {likes}</p> {/* Display the likes count */}
      </div>
    </div>
  );
};

export default ModelImage;
