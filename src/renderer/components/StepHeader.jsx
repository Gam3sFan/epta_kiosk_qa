import React from 'react';

const StepHeader = ({ step, total, stepLabel, eyebrow, title, subtitle }) => {
  const dots = Array.from({ length: total }, (_, idx) => idx + 1);

  return (
    <header className="step-header">
      <p className="step-indicator" aria-label={`${stepLabel} ${step} / ${total}`}>
        {dots.map((dot) => (
          <span key={dot} className={`step-dot ${dot === step ? 'is-active' : ''}`} aria-hidden="true" />
        ))}
      </p>
      <h2>{title}</h2>
      {subtitle && <p className="question-subtitle">{subtitle}</p>}
    </header>
  );
};

export default StepHeader;
