import React from 'react';
import eptaTaglineImage from '../../assets/logo_epta_payoff.png';
import aresTextsImage from '../../assets/ares_texts.svg';

const BrandStoryScreen = ({ title, description }) => (
  <section className="brand-story-screen">
    <img src={eptaTaglineImage} alt={title} className="brand-story__logo" />
    <div className="brand-story__content">
      <h3 className="brand-story__areas-title">Good never stops</h3>
      <p className="brand-story__description">{description}</p>
      <div className="brand-story__areas">
        <h5 className="brand-story__areas-title">EPTA Euroshop Areas</h5>
        <ul className="brand-story__areas-grid">
          <li className="brand-story__areas-image">
            <img src={aresTextsImage} alt="EPTA Euroshop Areas" className="brand-story__areas-illustration" />
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default BrandStoryScreen;
