import { useState } from "react";
import "../styles/ImageUploadArea.css";

function ImageUploadArea({ onImageChange, selectedImage = null }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        onImageChange(file);
      }
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onImageChange(null);
  };

  if (selectedImage) {
    return (
      <div className="image-upload-preview">
        <div className="preview-image-container">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="preview-image"
          />
        </div>
        <div className="preview-info">
          <div className="preview-filename">
            <span className="filename-label">File:</span>
            <span className="filename">{selectedImage.name}</span>
          </div>
          <div className="preview-size">
            <span className="size-label">Size:</span>
            <span className="size">
              {(selectedImage.size / 1024).toFixed(2)} KB
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="btn-remove-image"
            type="button"
          >
            Replace Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`image-upload-area ${dragActive ? "drag-active" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        id="image-upload-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="image-upload-input"
      />
      <label htmlFor="image-upload-input" className="upload-label">
        <div className="upload-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="upload-text">
          <p className="upload-title">Drop your image here</p>
          <p className="upload-subtitle">or click to browse</p>
        </div>
        <p className="upload-hint">
          Supported formats: JPG, PNG, WebP • Max size: 5MB
        </p>
      </label>
    </div>
  );
}

export default ImageUploadArea;
