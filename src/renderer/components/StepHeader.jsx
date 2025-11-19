import React from 'react';

const StepHeader = ({ step, total, stepLabel, eyebrow, title, subtitle }) => (
  <header className="step-header">
    <p className="step-indicator">
      <span>{`${stepLabel} ${step}`}</span>
      <span className="step-divider" />
      <span>{total}</span>
    </p>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {subtitle && <p className="question-subtitle">{subtitle}</p>}
  </header>
);

export default StepHeader;
