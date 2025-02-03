import { useState, useCallback } from 'react';

const useModelController = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModelLoaded = useCallback(() => {
    setIsModelLoaded(true);
  }, []);

  return {
    isModelLoaded,
    isTransitioning,
    handleModelLoaded,
    setIsTransitioning
  };
};

export default useModelController;