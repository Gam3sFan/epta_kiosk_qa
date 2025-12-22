import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HeroScreen from './components/HeroScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { BottomBar } from './components/LanguageControls';
import StatsPanel from './components/StatsPanel';
import BrandStoryScreen from './components/BrandStoryScreen';
import { SCREENS, TIME_OPTIONS_BASE, EXPERIENCE_OPTIONS_BASE, LANGUAGES, TEXTS } from './data/copy';
import eptaTaglineImage from '../assets/logos.png';
import payoffButtonImage from '../assets/epta_payoff_btn.svg';

import './style.css';

const DEFAULT_IDLE_MINUTES = 2;
const RESULT_ID_BY_EXPERIENCE = {
  highlights: '1',
  retail: '2',
  tech: '3',
  convenience: '4',
  specialty: '5',
  fresh: '7',
  prepacked: '8',
};
const RESULT_ID_BY_IMMERSIVE_TIME = {
  essentials: '1',
  balanced: '2',
  deep: '6',
};

const generateSessionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
};

const LogoHeader = ({ onSecret }) => (
  <div className="logo-row">
    <div
      className="logo-tagline"
      aria-label="Good never stops"
      onDoubleClick={onSecret}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onSecret?.();
        }
      }}
    >
      <img src={eptaTaglineImage} alt="Good never stops" className="logo-tagline__image" />
    </div>
  </div>
);

