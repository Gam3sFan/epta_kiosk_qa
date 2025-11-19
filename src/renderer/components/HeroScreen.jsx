import React from 'react';

const HeroScreen = ({ copy, onStart, ctaLabel }) => (
  <section className="hero-screen">
    <div className="hero-center">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="subtitle">{copy.subtitle}</p>
      <button type="button" className="primary-cta" onClick={onStart}>
        {ctaLabel}
      </button>
    </div>
  </section>
);

export default HeroScreen;
