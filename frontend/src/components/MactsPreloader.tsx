import { useEffect, useState } from "react";
import "./MactsPreloader.css";

interface Props {
  isReady?: boolean;
  onComplete?: () => void;
}

export default function MactsPreloader({
  isReady = false,
  onComplete,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= (isReady ? 100 : 92)) return value;
        return Math.min(
          isReady ? 100 : 92,
          value + Math.max(0.25, (100 - value) * 0.035)
        );
      });
    }, 45);

    return () => window.clearInterval(timer);
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;

    setProgress(100);

    const timer = window.setTimeout(() => setExiting(true), 650);
    return () => window.clearTimeout(timer);
  }, [isReady]);

  useEffect(() => {
    if (!exiting) return;

    const timer = window.setTimeout(() => onComplete?.(), 1100);
    return () => window.clearTimeout(timer);
  }, [exiting, onComplete]);

  return (
    <div className={`luxury-loader ${exiting ? "loader-exit" : ""}`}>

      <div className="cinema-bg" />
      <div className="gold-spotlight" />
      <div className="film-edge film-left" />
      <div className="film-edge film-right" />

      <main className="luxury-content">

        {/* Cinematic lens */}
        <div className="lens-stage">
          <div className="lens-halo" />
          <div className="lens-orbit orbit-a" />
          <div className="lens-orbit orbit-b" />

          <div className="lens-body">
            <div className="lens-metal">
              <div className="lens-reflection" />
              <div className="lens-glass">
                <div className="lens-shutter">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className="shutter-blade"
                      style={{
                        transform: `rotate(${i * 51.43}deg)`,
                      }}
                    />
                  ))}
                </div>
                <div className="lens-center">
                  <span>M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lens-light" />
        </div>

        {/* Brand */}
        <div className="luxury-brand">
          <div className="brand-eyebrow">
            <span />
            MOONINRED PRESENTS
            <span />
          </div>

          <h1>
            M<span>A</span>CTS
          </h1>

          <div className="brand-divider">
            <span />
            <i>✦</i>
            <span />
          </div>

          <p>MOONINRED ACADEMY OF</p>
          <p>CINEMA TECHNICAL STUDIES</p>
        </div>

        <div className="luxury-tagline">
          LEARN CINEMA. <span>CREATE TOMORROW.</span>
        </div>

        {/* Progress */}
        <div className="luxury-progress">
          <div className="progress-labels">
            <span>YOUR CINEMATIC EXPERIENCE</span>
            <span>{Math.floor(progress)}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="progress-caption">
            {isReady ? "READY FOR THE SHOW" : "LIGHTS. CAMERA. ACTION."}
          </div>
        </div>

      </main>

      <footer className="luxury-footer">
        <span>MACTS FILM INSTITUTE</span>
        <span className="footer-symbol">✦</span>
        <span>EST. MOONINRED</span>
      </footer>
    </div>
  );
}