const App = () => {
  const [screen, setScreen] = useState(SCREENS.HERO);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [sessionId, setSessionId] = useState(generateSessionId());
  const [hasLoggedSession, setHasLoggedSession] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const [appVersion, setAppVersion] = useState(null);
  const [idleMinutes, setIdleMinutes] = useState(DEFAULT_IDLE_MINUTES);
  const idleTimerRef = useRef(null);

  const strings = TEXTS[language.code] || TEXTS.en;
  const brandStoryCopy = strings.brandStory || TEXTS.en.brandStory;

  const timeOptions = useMemo(
    () =>
      TIME_OPTIONS_BASE.map((option) => ({
        ...option,
        label: strings.timeOptions?.[option.id]?.label || option.label || option.id,
        description: strings.timeOptions?.[option.id]?.description || option.description,
      })),
    [strings],
  );

  const experienceOptions = useMemo(
    () =>
      EXPERIENCE_OPTIONS_BASE.map((option) => ({
        ...option,
        label: strings.experienceOptions?.[option.id]?.label || option.label || option.id,
        description: strings.experienceOptions?.[option.id]?.description || option.description,
      })),
    [strings],
  );

  const resultId = useMemo(() => {
    if (!selectedExperience) return null;
    if (selectedExperience === 'immersive') {
      if (!selectedTime) return null;
      return RESULT_ID_BY_IMMERSIVE_TIME[selectedTime] || RESULT_ID_BY_IMMERSIVE_TIME.deep;
    }
    return RESULT_ID_BY_EXPERIENCE[selectedExperience] || null;
  }, [selectedExperience, selectedTime]);

  const activeResult = resultId ? strings.results?.[resultId] : null;

  const resetFlow = () => {
    setSelectedExperience(null);
    setSelectedTime(null);
    setHasLoggedSession(false);
    setSessionId(generateSessionId());
    setScreen(SCREENS.HERO);
  };

  const handleStart = () => {
    setSelectedExperience(null);
    setSelectedTime(null);
    setHasLoggedSession(false);
    setSessionId(generateSessionId());
    setScreen(SCREENS.QUESTION_A);
  };

  const handleSelectExperience = (optionId) => {
    setSelectedExperience(optionId);
    setSelectedTime(null);
    setHasLoggedSession(false);
    setTimeout(() => {
      setScreen(SCREENS.QUESTION_B);
    }, 350);
  };

  const handleSelectTime = (optionId) => {
    setSelectedTime(optionId);
    setHasLoggedSession(false);
    setTimeout(() => {
      setScreen(SCREENS.RESULT);
    }, 350);
  };

  const handleIdleMinutesChange = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed) || parsed <= 0) return;
    const clamped = Math.min(Math.max(parsed, 0.5), 240);
    setIdleMinutes(clamped);
    resetIdleTimer(clamped);
  };

  const helperExperience = strings.helpers.q0;
  const helperTime = strings.helpers.q2Single;

  const heroVisible = screen === SCREENS.HERO;
  const brandStoryVisible = screen === SCREENS.BRAND_STORY;
  const questionAVisible = screen === SCREENS.QUESTION_A;
  const questionBVisible = screen === SCREENS.QUESTION_B;
  const resultVisible = screen === SCREENS.RESULT;
  const showLogo = !questionAVisible && !questionBVisible && !brandStoryVisible;

  const refreshApp = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const stored = Number(localStorage.getItem('idleMinutes'));
    if (!Number.isNaN(stored) && stored > 0) {
      setIdleMinutes(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    if (idleMinutes && idleMinutes > 0) {
      localStorage.setItem('idleMinutes', String(idleMinutes));
    }
  }, [idleMinutes]);

  useEffect(() => {
    const preventKeyZoom = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      const blockedKeys = ['=', '+', '-', '_', '0'];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    const preventWheelZoom = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    const preventGestureZoom = (event) => {
      if (event.touches?.length > 1) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', preventKeyZoom);
    window.addEventListener('wheel', preventWheelZoom, { passive: false });
    window.addEventListener('touchmove', preventGestureZoom, { passive: false });
    window.addEventListener('gesturestart', preventGestureZoom);
    window.addEventListener('gesturechange', preventGestureZoom);
    window.addEventListener('gestureend', preventGestureZoom);

    return () => {
      window.removeEventListener('keydown', preventKeyZoom);
      window.removeEventListener('wheel', preventWheelZoom);
      window.removeEventListener('touchmove', preventGestureZoom);
      window.removeEventListener('gesturestart', preventGestureZoom);
      window.removeEventListener('gesturechange', preventGestureZoom);
      window.removeEventListener('gestureend', preventGestureZoom);
    };
  }, []);

  useEffect(() => {
    const preventDrag = (event) => {
      event.preventDefault();
    };

    const preventDrop = (event) => {
      event.preventDefault();
    };

    window.addEventListener('dragstart', preventDrag);
    window.addEventListener('drop', preventDrop);
    window.addEventListener('dragover', preventDrop);

    return () => {
      window.removeEventListener('dragstart', preventDrag);
      window.removeEventListener('drop', preventDrop);
      window.removeEventListener('dragover', preventDrop);
    };
  }, []);

  const resetIdleTimer = useCallback(
    (customMinutes) => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      const minutes = typeof customMinutes === 'number' ? customMinutes : idleMinutes;
      if (!minutes || minutes <= 0) return;
      idleTimerRef.current = setTimeout(() => {
        refreshApp();
      }, minutes * 60 * 1000);
    },
    [idleMinutes, refreshApp],
  );

  useEffect(() => {
    const handler = () => resetIdleTimer();
    const events = ['click', 'keydown', 'mousemove', 'touchstart'];
    resetIdleTimer();
    events.forEach((eventName) => window.addEventListener(eventName, handler));
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((eventName) => window.removeEventListener(eventName, handler));
    };
  }, [resetIdleTimer]);

  const handleBack = () => {
    if (brandStoryVisible) {
      setScreen(SCREENS.HERO);
      return;
    }

    if (resultVisible) {
      refreshApp();
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

  const backEnabled = brandStoryVisible || questionAVisible || questionBVisible || resultVisible;

  useEffect(() => {
    resetIdleTimer();
  }, [resetIdleTimer, screen]);

  useEffect(() => {
    if (window?.kioskBridge?.getVersion) {
      window.kioskBridge.getVersion().then((ver) => setAppVersion(ver)).catch(() => {});
    }
  }, []);

  const recordSession = useCallback(async () => {
    if (!window?.kioskBridge?.analytics?.recordSession) return;
    if (!selectedExperience || hasLoggedSession) return;
    const payload = {
      sessionId,
      timestamp: new Date().toISOString(),
      language: language.code,
      experience: selectedExperience,
      time: selectedTime || 'n/a',
      resultKey: resultId || 'n/a',
      appVersion,
    };
    try {
      await window.kioskBridge.analytics.recordSession(payload);
      setHasLoggedSession(true);
    } catch (error) {
      console.warn('[analytics] Unable to record session', error);
    }
  }, [appVersion, hasLoggedSession, language.code, resultId, selectedExperience, selectedTime, sessionId]);

  useEffect(() => {
    if (screen === SCREENS.RESULT) {
      recordSession();
    }
  }, [recordSession, screen]);

  const refreshStats = useCallback(async () => {
    if (!window?.kioskBridge?.analytics?.getStats) return;
    try {
      const response = await window.kioskBridge.analytics.getStats();
      if (response?.ok) {
        setStats(response);
        setStatsError(null);
      } else {
        setStatsError(response?.error || 'unknown-error');
      }
    } catch (error) {
      setStatsError(error?.message || 'failed-to-read-stats');
    }
  }, []);

  const handleResetStats = useCallback(async () => {
    if (!window?.kioskBridge?.analytics?.reset) return;
    try {
      await window.kioskBridge.analytics.reset();
      await refreshStats();
    } catch (error) {
      setStatsError(error?.message || 'failed-to-reset-stats');
    }
  }, [refreshStats]);

  useEffect(() => {
    if (statsVisible) {
      refreshStats();
    }
  }, [refreshStats, statsVisible]);

  useEffect(() => {
    const handleSecretShortcut = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        setStatsVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleSecretShortcut);
    return () => window.removeEventListener('keydown', handleSecretShortcut);
  }, []);

  return (
    <div className={`kiosk-shell ${brandStoryVisible ? 'kiosk-shell--brand' : ''}`}>
      <div className="device">
        <div className="panel">
          {showLogo && <LogoHeader onSecret={() => setStatsVisible(true)} />}
          <div className={`panel-content screen-${screen}`}>
            {heroVisible && <HeroScreen copy={strings.hero} onStart={handleStart} ctaLabel={strings.buttons.start} />}

            {brandStoryVisible && (
              <BrandStoryScreen title={brandStoryCopy?.title} description={brandStoryCopy?.description} />
            )}

            {questionAVisible && (
              <QuestionScreen
                step={1}
                total={2}
                questionId="q0"
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
                questionId="q1"
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
                resultId={resultId}
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
            backLabel={strings.buttons.back}
            centerContent={
              heroVisible ? (
                <button
                  type="button"
                  className="bottom-bar__brand"
                  onClick={() => setScreen(SCREENS.BRAND_STORY)}
                >
                          <img
                    src={payoffButtonImage}
                    alt={brandStoryCopy?.ctaLabel || 'Brand story'}
                    className="bottom-bar__brand-image"
                  />
                </button>
              ) : null
            }
          />
          {statsVisible && (
            <StatsPanel
              stats={stats}
              idleMinutes={idleMinutes}
              onIdleChange={handleIdleMinutesChange}
              errorMessage={statsError}
              onClose={() => setStatsVisible(false)}
              onRefresh={refreshStats}
              onReset={handleResetStats}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
