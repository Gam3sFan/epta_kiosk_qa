import React, { useEffect, useRef, useState } from 'react';
import StepHeader from './StepHeader';
import avatarIdleVideoAsset from '../../assets/avatar/IDLE.webm';
import eptaLogoAsset from '../../assets/epta_logo.svg';
import question0VideoAssetEn from '../../assets/avatar/q0/Q0_EN.webm';
import question0VideoAssetIt from '../../assets/avatar/q0/Q0_IT.webm';
import question0VideoAssetFr from '../../assets/avatar/q0/Q0_FR.webm';
import question0VideoAssetDe from '../../assets/avatar/q0/Q0_DE.webm';
import question0SubsAssetEn from '../../assets/avatar/q0/Q0_EN.srt';
import question0SubsAssetIt from '../../assets/avatar/q0/Q0_IT.srt';
import question0SubsAssetFr from '../../assets/avatar/q0/Q0_FR.srt';
import question0SubsAssetDe from '../../assets/avatar/q0/Q0_DE.srt';
import question1VideoAssetEn from '../../assets/avatar/q1/Q1_EN.webm';
import question1VideoAssetIt from '../../assets/avatar/q1/Q1_IT.webm';
import question1VideoAssetEs from '../../assets/avatar/q1/Q1_ES.webm';
import question1VideoAssetFr from '../../assets/avatar/q1/Q1_FR.webm';
import question1VideoAssetDe from '../../assets/avatar/q1/Q1_DE.webm';
import question1SubsAssetEn from '../../assets/avatar/q1/Q1_EN.srt';
import question1SubsAssetIt from '../../assets/avatar/q1/Q1_IT.srt';
import question1SubsAssetEs from '../../assets/avatar/q1/Q1_ES.srt';
import question1SubsAssetFr from '../../assets/avatar/q1/Q1_FR.srt';
import question1SubsAssetDe from '../../assets/avatar/q1/Q1_DE.srt';
import question2VideoAsset from '../../assets/avatar/question2.mp4';
import replayIconAsset from '../../assets/replay.svg';

import { OPTION_TIMINGS } from '../data/timings';

const avatarIdleVideo = new URL(avatarIdleVideoAsset, import.meta.url).href;
const eptaLogo = new URL(eptaLogoAsset, import.meta.url).href;
const question0Videos = {
  en: {
    video: new URL(question0VideoAssetEn, import.meta.url).href,
    subtitles: new URL(question0SubsAssetEn, import.meta.url).href,
  },
  it: {
    video: new URL(question0VideoAssetIt, import.meta.url).href,
    subtitles: new URL(question0SubsAssetIt, import.meta.url).href,
  },
  fr: {
    video: new URL(question0VideoAssetFr, import.meta.url).href,
    subtitles: new URL(question0SubsAssetFr, import.meta.url).href,
  },
  de: {
    video: new URL(question0VideoAssetDe, import.meta.url).href,
    subtitles: new URL(question0SubsAssetDe, import.meta.url).href,
  },
};
const question1Videos = {
  en: {
    video: new URL(question1VideoAssetEn, import.meta.url).href,
    subtitles: new URL(question1SubsAssetEn, import.meta.url).href,
  },
  it: {
    video: new URL(question1VideoAssetIt, import.meta.url).href,
    subtitles: new URL(question1SubsAssetIt, import.meta.url).href,
  },
  es: {
    video: new URL(question1VideoAssetEs, import.meta.url).href,
    subtitles: new URL(question1SubsAssetEs, import.meta.url).href,
  },
  fr: {
    video: new URL(question1VideoAssetFr, import.meta.url).href,
    subtitles: new URL(question1SubsAssetFr, import.meta.url).href,
  },
  de: {
    video: new URL(question1VideoAssetDe, import.meta.url).href,
    subtitles: new URL(question1SubsAssetDe, import.meta.url).href,
  },
};
const question2Video = new URL(question2VideoAsset, import.meta.url).href;
const replayIcon = new URL(replayIconAsset, import.meta.url).href;


const OptionCard = ({ option, selected, onSelect, isVisible }) => {
  const classes = ['option-card'];
  if (selected) classes.push('is-selected');
  if (!isVisible) classes.push('option-card--hidden');

  return (
    <button type="button" className={classes.join(' ')} onClick={onSelect}>
      {option.label}
    </button>
  );
};

