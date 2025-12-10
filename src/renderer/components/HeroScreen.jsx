import React, { useEffect, useRef } from 'react';
import avatarIdleVideoAsset from '../../assets/avatar/IDLE.webm';

const avatarIdleVideo = new URL(avatarIdleVideoAsset, import.meta.url).href;

const HeroScreen = ({ copy, onStart, ctaLabel }) => {
  const idleVideoRef = useRef(null);

  useEffect(() => {
    const videoEl = idleVideoRef.current;
    if (!videoEl) return undefined;

    const ensurePlay = () => {
      const playPromise = videoEl.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    };

    const resetAndPlay = () => {
      videoEl.currentTime = 0;
      ensurePlay();
    };

    const onCanPlay = () => {
      ensurePlay();
    };

    const onEnded = () => {
      resetAndPlay();
    };

    videoEl.addEventListener('canplay', onCanPlay);
    videoEl.addEventListener('ended', onEnded);

    ensurePlay();

    return () => {
      videoEl.removeEventListener('canplay', onCanPlay);
      videoEl.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section className="hero-screen">
      <div className="hero-avatar-video">
        <video src={avatarIdleVideo} autoPlay loop muted playsInline ref={idleVideoRef} />
      </div>
      <div className="hero-center">
        <button type="button" className="primary-cta" onClick={onStart}>
          {ctaLabel}
        </button>
      </div>
    </section>
  );
};

export default HeroScreen;

//<p className="eyebrow">{copy.eyebrow}</p>
