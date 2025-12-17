import { useState, useEffect } from "react";

interface TypingEffectOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  initialDelay?: number;
  loop?: boolean;
}

export function useTypingEffect(
  text: string,
  options: TypingEffectOptions = {}
) {
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
    let timeout: NodeJS.Timeout;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const type = () => {
      if (isPaused) return;

      if (isDeleting) {
        setTypedText(text.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          if (loop) {
            isPaused = true;
            timeout = setTimeout(() => {
              isPaused = false;
              type();
            }, pauseAfterDeleting);
            return;
          }
        } else {
          timeout = setTimeout(type, deletingSpeed);
        }
      } else {
        setTypedText(text.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === text.length) {
          if (loop) {
            isPaused = true;
            timeout = setTimeout(() => {
              isPaused = false;
              isDeleting = true;
              type();
            }, pauseAfterTyping);
            return;
          }
        } else {
          timeout = setTimeout(type, typingSpeed);
        }
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
}
