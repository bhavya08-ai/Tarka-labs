import React from 'react';

const DocumentList = ({ documents, onSelect }) => {
  if (!documents || documents.length === 0) {
    return <p>No documents uploaded yet.</p>;
  }

  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {documents.map((doc) => (
          <li
            key={doc.id}
            style={{
              cursor: 'pointer',
              padding: '8px',
              borderBottom: '1px solid #ccc',
            }}
            onClick={() => onSelect(doc)}
          >
            {doc.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;