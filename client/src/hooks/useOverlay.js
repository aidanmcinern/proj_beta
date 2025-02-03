import { useState, useCallback } from 'react';

const useOverlay = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showLinktree, setShowLinktree] = useState(false);
  const [showBarOptions, setShowBarOptions] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleOverlayClick = useCallback((e) => {
    if (e.target.classList.contains('overlay')) {
      setShowIframe(false);
      setShowBarOptions(false);
      setShowChatbot(false);
    }
  }, []);

  return {
    showIframe,
    showLinktree,
    showBarOptions,
    showChatbot,
    setShowIframe,
    setShowLinktree,
    setShowBarOptions,
    setShowChatbot,
    handleOverlayClick,
  };
};

export default useOverlay;