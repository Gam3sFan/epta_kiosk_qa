import React from 'react';
import StepHeader from './StepHeader';

const OptionCard = ({ option, index, selected, onSelect }) => {
  const classes = ['option-card'];
  if (selected) classes.push('is-selected');

  return (
    <button type="button" className={classes.join(' ')} onClick={onSelect}>
      <div className="option-index">{index.toString().padStart(2, '0')}</div>
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
}) => (
  <section className="question-card">
    <StepHeader step={step} total={total} stepLabel={stepLabel} eyebrow={eyebrow} title={title} subtitle={subtitle} />
    <div className="option-stack">
      {options.map((option, index) => (
        <OptionCard
          key={option.id}
          option={option}
          index={index + 1}
          selected={selectedOptions.includes(option.id)}
          onSelect={() => onSelect(option.id)}
        />
      ))}
    </div>
    {helper && (
      <div className="helper-row">
        <p>{helper}</p>
      </div>
    )}
    {controls}
  </section>
);

export default QuestionScreen;
