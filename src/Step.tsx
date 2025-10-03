import React from 'react';

// 1. Define the TypeScript interface for the component's props (inputs)
interface StepProps {
  idx: string;    // The step number (e.g., "01")
  title: string;  // The main title (e.g., "Follow arrows")
  text: string;   // The descriptive text
}

// 2. Define the Step functional component
// We use 'export const' so we can import it with named imports { Step }
export const Step: React.FC<StepProps> = ({ idx, title, text }) => {
  return (
    // 'p-6' for padding, 'bg-gray-50' for a light background
    <div className="p-6 border-t-4 border-yellow-700 bg-gray-50 rounded-lg shadow-md">
      
      {/* Step Index (01, 02, 03) */}
      <div className="text-3xl font-serif font-bold text-yellow-700 mb-2">
        {idx}
      </div>
      
      {/* Step Title */}
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">
        {title}
      </h3>
      
      {/* Step Description */}
      <p className="text-gray-600">
        {text}
      </p>
    </div>
  );
};