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
const UI_SCALE_MIN = 0.8;
const UI_SCALE_MAX = 1.6;
const UI_SCALE_STEP = 0.05;
const DEFAULT_UPDATE_INFO = {
  status: 'idle',
  currentVersion: '',
  availableVersion: '',
  progress: null,
  message: '',
  countdownSeconds: null,
};
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

const clampUiScale = (value) => {
  if (!Number.isFinite(value)) return 1;
  return Math.min(Math.max(value, UI_SCALE_MIN), UI_SCALE_MAX);
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
  const [updateInfo, setUpdateInfo] = useState(DEFAULT_UPDATE_INFO);
  const [uiScale, setUiScale] = useState(1);
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

  const updateStatusLabel = useMemo(() => {
    switch (updateInfo.status) {
      case 'disabled':
        return 'Auto update disabled';
      case 'unsupported':
        return 'Auto update only supported on Windows';
      case 'checking':
        return 'Checking for updates';
      case 'available':
        return 'Update available';
      case 'not-available':
        return 'No updates available';
      case 'downloading':
        return `Downloading ${updateInfo.progress ?? 0}%`;
      case 'install-countdown':
        return `Installing in ${updateInfo.countdownSeconds ?? 0}s`;
      case 'installing':
        return 'Installing update';
      case 'install-cancelled':
        return 'Install postponed';
      case 'error':
        return updateInfo.message ? `Error: ${updateInfo.message}` : 'Update error';
      case 'idle':
      default:
        return 'Idle';
    }
  }, [updateInfo.countdownSeconds, updateInfo.message, updateInfo.progress, updateInfo.status]);

  const updateActionDisabled = useMemo(
    () =>
      ['checking', 'downloading', 'install-countdown', 'installing'].includes(updateInfo.status),
    [updateInfo.status],
  );

  const handleCheckForUpdates = useCallback(() => {
    if (window?.eptaUpdater?.checkForUpdates) {
      window.eptaUpdater.checkForUpdates();
    }
  }, []);

  const handleCancelUpdateInstall = useCallback(() => {
    if (window?.eptaUpdater?.cancelInstall) {
      window.eptaUpdater.cancelInstall();
    }
  }, []);

  const refreshApp = useCallback(() => {
    window.location.reload();
  }, []);

  const applyUiScale = useCallback((scale, { persist = true } = {}) => {
    const parsed = Number(scale);
    if (Number.isNaN(parsed)) return;
    const clamped = clampUiScale(parsed);
    setUiScale(clamped);
    if (window?.eptaUi?.setScale) {
      window.eptaUi.setScale(clamped).catch(() => {});
    }
    if (persist && typeof localStorage !== 'undefined') {
      localStorage.setItem('uiScale', String(clamped));
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const stored = Number(localStorage.getItem('idleMinutes'));
    if (!Number.isNaN(stored) && stored > 0) {
      setIdleMinutes(stored);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (typeof localStorage !== 'undefined') {
      const stored = Number(localStorage.getItem('uiScale'));
      if (!Number.isNaN(stored)) {
        applyUiScale(stored);
        return () => {
          cancelled = true;
        };
      }
    }

    if (window?.eptaUi?.getScale) {
      window.eptaUi
        .getScale()
        .then((scale) => {
          if (cancelled) return;
          if (typeof scale === 'number') {
            applyUiScale(scale);
          }
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [applyUiScale]);

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

  useEffect(() => {
    const updater = window?.eptaUpdater;
    if (!updater) {
      setUpdateInfo((prev) => ({ ...prev, status: 'unsupported' }));
      return undefined;
    }
    const unsubscribe = updater.onStatus((payload) => {
      if (!payload || typeof payload !== 'object') return;
      setUpdateInfo((prev) => ({
        ...prev,
        ...payload,
        status: payload.status || payload.state || prev.status,
      }));
    });
    updater
      .getCurrentVersion?.()
      .then((version) => {
        if (version) {
          setUpdateInfo((prev) => ({ ...prev, currentVersion: version }));
        }
      })
      .catch(() => {});
    return () => {
      unsubscribe?.();
    };
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

  const handleUiScaleReset = useCallback(() => {
    applyUiScale(1);
  }, [applyUiScale]);

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
          {updateInfo.status === 'install-countdown' && (
            <div className="update-modal" role="dialog" aria-modal="true" aria-label="Update scheduled">
              <div className="update-modal__content">
                <div className="update-modal__title">Update available</div>
                <div className="update-modal__text">
                  Installing in {updateInfo.countdownSeconds ?? 0} seconds. The app will restart.
                </div>
                <div className="update-modal__actions">
                  <button type="button" className="update-modal__button" onClick={handleCancelUpdateInstall}>
                    Postpone
                  </button>
                </div>
              </div>
            </div>
          )}
          {statsVisible && (
            <StatsPanel
              stats={stats}
              idleMinutes={idleMinutes}
              onIdleChange={handleIdleMinutesChange}
              uiScale={uiScale}
              uiScaleMin={UI_SCALE_MIN}
              uiScaleMax={UI_SCALE_MAX}
              uiScaleStep={UI_SCALE_STEP}
              onUiScaleChange={applyUiScale}
              onUiScaleReset={handleUiScaleReset}
              errorMessage={statsError}
              updateInfo={updateInfo}
              updateStatusLabel={updateStatusLabel}
              updateActionDisabled={updateActionDisabled}
              onCheckUpdates={handleCheckForUpdates}
              onCancelUpdateInstall={handleCancelUpdateInstall}
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
