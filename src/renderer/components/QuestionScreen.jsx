import React, { useEffect, useRef, useState } from 'react';
import StepHeader from './StepHeader';
import avatarIdleVideoAsset from '../../assets/avatar/EPTA_AVATAR_IDLE.mp4';
import question1VideoAsset from '../../assets/avatar/question1.mp4';
import question2VideoAsset from '../../assets/avatar/question2.mp4';
import replayIconAsset from '../../assets/replay.svg';

import { OPTION_TIMINGS } from '../data/timings';

const avatarIdleVideo = new URL(avatarIdleVideoAsset, import.meta.url).href;
const question1Video = new URL(question1VideoAsset, import.meta.url).href;
const question2Video = new URL(question2VideoAsset, import.meta.url).href;
const replayIcon = new URL(replayIconAsset, import.meta.url).href;


const OptionCard = ({ option, selected, onSelect, compact, isVisible }) => {
  const classes = ['option-card'];
  if (compact) classes.push('option-card--compact');
  if (selected) classes.push('is-selected');
  if (!isVisible) classes.push('option-card--hidden');

  return (
    <button type="button" className={classes.join(' ')} onClick={onSelect}>
      <div className="option-body">
        <p className="option-label">{option.label}</p>
        {option.description && <p className="option-description">{option.description}</p>}
      </div>
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
  layout = 'grid',
  compact = true,
}) => {
  const questionVideo = step === 1 ? question1Video : question2Video;
  const questionVideoRef = useRef(null);
  const [videoKey, setVideoKey] = useState(`question-${step}`);
  const [isQuestionVideoPlaying, setIsQuestionVideoPlaying] = useState(true);
  const [canReplay, setCanReplay] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(options.length);

  useEffect(() => {
    setVideoKey(`question-${step}-${Date.now()}`);
    setCanReplay(false);
    setIsQuestionVideoPlaying(true);
    setVisibleOptions(0);
  }, [step]);

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

  const handleReplay = () => {
    setCanReplay(false);
    setIsQuestionVideoPlaying(true);
    setVideoKey(`question-${step}-replay-${Date.now()}`);
  };

  const handleVideoEnded = () => {
    setIsQuestionVideoPlaying(false);
    setCanReplay(true);
  };

  const handleVideoPlay = () => {
    setIsQuestionVideoPlaying(true);
  };

  const handleVideoPause = () => {
    if (questionVideoRef.current?.ended) return;
    setIsQuestionVideoPlaying(false);
  };

  const stackClasses = ['option-stack'];
  if (compact) stackClasses.push('option-stack--compact');
  stackClasses.push(layout === 'list' ? 'option-stack--list' : 'option-stack--grid');

  return (
    <section className="hero-screen question-screen">
      <div className="question-step-header">
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
          src={questionVideo}
          autoPlay
          playsInline
          muted={false}
          loop={false}
          className={`${isQuestionVideoPlaying ? 'is-active' : ''} question-video`}
          onEnded={handleVideoEnded}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        />
        <video
          src={avatarIdleVideo}
          autoPlay
          loop
          muted
          playsInline
          className={`${!isQuestionVideoPlaying ? 'is-active' : ''} idle-video`}
        />
        {canReplay && (
          <button type="button" className="ghost-button replay-button" onClick={handleReplay}>
            <img src={replayIcon} alt="" aria-hidden="true" className="replay-icon" />
          </button>
        )}
      </div>

      <div className="hero-center question-content">
        <div className={stackClasses.join(' ')}>
          {options.map((option, index) => (
            <OptionCard
              key={option.id}
              option={option}
              selected={selectedOptions.includes(option.id)}
              onSelect={() => onSelect(option.id)}
              compact={compact}
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
