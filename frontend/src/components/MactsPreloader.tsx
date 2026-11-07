import { useEffect, useState } from "react";
import "./MactsPreloader.css";

interface MactsPreloaderProps {
  isReady?: boolean;
  onComplete?: () => void;
}

export default function MactsPreloader({
  isReady = false,
  onComplete,
}: MactsPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Smooth visual progress, capped until the app is actually ready.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const target = isReady ? 100 : 92;
        if (current >= target) return current;
        const remaining = target - current;
        return Math.min(
          target,
          current + Math.max(0.3, remaining * 0.045)
        );
      });
    }, 35);
    return () => window.clearInterval(interval);
  }, [isReady]);

  // Finish only after the application is ready.
  useEffect(() => {
    if (!isReady) return;
    setProgress(100);
    const timer = window.setTimeout(() => {
      setExiting(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [isReady]);

  // Notify parent after exit animation.
  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(() => {
      onComplete?.();
    }, 850);
    return () => window.clearTimeout(timer);
  }, [exiting, onComplete]);

  return (
    <div
      className={`macts-preloader ${exiting ? "macts-exit" : ""}`}
      role="status"
      aria-label="Loading MACTS website"
      aria-live="polite"
    >
      {/* Background effects */}
      <div className="macts-noise" />
      <div className="macts-ambient ambient-one" />
      <div className="macts-ambient ambient-two" />
      <div className="macts-scanline" />

      {/* Main content */}
      <div className="macts-loader-content">
        {/* Animated camera aperture */}
        <div className="macts-aperture-wrapper">
          <div className="macts-aperture-glow" />
          <div className="macts-aperture-outer">
            <div className="macts-aperture-ring">
              <div className="macts-blades">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="macts-blade"
                    style={{
                      transform: `rotate(${index * 60}deg)`,
                    }}
                  />
                ))}
              </div>
              <div className="macts-aperture-center">
                <span>M</span>
              </div>
            </div>
          </div>
          <div className="macts-orbit orbit-one" />
          <div className="macts-orbit orbit-two" />
        </div>

        {/* Logo and academy name */}
        <div className="macts-brand">
          <div className="macts-logo">
            M<span>A</span>CTS
          </div>
          <div className="macts-brand-line">
            <span />
          </div>
          <div className="macts-academy-name">MOONINRED ACADEMY OF</div>
          <div className="macts-academy-name second-line">
            CINEMA TECHNICAL STUDIES
          </div>
        </div>

        {/* Tagline */}
        <div className="macts-tagline">
          LEARN CINEMA. CREATE TOMORROW.
        </div>

        {/* Loading progress */}
        <div className="macts-progress-section">
          <div className="macts-progress-heading">
            <span>INITIALIZING EXPERIENCE</span>
            <span className="macts-progress-number">
              {Math.floor(progress)}%
            </span>
          </div>
          <div
            className="macts-progress-track"
            role="progressbar"
            aria-valuenow={Math.floor(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="macts-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="macts-progress-shine" />
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="macts-loading-message">
          <span className="macts-loading-dot" />
          {isReady ? "PREPARING YOUR EXPERIENCE" : "LIGHTS. CAMERA. ACTION."}
        </div>
      </div>

      {/* Bottom branding */}
      <div className="macts-bottom-brand">
        <span>EST. MOONINRED</span>
        <span className="macts-bottom-star">✦</span>
        <span>THE ART OF CINEMA</span>
      </div>
    </div>
  );
}
