/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg"
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < numParts; i++) {
    result[i] = [];
  }
  
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  direction = 'up',
  speed = 50
}: {
  reviews: string[],
  className?: string,
  reviewClassName?: (reviewIndex: number) => string,
  direction?: 'up' | 'down',
  speed?: number
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);

  useEffect(() => {
    if (!columnRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      if (columnRef.current) {
        setColumnHeight(columnRef.current.clientHeight);
      }
    });

    resizeObserver.observe(columnRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const allReviews = [...reviews, ...reviews];

  return (
    <div className="relative h-full overflow-hidden">
      <div 
        ref={columnRef} 
        className={cn(
          'space-y-8 py-4',
          direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down',
          direction === 'up' ? 'hover:pause-animation' : 'hover:pause-animation',
          className
        )}
        style={{ 
          '--scroll-speed': `${speed}s`
        } as React.CSSProperties}
      >
        {allReviews.map((review, idx) => (
          <div 
            key={idx} 
            className={cn(
              'relative aspect-[3/4] transform transition-transform duration-300 hover:scale-105',
              reviewClassName?.(idx)
            )}
          >
            <img
              src={review}
              alt={`Review ${idx + 1}`}
              className="w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = columns[2];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={column1}
            direction="up"
            speed={40}
            className="h-full"
          />
          <ReviewColumn
            reviews={column2}
            direction="down"
            speed={45}
            className="h-full"
          />
          <ReviewColumn
            reviews={column3}
            direction="up"
            speed={35}
            className="h-full"
          />
        </>
      )}
    </div>
  );
}

export function Reviews() {
  return (
    <div className="relative max-w-5xl mx-auto px-4">
      <img
        src="what-people-are-buying.png"
        alt="People are buying"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
    </div>
  );
}

export default Reviews;