import React from 'react';
import eptaTaglineImage from '../../assets/logo_epta_payoff.png';

const BrandStoryScreen = ({ title, description }) => (
  <section className="brand-story-screen">
      <img src={eptaTaglineImage} alt={title} className="brand-story__logo" />
    <div className="brand-story__content">
      <p className="brand-story__description">{description}</p>
    </div>
  </section>
);

export default BrandStoryScreen;
