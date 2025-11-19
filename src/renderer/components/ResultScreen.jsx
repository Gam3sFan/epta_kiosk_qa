import React from 'react';
import StepHeader from './StepHeader';

const ResultScreen = ({ result, selectedExperiences, onRestart, copy, stepLabel, ctaLabel }) => (
  <section className="result-card">
    <StepHeader
      step={3}
      total={3}
      stepLabel={stepLabel}
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
    />
    {result ? (
      <div className="result-highlight">
        <p className="eyebrow">{result.kicker}</p>
        <h3>{result.title}</h3>
        <p className="result-body">{result.body}</p>
      </div>
    ) : (
      <div className="result-highlight">
        <h3>{copy.emptyTitle}</h3>
        <p className="result-body">{copy.emptyBody}</p>
      </div>
    )}
    {selectedExperiences.length > 0 && (
      <div className="chip-row">
        {selectedExperiences.map((option) => (
          <span className="selection-chip" key={option.id}>
            {option.label}
          </span>
        ))}
      </div>
    )}
    <button type="button" className="primary-cta" onClick={onRestart}>
      {ctaLabel}
    </button>
  </section>
);

export default ResultScreen;
