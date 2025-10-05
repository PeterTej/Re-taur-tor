import React, { useState } from 'react';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRestore = () => {
    // TODO: Implementovať logiku pre obnovu fotografie
    console.log('Obnovujem fotografiu:', selectedImage?.name);
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

      {/* Tlačidlo pre obnovu */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleRestore} 
          disabled={!selectedImage}
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: selectedImage ? 'pointer' : 'not-allowed',
            opacity: selectedImage ? 1 : 0.5
          }}
        >
          Obnoviť fotografiu
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
