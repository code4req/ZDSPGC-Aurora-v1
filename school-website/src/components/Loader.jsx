import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.from(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
    })
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 1.5,
      ease: 'power2.in',
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🏫</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          SchoolName
        </h1>
        <div className="mt-4 flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-200" />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-400" />
        </div>
      </div>
    </div>
  );
}

export default Loader;