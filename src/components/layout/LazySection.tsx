import React, { Suspense, useRef } from 'react';
import { useInView } from 'framer-motion';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback = <div className="min-h-[400px] w-full" />, 
  className = '',
  rootMargin = "200px 0px"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin as any });

  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : fallback}
    </div>
  );
};
