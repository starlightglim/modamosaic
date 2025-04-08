"use client"; // Keep this if necessary for Remix, though often not needed for components
import React, { useEffect, useRef, useState } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isInitialAnimationRunning, setIsInitialAnimationRunning] = useState(true);
  const animationRef = useRef<number | null>(null);

  const runAnimation = (isInitial: boolean = false) => {
    const animate = () => {
      setDisplayText(prevText =>
        prevText
          .split('')
          .map((_, index) => {
            // Keep animating if initial or hovering
            if (isInitial || isHovering) {
              return characters[Math.floor(Math.random() * characters.length)];
            }
            // Otherwise, revert to the original character
            return text[index];
          })
          .join('')
      );

      // Continue animation loop if initial or hovering
      if (isInitial || isHovering) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure the final text is set correctly when not hovering and initial animation is done
        setDisplayText(text);
      }
    };

    // Cancel any existing animation frame before starting a new one
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  // Effect for the initial animation
  useEffect(() => {
    if (isInitialAnimationRunning) {
      runAnimation(true);
      const timer = setTimeout(() => {
        setIsInitialAnimationRunning(false);
        // Stop the animation and set the final text
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setDisplayText(text); // Ensure final text is set after initial animation
      }, 1500); // animation duration

      // Cleanup function for the initial animation effect
      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
    // Dependency array includes only isInitialAnimationRunning as it controls this effect
  }, [isInitialAnimationRunning, text]); // Added text dependency to reset animation if text changes during initial load

  // Effect for handling hover state changes
  useEffect(() => {
    // Don't run hover animation if initial animation is still running
    if (isInitialAnimationRunning) return;

    if (isHovering) {
      runAnimation(); // Run hover animation
    } else {
      // If not hovering, stop animation and revert to original text
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setDisplayText(text);
    }

    // Cleanup function for the hover effect
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // Dependency array includes states controlling the hover animation
  }, [isHovering, isInitialAnimationRunning, text]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
};

// Use named export consistent with Remix practices
export { AnimatedText }; 