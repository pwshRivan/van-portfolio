import { useState, useEffect } from "react";

export const useTypingEffect = (text, options = {}) => {
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseAfterTyping = 2000,
    pauseAfterDeleting = 500,
    initialDelay = 500,
    loop = true,
  } = options;

  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let timeout;
    let isDeleting = false;
    let charIndex = 0;

    const type = () => {
      if (isDeleting) {
        setTypedText(text.substring(0, charIndex - 1));
        charIndex--;
        timeout = setTimeout(type, deletingSpeed);
      } else {
        setTypedText(text.substring(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(type, typingSpeed);
      }

      // Finished typing
      if (!isDeleting && charIndex === text.length) {
        if (loop) {
          isDeleting = true;
          clearTimeout(timeout);
          timeout = setTimeout(type, pauseAfterTyping);
        }
      }

      // Finished deleting
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        clearTimeout(timeout);
        timeout = setTimeout(type, pauseAfterDeleting);
      }
    };

    timeout = setTimeout(type, initialDelay);

    return () => clearTimeout(timeout);
  }, [
    text,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
    initialDelay,
    loop,
  ]);

  return typedText;
};
