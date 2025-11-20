import React from 'react';
import avatarIdleVideoAsset from '../../assets/avatar/EPTA_AVATAR_IDLE.mp4';

const avatarIdleVideo = new URL(avatarIdleVideoAsset, import.meta.url).href;

const HeroScreen = ({ copy, onStart, ctaLabel }) => (
  <section className="hero-screen">
    <div className="hero-avatar-video">
      <video
        src={avatarIdleVideo}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
    <div className="hero-center">
      
      <h1>{copy.eyebrow}</h1>
      <p className="subtitle">{copy.subtitle}</p>
      <button type="button" className="primary-cta" onClick={onStart}>
        {ctaLabel}
      </button>
    </div>
  </section>
);

export default HeroScreen;

//<p className="eyebrow">{copy.eyebrow}</p>
