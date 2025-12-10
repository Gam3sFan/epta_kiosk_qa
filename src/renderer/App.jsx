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
  const [answerA, setAnswerA] = useState(null);
  const [answersB, setAnswersB] = useState([]);
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

  const allowMultipleB = answerA === 'no-limit';

  const selectedExperienceObjects = useMemo(
    () =>
      answersB
        .map((id) => experienceOptions.find((option) => option.id === id))
        .filter(Boolean),
    [answersB, experienceOptions],
  );

  const resultKey = useMemo(() => {
    if (!answersB.length) return null;
    if (allowMultipleB && answersB.length > 1) return 'grandTour';

    const last = answersB[answersB.length - 1];
    return experienceOptions.find((option) => option.id === last)?.resultKey || null;
  }, [allowMultipleB, answersB, experienceOptions]);

  const activeResult = resultKey ? strings.results[resultKey] : null;

  const resetFlow = () => {
    setAnswerA(null);
    setAnswersB([]);
    setScreen(SCREENS.HERO);
  };

  const handleStart = () => {
    setAnswerA(null);
    setAnswersB([]);
    setScreen(SCREENS.QUESTION_A);
  };

  const handleSelectAnswerA = (optionId) => {
    setAnswerA(optionId);
    setAnswersB([]);
    setTimeout(() => {
      setScreen(SCREENS.QUESTION_B);
    }, 350);
  };

  const handleSelectExperience = (optionId) => {
    if (!allowMultipleB) {
      setAnswersB([optionId]);
      return;
    }

    setAnswersB((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]));
  };

  const helperQuestionB = allowMultipleB ? strings.helpers.q2Multi : strings.helpers.q2Single;

  const heroVisible = screen === SCREENS.HERO;
  const questionAVisible = screen === SCREENS.QUESTION_A;
  const questionBVisible = screen === SCREENS.QUESTION_B;
  const resultVisible = screen === SCREENS.RESULT;
  const showLogo = !questionAVisible && !questionBVisible;

  const handleBack = () => {
    if (questionBVisible) {
      setScreen(SCREENS.QUESTION_A);
      return;
    }

    if (questionAVisible) {
      setScreen(SCREENS.HERO);
    }
  };

  const backEnabled = questionAVisible || questionBVisible;

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
                total={3}
                questionId="q0"
                stepLabel={strings.stepLabel}
                eyebrow={strings.questions.q0.eyebrow}
                title={strings.questions.q0.title}
                subtitle={strings.questions.q0.subtitle}
                options={timeOptions}
                selectedOptions={answerA ? [answerA] : []}
                onSelect={handleSelectAnswerA}
                helper={strings.helpers.q0}
                language={language}
              />
            )}

            {questionBVisible && (
              <QuestionScreen
                step={2}
                total={3}
                questionId="q1"
                stepLabel={strings.stepLabel}
                eyebrow={strings.questions.q2.eyebrow}
                title={strings.questions.q2.title}
                subtitle={allowMultipleB ? strings.questions.q2.subtitleMulti : strings.questions.q2.subtitleSingle}
                options={experienceOptions}
                selectedOptions={answersB}
                onSelect={handleSelectExperience}
                helper={helperQuestionB}
                language={language}
              />
            )}

            {resultVisible && (
              <ResultScreen
                result={activeResult}
                selectedExperiences={selectedExperienceObjects}
                onRestart={resetFlow}
                copy={strings.result}
                stepLabel={strings.stepLabel}
                ctaLabel={strings.buttons.restart}
              />
            )}
          </div>
          <BottomBar
            language={language}
            onLanguage={setLanguage}
            languageOptions={LANGUAGES}
            onBack={backEnabled ? handleBack : null}
            backAriaLabel={strings.buttons.back}
            centerContent={
              questionBVisible ? (
                <button
                  type="button"
                  className="primary-cta"
                  disabled={!activeResult}
                  onClick={() => setScreen(SCREENS.RESULT)}
                >
                  {strings.buttons.showResult}
                </button>
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
