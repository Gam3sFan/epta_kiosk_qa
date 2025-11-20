import React, { useEffect, useRef, useState } from 'react';
import StepHeader from './StepHeader';
import avatarIdleVideoAsset from '../../assets/avatar/EPTA_AVATAR_IDLE.mp4';
import question1VideoAsset from '../../assets/avatar/question1.mp4';
import question2VideoAsset from '../../assets/avatar/question2.mp4';

const avatarIdleVideo = new URL(avatarIdleVideoAsset, import.meta.url).href;
const question1Video = new URL(question1VideoAsset, import.meta.url).href;
const question2Video = new URL(question2VideoAsset, import.meta.url).href;

const OptionCard = ({ option, index, selected, onSelect, compact }) => {
  const classes = ['option-card'];
  if (compact) classes.push('option-card--compact');
  if (selected) classes.push('is-selected');

  return (
    <button type="button" className={classes.join(' ')} onClick={onSelect}>
      <div className="option-body">
        <p className="option-label">{option.label}</p>
        {option.description && <p className="option-description">{option.description}</p>}
      </div>
      <div className="option-check" aria-hidden="true" />
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
}) => {
  const questionVideo = step === 1 ? question1Video : question2Video;
  const questionVideoRef = useRef(null);
  const [videoKey, setVideoKey] = useState(`question-${step}`);
  const [isQuestionVideoPlaying, setIsQuestionVideoPlaying] = useState(true);
  const [canReplay, setCanReplay] = useState(false);

  useEffect(() => {
    setVideoKey(`question-${step}-${Date.now()}`);
    setCanReplay(false);
    setIsQuestionVideoPlaying(true);
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
  }, [videoKey]);

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

  return (
    <section className="hero-screen question-screen">
      <div className="hero-avatar-video">
        <video
          key={videoKey}
          ref={questionVideoRef}
          src={questionVideo}
          autoPlay
          playsInline
          muted={false}
          loop={false}
          className={isQuestionVideoPlaying ? 'is-active' : ''}
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
          className={!isQuestionVideoPlaying ? 'is-active' : ''}
        />
      </div>

      <div className="hero-center question-content">
        <StepHeader
          step={step}
          total={total}
          stepLabel={stepLabel}
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {canReplay && (
          <button type="button" className="ghost-button replay-button" onClick={handleReplay}>
            Replay video
          </button>
        )}

        {helper && (
          <div className="helper-row helper-row--compact">
            <p>{helper}</p>
          </div>
        )}

        <div className="option-stack option-stack--compact">
          {options.map((option, index) => (
            <OptionCard
              key={option.id}
              option={option}
              index={index + 1}
              selected={selectedOptions.includes(option.id)}
              onSelect={() => onSelect(option.id)}
              compact
            />
          ))}
        </div>
        {controls}
      </div>
    </section>
  );
};

export default QuestionScreen;
