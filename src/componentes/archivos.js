import React, { useState } from 'react';
import "../estilos/archivos.css"

const Archivos = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image/')) {
        // Mostrar la imagen seleccionada
        setSelectedImage(URL.createObjectURL(files[i]));
      }
    }
  };

  return (
    <div
      className={`Archivos ${isDragging ? 'Archivos-dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedImage ? (
        <img src={selectedImage} alt="Imagen seleccionada" className="SelectedImage" />
      ) : (
        <label htmlFor="file-input" className="Archivos-label">
          Arrastra y suelta archivos o haz clic aquí para buscar en el explorador
        </label>
      )}
      <input
        type="file"
        id="file-input"
        accept="image/*"
        multiple
        onChange={handleFileInput}
      />
    </div>
  );
};

export default Archivos;
