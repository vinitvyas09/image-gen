import React from 'react';

const TestHover: React.FC = () => {
  return (
    <div className="relative group w-64 h-64 bg-gray-200">
      <img
        src="https://via.placeholder.com/256"
        alt="Placeholder"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="text-white mr-2">Like</button>
        <button className="text-white">Download</button>
      </div>
    </div>
  );
};

export default TestHover;
