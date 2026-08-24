import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";

function Safari({ url, imageSrc, imageAlt = "" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const showImage = Boolean(imageSrc) && !imageFailed;

  // Lightbox açıkken sayfa kaymasın ve Esc ile kapanabilsin.
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  return (
    <div className="safari">
      <div className="safari-toolbar">
        <div className="safari-dots" aria-hidden="true">
          <span className="safari-dot safari-dot-red" />
          <span className="safari-dot safari-dot-yellow" />
          <span className="safari-dot safari-dot-green" />
        </div>
        <div className="safari-url">{url}</div>
      </div>

      <div className="safari-screen">
        {showImage ? (
          <button
            type="button"
            className="safari-image-trigger"
            onClick={() => setLightboxOpen(true)}
            aria-label={`${imageAlt} görselini tam boyutta görüntüle`}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="safari-image"
              onError={() => setImageFailed(true)}
            />
            <span className="safari-zoom-overlay" aria-hidden="true">
              <span className="safari-zoom-badge">
                <ZoomIn size={24} strokeWidth={1.8} />
              </span>
            </span>
          </button>
        ) : (
          <div className="safari-placeholder">
            <span>{imageAlt}</span>
          </div>
        )}
      </div>

      {showImage && isLightboxOpen
        ? createPortal(
            <div
              className="image-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={imageAlt}
              onClick={() => setLightboxOpen(false)}
            >
              <button
                type="button"
                className="image-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Kapat"
              >
                <X size={26} strokeWidth={2} />
              </button>
              <img
                src={imageSrc}
                alt={imageAlt}
                className="image-lightbox-img"
                onClick={(event) => event.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export default Safari;
