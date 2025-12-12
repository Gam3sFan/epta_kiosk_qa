import React, { useState } from 'react';
import qrIconAsset from '../../assets/qrcode.svg';
import printerIconAsset from '../../assets/printer.fill.svg';

const qrIcon = new URL(qrIconAsset, import.meta.url).href;
const printerIcon = new URL(printerIconAsset, import.meta.url).href;

const ResultScreen = ({ result, copy, stepLabel }) => {
  const headline = result?.title || copy?.title || 'Your personalized map!';
  const subtitle = copy?.subtitle || 'Scan or print your map.';
  const scanLabel = copy?.scanLabel || 'Show QR';
  const printLabel = copy?.printLabel || 'Print here';
  const [showQrModal, setShowQrModal] = useState(false);

  const handlePrint = () => {
    const target = document.querySelector('.result-screen');
    if (!target) return;

    const body = document.body;
    body.classList.add('print-mode');

    const cleanup = () => {
      body.classList.remove('print-mode');
      window.onafterprint = null;
    };

    window.onafterprint = cleanup;
    setTimeout(() => {
      window.print();
      setTimeout(cleanup, 1000);
    }, 50);
  };

  return (
    <section className="result-screen">
      <div className="result-screen__canvas" aria-hidden="true" />

      <div className="result-screen__actions">
        <button type="button" className="result-action" onClick={() => setShowQrModal(true)}>
          <img src={qrIcon} alt="" aria-hidden="true" />
          <span>{scanLabel}</span>
        </button>
        <button type="button" className="result-action" onClick={handlePrint}>
          <img src={printerIcon} alt="" aria-hidden="true" />
          <span>{printLabel}</span>
        </button>
      </div>

      {showQrModal && (
        <div className="qr-modal-overlay" role="dialog" aria-modal="true" aria-label={scanLabel} onClick={() => setShowQrModal(false)}>
          <div
            className="qr-modal"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <button type="button" className="qr-modal__close" onClick={() => setShowQrModal(false)} aria-label="Chiudi QR">
              x
            </button>
            <div className="qr-modal__content">
              <img src={qrIcon} alt="QR code" className="qr-modal__qr" />
              <p className="qr-modal__caption">{subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultScreen;
