import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollZoomPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tunnelWrapRef = useRef<HTMLDivElement>(null);
  const [isTunnelSticky, setIsTunnelSticky] = useState(false);

  // Scroll progress for the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll progress specifically for tunnel wrap
  const { scrollYProgress: tunnelProgress } = useScroll({
    target: tunnelWrapRef,
    offset: ["start start", "end start"]
  });

  // Create multiple ring layers for tunnel effect
  const rings = [
    { baseScale: 1, borderWidth: 2 },
    { baseScale: 0.8, borderWidth: 3 },
    { baseScale: 0.6, borderWidth: 4 },
    { baseScale: 0.4, borderWidth: 5 },
    { baseScale: 0.2, borderWidth: 6 },
  ];

  return (
    <motion.div 
      ref={containerRef} 
      className="min-h-[500vh] w-full relative bg-[#0F3BD0] text-white"
    >
      {/* Initial content sections */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl">Scroll Down</h1>
      </div>
      
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-2xl">Scroll to enter the tunnel</h2>
      </div>

      {/* Tunnel section - make it tall enough to scroll */}
      <div 
        ref={tunnelWrapRef} 
        className="tunnel-wrap bg-[#0D2B8F] h-[300vh] relative"
      >
        {/* Sticky positioning container */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          {/* Container for centered rings */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Tunnel rings */}
            {rings.map((ring, index) => {
              // Only animate when tunnel is sticky and before scrolling out
              const scale = useTransform(
                tunnelProgress,
                [0, 0.01, 0.99, 1],  // Added buffer zones
                [ring.baseScale, ring.baseScale, ring.baseScale * 10, ring.baseScale * 10]
              );

              return (
                <motion.div 
                  key={index}
                  style={{ 
                    scale, 
                    borderWidth: ring.borderWidth,
                    position: 'absolute',
                    width: `${200 * ring.baseScale}px`,
                    height: `${200 * ring.baseScale}px`,
                    borderRadius: '50%',
                    border: 'solid black',
                    opacity: 0.5
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Content after tunnel */}
      <div className="h-[200vh] flex items-center justify-center">
        <h2 className="text-2xl">Post-Tunnel Content</h2>
        <p>You've passed through the tunnel</p>
      </div>
    </motion.div>
  );
};

export default ScrollZoomPage;