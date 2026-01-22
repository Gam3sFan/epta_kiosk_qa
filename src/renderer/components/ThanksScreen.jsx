import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_THANKS_VIDEO = '/assets/avatar/thanks/THANKS.webm';

const getLanguageVideoSrc = (languageCode) => {
  if (!languageCode) return null;
  return `/assets/avatar/thanks/THANKS_${languageCode.toUpperCase()}.webm`;
};

const ThanksScreen = ({ language, onComplete, videoSrc }) => {
  const videoRef = useRef(null);
  const languageCode = language?.code || 'en';
  const [activeSrc, setActiveSrc] = useState(
    videoSrc || getLanguageVideoSrc(languageCode) || DEFAULT_THANKS_VIDEO,
  );

  useEffect(() => {
    const resolvedSrc = videoSrc || getLanguageVideoSrc(languageCode) || DEFAULT_THANKS_VIDEO;
    setActiveSrc(resolvedSrc);
  }, [languageCode, videoSrc]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.currentTime = 0;
    const playPromise = videoEl.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [activeSrc]);

  const handleVideoError = () => {
    if (activeSrc !== DEFAULT_THANKS_VIDEO) {
      setActiveSrc(DEFAULT_THANKS_VIDEO);
      return;
    }
    onComplete?.();
  };

  return (
    <section className="hero-screen thanks-screen">
      <div className="hero-avatar-video thanks-screen__video">
        <video
          ref={videoRef}
          src={activeSrc}
          autoPlay
          playsInline
          muted={false}
          preload="auto"
          onEnded={() => onComplete?.()}
          onError={handleVideoError}
          onAbort={handleVideoError}
          onEmptied={handleVideoError}
          aria-label="Thank you video"
        />
      </div>
    </section>
  );
};

export default ThanksScreen;
