import React, { useEffect } from 'react';

const PhotoModal = ({ photo, onClose }) => {
    useEffect(() => {
        if (photo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [photo]);

    if (!photo) return null;

    return (
        <div
            className="modal-overlay active"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close photo">&times;</button>
                <img src={photo.src} alt={photo.caption} className="modal-img" />
                <h3 className="modal-caption">{photo.caption}</h3>
                <p className="modal-note">{photo.note}</p>
            </div>
        </div>
    );
};

export default PhotoModal;
