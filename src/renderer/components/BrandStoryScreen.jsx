import React from 'react';
import eptaTaglineImage from '../../assets/logo_epta_payoff.png';

const EUROSHOP_AREAS = [
  { title: 'GOOD PRESERVES', subtitle: 'Lasting Freshness' },
  { title: 'GOOD SHAPES', subtitle: 'Perfect Experiences' },
  { title: 'GOOD FITS', subtitle: 'Every tech need' },
  { title: 'GOOD BOOSTS', subtitle: 'Store Satisfaction' },
  { title: 'GOOD POWERS', subtitle: 'Service Innovation' },
  { title: 'GOOD DELIVERS', subtitle: 'Full solutions' },
  { title: 'GOOD SPARKS', subtitle: 'In smart spaces' },
  { title: 'GOOD SHOWS', subtitle: 'Local care in global reach' },
];

const BrandStoryScreen = ({ title, description }) => (
  <section className="brand-story-screen">
    <img src={eptaTaglineImage} alt={title} className="brand-story__logo" />
    <div className="brand-story__content">
      <h3 className="brand-story__areas-title">Good never stops</h3>
      <p className="brand-story__description">{description}</p>
      <div className="brand-story__areas">
        <h5 className="brand-story__areas-title">EPTA Euroshop Areas</h5>
        <ul className="brand-story__areas-grid">
          {EUROSHOP_AREAS.map((area) => (
            <li key={area.title} className="brand-story__area-pill">
              <span className="brand-story__area-heading">{area.title}</span>
              <span className="brand-story__area-subtitle">{area.subtitle}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default BrandStoryScreen;
