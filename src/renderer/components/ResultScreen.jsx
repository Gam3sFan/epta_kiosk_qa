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
const essentialTrailPdfDownload = `${cloudPathsBase}/essential_trail.pdf`;

const ResultScreen = ({
  result,
  copy,
  stepLabel,
  resultId,
  onQrDone,
  printingCopy,
  printEnabled = true,
}) => {
  const headline = result?.title || copy?.title || 'Your personalized map!';
  const description = result?.description || '';
  const subtitle = copy?.subtitle || 'Scan your map QR code to download it on your device.';
  const scanLabel = copy?.scanLabel || 'Show QR';
  const printLabel = copy?.printLabel || 'Print here';
  const doneLabel = copy?.doneLabel || 'Done';
  const printingTitle = printingCopy?.title || 'Printing...';
  const printingSubtitle = printingCopy?.subtitle || 'Please wait.';
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [localPdfUrl, setLocalPdfUrl] = useState('');
  const printTimeoutRef = useRef(null);
  const printResponseTimeoutRef = useRef(null);
  const normalizedResultId = resultId ? String(resultId) : null;
  const isEssentialTrail = normalizedResultId === '1';
  const mapSrc = normalizedResultId ? (isEssentialTrail ? essentialTrailImage : resultMaps[Number(normalizedResultId)]) : null;
  const qrCodeSrc = isEssentialTrail && qrCodeDataUrl ? qrCodeDataUrl : qrIcon;

  useEffect(() => {
    let cancelled = false;
    if (!isEssentialTrail) {
      setLocalPdfUrl('');
      return () => {
        cancelled = true;
      };
    }
    if (window?.eptaUi?.getLocalPdfUrl) {
      window.eptaUi
        .getLocalPdfUrl()
        .then((url) => {
          if (!cancelled && url) {
            setLocalPdfUrl(url);
            console.info('[print] Local PDF URL', url);
          }
        })
        .catch((error) => {
          console.warn('[print] Failed to resolve local PDF', error);
        });
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

    QRCode.toDataURL(essentialTrailPdfDownload, { width: 320, margin: 1 })
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

  useEffect(() => () => {
    if (printTimeoutRef.current) {
      clearTimeout(printTimeoutRef.current);
      printTimeoutRef.current = null;
    }
    if (printResponseTimeoutRef.current) {
      clearTimeout(printResponseTimeoutRef.current);
      printResponseTimeoutRef.current = null;
    }
  }, []);

  const clearPrintResponseTimer = () => {
    if (printResponseTimeoutRef.current) {
      clearTimeout(printResponseTimeoutRef.current);
      printResponseTimeoutRef.current = null;
    }
  };

  const startPrintResponseTimer = () => {
    clearPrintResponseTimer();
    printResponseTimeoutRef.current = setTimeout(() => {
      setShowPrintModal(false);
      setShowQrModal(true);
      printResponseTimeoutRef.current = null;
    }, 15000);
  };

  const handlePrint = () => {
    if (!printEnabled) return;
    if (isEssentialTrail) {
      console.info('[print] Request print from main process');
      if (window?.eptaUi?.printEssentialTrail) {
        setShowPrintModal(true);
        setShowQrModal(false);
        startPrintResponseTimer();
        window.eptaUi
          .printEssentialTrail()
          .then((result) => {
            if (!result?.ok) {
              console.warn('[print] Print failed', result);
            } else {
              console.info('[print] Print succeeded');
            }
            clearPrintResponseTimer();
            if (result?.ok) {
              setShowPrintModal(false);
              onQrDone?.();
            } else {
              setShowPrintModal(false);
              setShowQrModal(true);
            }
          })
          .catch((error) => {
            console.warn('[print] Print failed', error);
            clearPrintResponseTimer();
            setShowPrintModal(false);
            setShowQrModal(true);
          });
      } else {
        console.warn('[print] Missing print bridge');
        setShowPrintModal(true);
        setShowQrModal(false);
        startPrintResponseTimer();
      }
      return;
    }

    const target = document.querySelector('.result-screen');
    if (!target) return;

    const body = document.body;
    body.classList.add('print-mode');

    const cleanup = () => {
      body.classList.remove('print-mode');
      window.onafterprint = null;
      onQrDone?.();
    };

    window.onafterprint = cleanup;
    setTimeout(() => {
      window.print();
      setTimeout(cleanup, 1000);
    }, 50);
  };

  const handleQrDone = () => {
    setShowQrModal(false);
    onQrDone?.();
  };

  const handleQrPrint = () => {
    setShowQrModal(false);
    handlePrint();
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
        <button type="button" className="result-action" onClick={handlePrint} disabled={!printEnabled}>
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
            <div className="qr-modal__content">
              <img src={qrCodeSrc} alt="QR code" className="qr-modal__qr" />
              <p className="qr-modal__caption">{subtitle}</p>
            </div>
          </div>
          <button type="button" className="bottom-bar__back" onClick={handleQrDone}>
                {doneLabel}
          </button>
          <button type="button" className="qr-modal__print" onClick={handleQrPrint}>
            {printLabel}
          </button>
        </div>
      )}

      {showPrintModal && (
        <div className="print-modal-overlay" role="dialog" aria-modal="true" aria-label={printingTitle}>
          <div className="print-modal" role="status" aria-live="polite">
            <div className="print-modal__spinner" aria-hidden="true" />
            <p className="print-modal__title">{printingTitle}</p>
            <p className="print-modal__subtitle">{printingSubtitle}</p>
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
              src={localPdfUrl || essentialTrailPdfDownload}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultScreen;
