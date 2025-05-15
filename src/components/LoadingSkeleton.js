import React from 'react';
import { motion } from 'framer-motion';

// Basic skeleton component
const Skeleton = ({ height, width, className = '' }) => (
  <motion.div
    className={`bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 animate-pulse rounded ${className}`}
    style={{ height, width }}
    initial={{ opacity: 0.7 }}
    animate={{ opacity: [0.7, 0.9, 0.7] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

// Text line skeleton
const TextSkeleton = ({ lines = 1, lastLineWidth = '100%' }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        height={16} 
        width={i === lines - 1 && lines > 1 ? lastLineWidth : '100%'} 
      />
    ))}
  </div>
);

// Avatar skeleton
const AvatarSkeleton = ({ size = 48 }) => (
  <Skeleton height={size} width={size} className="rounded-full" />
);

// Card skeleton
const CardSkeleton = () => (
  <div className="border rounded-lg p-4 shadow-sm w-full">
    <div className="flex items-center mb-4">
      <AvatarSkeleton size={40} />
      <div className="ml-3 flex-1">
        <Skeleton height={16} width="70%" />
        <Skeleton height={12} width="40%" className="mt-2" />
      </div>
    </div>
    <TextSkeleton lines={3} lastLineWidth="80%" />
  </div>
);

// Scripture item skeleton
const ScriptureItemSkeleton = () => (
  <div className="p-3 border-b">
    <Skeleton height={20} width="60%" className="mb-2" />
    <TextSkeleton lines={2} lastLineWidth="90%" />
  </div>
);

// Default export as a composite component
const LoadingSkeleton = ({ type = 'default', count = 1, ...props }) => {
  // Render appropriate skeleton based on type
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return <TextSkeleton {...props} />;
      case 'avatar':
        return <AvatarSkeleton {...props} />;
      case 'card':
        return <CardSkeleton />;
      case 'scripture':
        return <ScriptureItemSkeleton />;
      default:
        return <Skeleton {...props} />;
    }
  };

  // Render multiple instances if count > 1
  if (count > 1) {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>{renderSkeleton()}</div>
        ))}
      </div>
    );
  }

  return renderSkeleton();
};

export default LoadingSkeleton;

// Also export individual components for direct use
export { TextSkeleton, AvatarSkeleton, CardSkeleton, ScriptureItemSkeleton };
