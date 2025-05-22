// src/components/ChunkViewer.jsx
import React from 'react';

const ChunkViewer = ({ chunks }) => {
  return (
    <div>
      {chunks.map((chunk, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h4>Chunk {index + 1}</h4>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{chunk.content}</pre>
        </div>
      ))}
    </div>
  );
};

export default ChunkViewer;