import React, { useEffect, useRef } from 'react';
import avatarIdleVideoAsset from '../../assets/avatar/IDLE.webm';
import avatarIdleVideoMovAsset from '../../assets/avatar/IDLE.mov';

const avatarIdleVideo = new URL(avatarIdleVideoAsset, import.meta.url).href;
const avatarIdleVideoMov = new URL(avatarIdleVideoMovAsset, import.meta.url).href;

const HeroScreen = ({ copy, onStart, ctaLabel }) => {
  const idleVideoRef = useRef(null);

  useEffect(() => {
    const videoEl = idleVideoRef.current;
    if (!videoEl) return undefined;

    // Make sure browsers treat the video as muted/inline so autoplay is allowed
    videoEl.defaultMuted = true;
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.load();

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

    const onLoadedData = () => {
      ensurePlay();
    };

    const onEnded = () => {
      resetAndPlay();
    };

    videoEl.addEventListener('canplay', onCanPlay);
    videoEl.addEventListener('loadeddata', onLoadedData);
    videoEl.addEventListener('ended', onEnded);

    ensurePlay();

    return () => {
      videoEl.removeEventListener('canplay', onCanPlay);
      videoEl.removeEventListener('loadeddata', onLoadedData);
      videoEl.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section className="hero-screen">
      <div className="hero-avatar-video">
        <video autoPlay loop muted playsInline preload="auto" ref={idleVideoRef}>
          <source src={avatarIdleVideo} type="video/webm" />
          <source src={avatarIdleVideoMov} type="video/quicktime" />
        </video>
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
