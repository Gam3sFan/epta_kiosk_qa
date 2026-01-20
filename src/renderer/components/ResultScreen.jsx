import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import qrIconAsset from '../../assets/qrcode.svg';
import printerIconAsset from '../../assets/printer.fill.svg';
import resultMap1 from '../../assets/results/id1.png';
import resultMap2 from '../../assets/results/id2.png';
import resultMap3 from '../../assets/results/id3.png';
import resultMap4 from '../../assets/results/id4.png';
import resultMap5 from '../../assets/results/id5.png';
import resultMap6 from '../../assets/results/id6.png';
import resultMap7 from '../../assets/results/id7.png';
import resultMap8 from '../../assets/results/id8.png';

const qrIcon = new URL(qrIconAsset, import.meta.url).href;
const printerIcon = new URL(printerIconAsset, import.meta.url).href;
const resultMaps = {
  1: new URL(resultMap1, import.meta.url).href,
  2: new URL(resultMap2, import.meta.url).href,
  3: new URL(resultMap3, import.meta.url).href,
  4: new URL(resultMap4, import.meta.url).href,
  5: new URL(resultMap5, import.meta.url).href,
  6: new URL(resultMap6, import.meta.url).href,
  7: new URL(resultMap7, import.meta.url).href,
  8: new URL(resultMap8, import.meta.url).href,
};
const cloudPathsBase = 'https://eptamedias.z6.web.core.windows.net/paths';
const essentialTrailImage = `${cloudPathsBase}/essential_trail.png`;
const essentialTrailPdf = `${cloudPathsBase}/essential_trail.pdf`;

const ResultScreen = ({ result, copy, stepLabel, resultId }) => {
  const headline = result?.title || copy?.title || 'Your personalized map!';
  const description = result?.description || '';
  const subtitle = copy?.subtitle || 'Scan your map QR code to download it on your device.';
  const scanLabel = copy?.scanLabel || 'Show QR';
  const printLabel = copy?.printLabel || 'Print here';
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [cachedPdfUrl, setCachedPdfUrl] = useState('');
  const cacheAttemptedRef = useRef(false);
  const normalizedResultId = resultId ? String(resultId) : null;
  const isEssentialTrail = normalizedResultId === '1';
  const mapSrc = normalizedResultId ? (isEssentialTrail ? essentialTrailImage : resultMaps[Number(normalizedResultId)]) : null;
  const qrCodeSrc = isEssentialTrail && qrCodeDataUrl ? qrCodeDataUrl : qrIcon;

  useEffect(() => {
    let cancelled = false;
    if (!isEssentialTrail) {
      setCachedPdfUrl('');
      cacheAttemptedRef.current = false;
      return () => {
        cancelled = true;
      };
    }
    if (cacheAttemptedRef.current) {
      return () => {
        cancelled = true;
      };
    }
    cacheAttemptedRef.current = true;
    if (window?.eptaUi?.cacheFile) {
      window.eptaUi
        .cacheFile(essentialTrailPdf)
        .then((url) => {
          if (!cancelled && url) {
            setCachedPdfUrl(url);
            console.info('[print] Cached PDF ready', url);
          }
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
  }, [isEssentialTrail]);

  useEffect(() => {
    let isCancelled = false;

    if (!isEssentialTrail) {
      setQrCodeDataUrl('');
      return () => {
        isCancelled = true;
      };
    }

    QRCode.toDataURL(essentialTrailPdf, { width: 320, margin: 1 })
      .then((dataUrl) => {
        if (!isCancelled) {
          setQrCodeDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setQrCodeDataUrl('');
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [isEssentialTrail]);

  const handlePrint = () => {
    if (isEssentialTrail) {
      console.info('[print] Start PDF print', {
        cachedPdfUrl,
        cloudUrl: essentialTrailPdf,
      });
      const targetUrls = [cachedPdfUrl, essentialTrailPdf]
        .filter(Boolean)
        .filter((value, index, list) => list.indexOf(value) === index);
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      let attemptIndex = 0;
      let loadTimeoutId = null;
      let printed = false;

      const cleanup = () => {
        if (loadTimeoutId) {
          clearTimeout(loadTimeoutId);
          loadTimeoutId = null;
        }
        printFrame.remove();
      };

      const tryNextUrl = () => {
        if (attemptIndex >= targetUrls.length) {
          console.warn('[print] PDF print failed, no URLs left');
          cleanup();
          return;
        }
        const nextUrl = targetUrls[attemptIndex];
        attemptIndex += 1;
        console.info('[print] Loading PDF for print', nextUrl);
        printFrame.src = nextUrl;
        loadTimeoutId = setTimeout(() => {
          console.warn('[print] PDF load timeout, trying next');
          tryNextUrl();
        }, 8000);
      };

      printFrame.onload = () => {
        if (printed) return;
        if (loadTimeoutId) {
          clearTimeout(loadTimeoutId);
          loadTimeoutId = null;
        }
        const frameWindow = printFrame.contentWindow;
        if (frameWindow) {
          printed = true;
          frameWindow.focus();
          frameWindow.print();
          const finalize = () => {
            frameWindow.removeEventListener('afterprint', finalize);
            cleanup();
          };
          frameWindow.addEventListener('afterprint', finalize);
          setTimeout(finalize, 2000);
        } else {
          console.warn('[print] Missing iframe window, retrying');
          tryNextUrl();
        }
      };

      printFrame.onerror = () => {
        if (loadTimeoutId) {
          clearTimeout(loadTimeoutId);
          loadTimeoutId = null;
        }
        console.warn('[print] PDF iframe load error, retrying');
        tryNextUrl();
      };
      document.body.appendChild(printFrame);
      tryNextUrl();
      return;
    }

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
      <div className="result-screen__header">
        <h1>{headline}</h1>
        {description && <p className="result-screen__description">{description}</p>}
      </div>
      <div className="result-screen__canvas">
        {mapSrc && <img src={mapSrc} alt={headline} className="result-screen__map" />}
      </div>

      <div className="result-screen__actions">
        <button type="button" className="result-action" onClick={() => setShowQrModal(true)}>
          <img src={qrIcon} alt="" aria-hidden="true" />
          <span>{scanLabel}</span>
        </button>
        <button type="button" className="result-action" onClick={handlePrint}>
          <img src={printerIcon} alt="" aria-hidden="true" />
          <span>{printLabel}</span>
        </button>
        {isEssentialTrail && (
          <button type="button" className="result-action" onClick={() => setShowPdfPreview(true)}>
            <span>Preview PDF</span>
          </button>
        )}
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
              <img src={qrCodeSrc} alt="QR code" className="qr-modal__qr" />
              <p className="qr-modal__caption">{subtitle}</p>
            </div>
          </div>
        </div>
      )}

      {showPdfPreview && (
        <div
          className="pdf-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="PDF preview"
          onClick={() => setShowPdfPreview(false)}
        >
          <div className="pdf-modal" onClick={(event) => event.stopPropagation()} role="presentation">
            <button type="button" className="pdf-modal__close" onClick={() => setShowPdfPreview(false)} aria-label="Close preview">
              x
            </button>
            <iframe
              title="PDF preview"
              className="pdf-modal__frame"
              src={cachedPdfUrl || essentialTrailPdf}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultScreen;
