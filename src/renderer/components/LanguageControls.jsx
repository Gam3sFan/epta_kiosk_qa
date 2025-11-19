import React, { useEffect, useRef, useState } from 'react';

export const LanguageToggle = ({ language, onSelect, languageOptions = [] }) => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="language-toggle" ref={toggleRef}>
      <button
        type="button"
        className="language-toggle__button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img src={language.flag} alt="" className="flag-icon" />
        <span>{language.label}</span>
      </button>
      {open && (
        <div className="language-toggle__menu language-toggle__menu--up" role="listbox">
          {languageOptions.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
              className={item.code === language.code ? 'is-active' : ''}
            >
              <img src={item.flag} alt="" className="flag-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const BottomBar = ({ language, onLanguage, languageOptions = [] }) => (
  <div className="bottom-bar">
    <div />
    <LanguageToggle language={language} onSelect={onLanguage} languageOptions={languageOptions} />
  </div>
);
