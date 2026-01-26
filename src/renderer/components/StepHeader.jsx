import React from 'react';

const StepHeader = ({
  step,
  total,
  stepLabel,
  title,
  subtitle,
  showIndicator = true,
}) => {
  const dots = showIndicator && total ? Array.from({ length: total }, (_, idx) => idx + 1) : [];

  return (
    <header className="step-header">
      {showIndicator && (
        <p className="step-indicator" aria-label={`${stepLabel} ${step} / ${total}`}>
          {dots.map((dot) => (
            <span key={dot} className={`step-dot ${dot === step ? 'is-active' : ''}`} aria-hidden="true" />
          ))}
        </p>
      )}
      <h3>{title}</h3>
      {subtitle && <p className="question-subtitle">{subtitle}</p>}
    </header>
  );
};

export default StepHeader;
