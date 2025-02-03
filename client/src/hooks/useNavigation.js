import { useState, useCallback } from 'react';

const useNavigation = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [showLinktree, setShowLinktree] = useState(false);
  const [showBarOptions, setShowBarOptions] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const resetAllStates = useCallback(() => {
    setShowIframe(false);
    setShowLinktree(false);
    setShowChatbot(false);
    setShowBarOptions(false);
  }, []);

  const navigateToSection = useCallback((newSection, options = { immediate: false }) => {
    setIsTransitioning(true);
    resetAllStates();

    // If immediate navigation is requested (like for Back to Bar button),
    // skip the initial delay
    const initialDelay = options.immediate ? 0 : 500;

    setTimeout(() => {
      setActiveSection(newSection);

      // For immediate navigation to bar options, skip the transition delay
      const transitionDelay = (options.immediate && newSection === 1) ? 0 : 3000;

      setTimeout(() => {
        switch (newSection) {
          case 0:
            setShowIframe(true);
            break;
          case 1:
            setShowBarOptions(true);
            break;
          case 2:
            setShowLinktree(true);
            break;
          default:
            break;
        }
        setIsTransitioning(false);
      }, transitionDelay);
    }, initialDelay);
  }, [resetAllStates]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target.classList.contains('overlay')) {
      resetAllStates();
    }
  }, [resetAllStates]);

  return {
    activeSection,
    isTransitioning,
    showIframe,
    showLinktree,
    showBarOptions,
    showChatbot,
    navigateToSection,
    handleOverlayClick,
    setActiveSection,
    setShowIframe,
    setShowLinktree,
    setShowBarOptions,
    setShowChatbot
  };
};

export default useNavigation;