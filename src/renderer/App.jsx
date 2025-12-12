import React, { useMemo, useState } from 'react';
import HeroScreen from './components/HeroScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { BottomBar } from './components/LanguageControls';
import { SCREENS, TIME_OPTIONS_BASE, EXPERIENCE_OPTIONS_BASE, LANGUAGES, TEXTS } from './data/copy';
import eptaTaglineImage from '../assets/logos.png';
import './style.css';

const LogoHeader = () => (
  <div className="logo-row">
    <div className="logo-tagline" aria-label="Good never stops">
      <img src={eptaTaglineImage} alt="Good never stops" className="logo-tagline__image" />
    </div>
  </div>
);

const App = () => {
  const [screen, setScreen] = useState(SCREENS.HERO);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const strings = TEXTS[language.code] || TEXTS.en;

  const timeOptions = useMemo(
    () =>
      TIME_OPTIONS_BASE.map((option) => ({
        ...option,
        label: strings.timeOptions[option.id].label,
        description: strings.timeOptions[option.id].description,
      })),
    [strings],
  );

  const experienceOptions = useMemo(
    () =>
      EXPERIENCE_OPTIONS_BASE.map((option) => ({
        ...option,
        label: strings.experienceOptions[option.id].label,
        description: strings.experienceOptions[option.id].description,
      })),
    [strings],
  );

  const experienceIsAuto = selectedExperience === 'highlights' || selectedExperience === 'immersive';

  const resultKey = useMemo(() => {
    if (!selectedExperience) return null;
    return experienceOptions.find((option) => option.id === selectedExperience)?.resultKey || null;
  }, [experienceOptions, selectedExperience]);

  const activeResult = resultKey ? strings.results[resultKey] : null;

  const resetFlow = () => {
    setSelectedExperience(null);
    setSelectedTime(null);
    setScreen(SCREENS.HERO);
  };

  const handleStart = () => {
    setSelectedExperience(null);
    setSelectedTime(null);
    setScreen(SCREENS.QUESTION_A);
  };

  const handleSelectExperience = (optionId) => {
    setSelectedExperience(optionId);
    setSelectedTime(null);
    const requiresTime = !(optionId === 'highlights' || optionId === 'immersive');
    setTimeout(() => {
      setScreen(requiresTime ? SCREENS.QUESTION_B : SCREENS.RESULT);
    }, 350);
  };

  const handleSelectTime = (optionId) => {
    setSelectedTime(optionId);
    setTimeout(() => {
      setScreen(SCREENS.RESULT);
    }, 350);
  };

  const helperExperience = strings.helpers.q0;
  const helperTime = strings.helpers.q2Single;

  const heroVisible = screen === SCREENS.HERO;
  const questionAVisible = screen === SCREENS.QUESTION_A;
  const questionBVisible = screen === SCREENS.QUESTION_B;
  const resultVisible = screen === SCREENS.RESULT;
  const showLogo = !questionAVisible && !questionBVisible;
  const requiresTimeQuestion = Boolean(selectedExperience && !experienceIsAuto);

  const handleBack = () => {
    if (resultVisible) {
      setScreen(requiresTimeQuestion ? SCREENS.QUESTION_B : SCREENS.QUESTION_A);
      return;
    }

    if (questionBVisible) {
      setScreen(SCREENS.QUESTION_A);
      return;
    }

    if (questionAVisible) {
      setScreen(SCREENS.HERO);
    }
  };

  const backEnabled = questionAVisible || questionBVisible || resultVisible;

  return (
    <div className="kiosk-shell">
      <div className="device">
        <div className="panel">
          {showLogo && <LogoHeader />}
          <div className={`panel-content screen-${screen}`}>
            {heroVisible && <HeroScreen copy={strings.hero} onStart={handleStart} ctaLabel={strings.buttons.start} />}

            {questionAVisible && (
              <QuestionScreen
                step={1}
                total={experienceIsAuto ? 1 : 2}
                questionId="q1"
                stepLabel={strings.stepLabel}
                eyebrow={strings.questions.q0.eyebrow}
                title={strings.questions.q0.title}
                subtitle={strings.questions.q0.subtitle}
                options={experienceOptions}
                selectedOptions={selectedExperience ? [selectedExperience] : []}
                onSelect={handleSelectExperience}
                helper={helperExperience}
                language={language}
              />
            )}

            {questionBVisible && (
              <QuestionScreen
                step={2}
                total={2}
                questionId="q0"
                stepLabel={strings.stepLabel}
                eyebrow={strings.questions.q2.eyebrow}
                title={strings.questions.q2.title}
                subtitle={strings.questions.q2.subtitleSingle}
                options={timeOptions}
                selectedOptions={selectedTime ? [selectedTime] : []}
                onSelect={handleSelectTime}
                helper={helperTime}
                language={language}
              />
            )}

            {resultVisible && (
              <ResultScreen
                result={activeResult}
                copy={strings.result}
                stepLabel={strings.stepLabel}
              />
            )}
          </div>
          <BottomBar
            language={language}
            onLanguage={setLanguage}
            languageOptions={LANGUAGES}
            onBack={backEnabled ? handleBack : null}
            backAriaLabel={strings.buttons.back}
            centerContent={null}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
