import { useCallback, useEffect, useRef } from 'react';

const useScroll = ({ activeSection, isTransitioning, navigateToSection }) => {
  const scrollRef = useRef(null);
  const scrollAccumulator = useRef(0);
  const scrollThreshold = 100;

  const handleScroll = useCallback(
    (event) => {
      event.preventDefault();
      if (isTransitioning) return;

      scrollAccumulator.current += event.deltaY;

      if (Math.abs(scrollAccumulator.current) > scrollThreshold) {
        const delta = Math.sign(scrollAccumulator.current);
        const newSection = (activeSection ?? -1) + delta;

        if (newSection >= 0 && newSection <= 2) {
          navigateToSection(newSection);
        }

        scrollAccumulator.current = 0;
      }
    },
    [activeSection, isTransitioning, navigateToSection]
  );

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleScroll, { passive: false });
      return () => {
        currentRef.removeEventListener('wheel', handleScroll);
      };
    }
  }, [handleScroll]);

  return scrollRef;
};

export default useScroll;