const QuestionScreen = ({
  step,
  total,
  stepLabel,
  eyebrow,
  title,
  subtitle,
  options,
  selectedOptions,
  onSelect,
  helper,
  controls,
  language,
  questionId,
}) => {
  const languageCode = language?.code || 'en';
  const getQuestionVideo = () => {
    if (questionId === 'q0') {
      return question0Videos[languageCode] || question0Videos.en;
    }
    if (questionId === 'q1') {
      return question1Videos[languageCode] || question1Videos.en;
    }
    return { video: question2Video };
  };
  const questionVideo = getQuestionVideo();
  const questionVideoRef = useRef(null);
  const idleVideoRef = useRef(null);
  const [videoKey, setVideoKey] = useState(`question-${questionId || step}`);
  const [isQuestionVideoPlaying, setIsQuestionVideoPlaying] = useState(true);
  const [canReplay, setCanReplay] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(options.length);

  useEffect(() => {
    setVideoKey(`question-${questionId || step}-${languageCode}-${Date.now()}`);
    setCanReplay(false);
    setIsQuestionVideoPlaying(true);
    setVisibleOptions(0);
  }, [languageCode, questionId, step]);

  useEffect(() => {
    const videoEl = questionVideoRef.current;
    if (!videoEl) return;

    videoEl.currentTime = 0;
    const playPromise = videoEl.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        setIsQuestionVideoPlaying(false);
        setCanReplay(true);
      });
    }
    if (playPromise?.then) {
      playPromise.then(() => setIsQuestionVideoPlaying(true));
    }
  }, [videoKey]);

  useEffect(() => {
    const timings = OPTION_TIMINGS[step];
    if (!timings || !timings.length) {
      setVisibleOptions(options.length);
      return undefined;
    }

    setVisibleOptions(0);
    const timers = [];

    timings.forEach((time, idx) => {
      timers.push(
        setTimeout(() => {
          setVisibleOptions(idx + 1);
        }, Math.max(time * 1000, 0)),
      );
    });

    if (options.length > timings.length) {
      const lastTime = timings[timings.length - 1] + 0.8;
      timers.push(
        setTimeout(() => {
          setVisibleOptions(options.length);
        }, Math.max(lastTime * 1000, 0)),
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [options.length, step, videoKey]);

  useEffect(() => {
    const idleEl = idleVideoRef.current;
    if (!idleEl) return;
    const playPromise = idleEl.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, []);

  useEffect(() => {
    if (!isQuestionVideoPlaying) {
      const playPromise = idleVideoRef.current?.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    }
  }, [isQuestionVideoPlaying]);

  const handleReplay = () => {
    setCanReplay(false);
    setIsQuestionVideoPlaying(true);
    setVideoKey(`question-${questionId || step}-replay-${Date.now()}`);
  };

  const switchToIdle = () => {
    setIsQuestionVideoPlaying(false);
    setCanReplay(true);
    if (questionVideoRef.current) {
      questionVideoRef.current.pause();
    }
    if (idleVideoRef.current) {
      idleVideoRef.current.currentTime = 0;
      idleVideoRef.current.load();
      const playPromise = idleVideoRef.current.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    }
  };

  const handleVideoEnded = switchToIdle;
  const handleVideoAbort = switchToIdle;
  const handleVideoError = switchToIdle;
  const handleVideoEmptied = switchToIdle;

  const handleVideoPlay = () => {
    setIsQuestionVideoPlaying(true);
  };

  const handleVideoPause = () => {
    if (questionVideoRef.current?.ended) return;
    setIsQuestionVideoPlaying(false);
  };

  return (
    <section className="hero-screen question-screen">
      <div className="question-step-header">
        <img src={eptaLogo} alt="Epta" className="question-logo" />
        <StepHeader
          step={step}
          total={total}
          stepLabel={stepLabel}
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
      </div>

      <div className="hero-avatar-video">
        <video
          key={videoKey}
          ref={questionVideoRef}
          src={questionVideo.video}
          autoPlay
          playsInline
          muted={false}
          loop={false}
          className={`${isQuestionVideoPlaying ? 'is-active' : ''} question-video`}
          onEnded={handleVideoEnded}
          onAbort={handleVideoAbort}
          onEmptied={handleVideoEmptied}
          onError={handleVideoError}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        >
          {questionVideo.subtitles && (
            <track
              key={`${languageCode}-subs`}
              label={language?.label || languageCode}
              kind="subtitles"
              srcLang={languageCode}
              src={questionVideo.subtitles}
              default
            />
          )}
        </video>
        <video
          src={avatarIdleVideo}
          autoPlay
          muted
          playsInline
          loop
          onCanPlay={() => {
            if (!isQuestionVideoPlaying) {
              const playPromise = idleVideoRef.current?.play();
              if (playPromise?.catch) playPromise.catch(() => {});
            }
          }}
          onEnded={() => {
            idleVideoRef.current?.load();
            const playPromise = idleVideoRef.current?.play();
            if (playPromise?.catch) playPromise.catch(() => {});
          }}
          className={`${!isQuestionVideoPlaying ? 'is-active' : ''} idle-video`}
          ref={idleVideoRef}
        />
        {canReplay && (
          <button type="button" className="ghost-button replay-button" onClick={handleReplay}>
            <img src={replayIcon} alt="" aria-hidden="true" className="replay-icon" />
          </button>
        )}
      </div>

      <div className="hero-center question-content">
        <div className="option-stack">
          {options.map((option, index) => (
            <OptionCard
              key={option.id}
              option={option}
              selected={selectedOptions.includes(option.id)}
              onSelect={() => onSelect(option.id)}
              isVisible={index < visibleOptions}
            />
          ))}
        </div>
        {controls}
      </div>
    </section>
  );
};

export default QuestionScreen;
