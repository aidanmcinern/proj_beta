import { useState, useEffect } from 'react';

export const useInteractionTracking = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('wheel', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
    };
  }, [hasInteracted]);

  return hasInteracted;
};

export default useInteractionTracking;