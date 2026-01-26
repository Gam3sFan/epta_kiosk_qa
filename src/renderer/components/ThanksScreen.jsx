import React, { useEffect, useRef, useState } from 'react';
import StepHeader from './StepHeader';
import eptaLogoAsset from '../../assets/epta_logo.svg';
import thanksVideoEn from '../../assets/avatar/thks/THKS_EN.webm';
import thanksVideoIt from '../../assets/avatar/thks/THKS_IT.webm';
import thanksVideoEs from '../../assets/avatar/thks/THKS_ES.webm';
import thanksVideoFr from '../../assets/avatar/thks/THKS_FR.webm';
import thanksVideoDe from '../../assets/avatar/thks/THKS_DE.webm';

const THANKS_VIDEOS = {
  en: new URL(thanksVideoEn, import.meta.url).href,
  it: new URL(thanksVideoIt, import.meta.url).href,
  es: new URL(thanksVideoEs, import.meta.url).href,
  fr: new URL(thanksVideoFr, import.meta.url).href,
  de: new URL(thanksVideoDe, import.meta.url).href,
};

const eptaLogo = new URL(eptaLogoAsset, import.meta.url).href;

const DEFAULT_THANKS_VIDEO = THANKS_VIDEOS.en;

const getLanguageVideoSrc = (languageCode) => THANKS_VIDEOS[languageCode] || DEFAULT_THANKS_VIDEO;

const FALLBACK_MESSAGES = {
  en: 'Thank you for your time. Enjoy your experience!',
  it: 'Grazie per il tuo tempo. Buona visita!',
  fr: 'Merci pour votre temps. Profitez de votre expérience !',
  de: 'Vielen Dank für Ihre Zeit. Genießen Sie Ihr Erlebnis!',
  es: 'Gracias por su tiempo. ¡Disfrute de su experiencia!',
};

const getThanksMessage = (languageCode) => FALLBACK_MESSAGES[languageCode] || FALLBACK_MESSAGES.en;

const ThanksScreen = ({ language, onComplete, videoSrc, copy }) => {
  const videoRef = useRef(null);
  const languageCode = language?.code || 'en';
  const [activeSrc, setActiveSrc] = useState(
    videoSrc || getLanguageVideoSrc(languageCode) || DEFAULT_THANKS_VIDEO,
  );
  const message = copy?.message || getThanksMessage(languageCode);

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
      <div className="question-step-header thanks-screen__header">
        <StepHeader
          step={1}
          total={1}
          stepLabel="Step"
          title={message}
          showIndicator={false}
        />
      </div>
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
