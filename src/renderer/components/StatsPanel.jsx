import React, { useEffect, useState } from 'react';

const StatList = ({ title, data }) => {
  const entries = Object.entries(data || {});
  if (!entries.length) {
    return null;
  }
  return (
    <div className="stat-block">
      <p className="stat-title">{title}</p>
      <div className="stat-grid">
        {entries.map(([key, value]) => (
          <div key={key} className="stat-chip">
            <span className="stat-chip__label">{key}</span>
            <span className="stat-chip__value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsPanel = ({ stats, onClose, onRefresh, onReset, idleMinutes, onIdleChange, errorMessage }) => {
  const [localIdle, setLocalIdle] = useState(idleMinutes || 2);

  useEffect(() => {
    setLocalIdle(idleMinutes || 2);
  }, [idleMinutes]);

  const handleSaveIdle = () => {
    if (!onIdleChange) return;
    const parsed = Number(localIdle);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(Math.max(parsed, 0.5), 240);
    onIdleChange(clamped);
    setLocalIdle(clamped);
  };

  return (
    <div className="stats-overlay" role="dialog" aria-modal="true">
      <div className="stats-card">
        <header className="stats-card__header">
          <div className="stats-actions">
            <button type="button" className="ghost-button" onClick={onRefresh}>
              Refresh
            </button>
            <button type="button" className="ghost-button warn" onClick={onReset}>
              Reset log
            </button>
            <button type="button" className="ghost-button" onClick={onClose}>
              Close
            </button>
          </div>
        </header>

        {errorMessage ? <p className="stats-error">⚠️ {errorMessage}</p> : null}

        <section className="stats-summary">
          <div className="stat-card">
            <p className="stat-card__label">Total sessions</p>
            <p className="stat-card__value">{stats?.totalSessions ?? 0}</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Most selected experience</p>
            <p className="stat-card__value">
              {Object.entries(stats?.byExperience || {})
                .sort((a, b) => b[1] - a[1])
                .map(([key]) => key)[0] || 'n/a'}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Most selected time</p>
            <p className="stat-card__value">
              {Object.entries(stats?.byTime || {})
                .sort((a, b) => b[1] - a[1])
                .map(([key]) => key)[0] || 'n/a'}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Log file</p>
            <p className="stat-card__value stat-card__value--small">{stats?.file || 'not created yet'}</p>
          </div>
        </section>

        <div className="stat-block">
          <p className="stat-title">Settings</p>
          <div className="stat-settings-row">
            <label className="stat-field">
              <span>Inactivity reset (minutes)</span>
              <input
                type="number"
                min="0.5"
                max="240"
                step="0.5"
                value={localIdle}
                onChange={(e) => setLocalIdle(e.target.value)}
              />
            </label>
            <button type="button" className="ghost-button" onClick={handleSaveIdle}>
              Save
            </button>
          </div>
          <p className="stat-help">After this time without interaction the kiosk reloads to the start.</p>
        </div>

        <div className="stats-columns">
          <div className="stats-column">
            <StatList title="By experience" data={stats?.byExperience} />
            <StatList title="By time" data={stats?.byTime} />
          </div>
          <div className="stats-column">
            <StatList title="By language" data={stats?.byLanguage} />
            <StatList title="By result" data={stats?.byResult} />
          </div>
        </div>

        {stats?.lastSessions?.length ? (
          <div className="stat-block">
            <p className="stat-title">Last sessions</p>
            <div className="stats-table">
              <div className="stats-table__head">
                <span>ID</span>
                <span>Timestamp</span>
                <span>Lang</span>
                <span>Experience</span>
                <span>Time</span>
                <span>Result</span>
              </div>
              <div className="stats-table__body">
                {stats.lastSessions.map((session) => (
                  <div key={`${session.sessionId}-${session.timestamp}`} className="stats-table__row">
                    <span title={session.sessionId}>{session.sessionId}</span>
                    <span>{session.timestamp}</span>
                    <span>{session.language}</span>
                    <span>{session.experience}</span>
                    <span>{session.time}</span>
                    <span>{session.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StatsPanel;
