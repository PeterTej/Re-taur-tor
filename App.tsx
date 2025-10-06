import React, { useState } from 'react';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
      setRestoredImage(null);
    }
  };

  const handleRestore = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('https://www.restorephotos.io/api', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const restoredUrl = URL.createObjectURL(blob);
      setRestoredImage(restoredUrl);
    } catch (err) {
      console.error('Error restoring photo:', err);
      setError(
        err instanceof Error 
          ? `Chyba pri obnovovaní fotografie: ${err.message}`
          : 'Neznáma chyba pri obnovovaní fotografie'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Restaurator Photo</h1>
      
      {/* Formulár na nahrávanie fotografie */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Nahrať fotografiu</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          style={{ marginBottom: '10px' }}
        />
        {previewUrl && (
          <div>
            <h3>Náhľad:</h3>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        )}
      </div>

      {/* Chybová správa */}
      {error && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {/* Tlačidlo pre obnovu */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleRestore} 
          disabled={!selectedImage || isLoading}
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: (selectedImage && !isLoading) ? 'pointer' : 'not-allowed',
            opacity: (selectedImage && !isLoading) ? 1 : 0.5
          }}
        >
          {isLoading ? 'Obnovujem...' : 'Obnoviť fotografiu'}
        </button>
      </div>

      {/* Sekcia na zobrazenie výsledku */}
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Výsledok obnovy</h2>
        {restoredImage ? (
          <img src={restoredImage} alt="Restored" style={{ maxWidth: '100%' }} />
        ) : (
          <p style={{ color: '#666' }}>Tu sa zobrazí obnovená fotografia...</p>
        )}
      </div>
    </div>
  );
}
