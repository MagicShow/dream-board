import { useState, useRef } from 'react';

export default function CardModal({ card, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(card?.title || '');
  const [subtext, setSubtext] = useState(card?.subtext || '');
  const [imageUrl, setImageUrl] = useState(card?.imageUrl || '');
  const [videoUrl, setVideoUrl] = useState(card?.videoUrl || '');
  const [isVideo, setIsVideo] = useState(!!card?.videoUrl);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (isVideo) {
        setVideoUrl(e.target.result);
      } else {
        setImageUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    if (!imageUrl && !videoUrl) return;
    onSave({
      title: title.trim(),
      subtext: subtext.trim(),
      imageUrl: isVideo ? '' : imageUrl,
      videoUrl: isVideo ? videoUrl : '',
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-handle" />

        <div className="modal-header">
          <span className="modal-title">{card ? 'Edit Card' : 'New Dream'}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Upload Zone — entire zone triggers file input */}
        <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
          {/* File input always on top, fully transparent, covers full zone */}
          <input
            ref={fileInputRef}
            type="file"
            accept={isVideo ? 'video/*' : 'image/*'}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
              zIndex: 10,
            }}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {isVideo ? (
            videoUrl ? (
              <video
                className="upload-preview"
                src={videoUrl}
                controls
                muted
                playsInline
              />
            ) : (
              <div className="upload-zone-text">
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>🎬</span>
                Tap to upload video
                <div className="upload-zone-hint">MP4, MOV up to 100MB</div>
              </div>
            )
          ) : (
            imageUrl ? (
              <img className="upload-preview" src={imageUrl} alt="Preview" />
            ) : (
              <div className="upload-zone-text">
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>📷</span>
                Tap to upload image
                <div className="upload-zone-hint">JPG, PNG, HEIC</div>
              </div>
            )
          )}
        </div>

        {/* Video Toggle */}
        <label className="video-toggle">
          <input
            type="checkbox"
            checked={isVideo}
            onChange={(e) => {
              setIsVideo(e.target.checked);
              setImageUrl('');
              setVideoUrl('');
            }}
          />
          Use video instead of image
        </label>

        {/* Title */}
        <div className="field">
          <label className="field-label">Title</label>
          <input
            className="field-input"
            type="text"
            placeholder="My dream goal…"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 60))}
            maxLength={60}
          />
        </div>

        {/* Subtext */}
        <div className="field">
          <label className="field-label">Subtext</label>
          <textarea
            className="field-textarea"
            placeholder="Why this matters to me…"
            value={subtext}
            onChange={(e) => setSubtext(e.target.value.slice(0, 120))}
            maxLength={120}
          />
        </div>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={!title.trim() || (!imageUrl && !videoUrl)}
        >
          {card ? 'Save Changes' : 'Add to Board'}
        </button>

        {card && (
          <button
            className="delete-btn"
            onClick={() => onDelete(card.id)}
          >
            Delete Card
          </button>
        )}
      </div>
    </div>
  );
}
