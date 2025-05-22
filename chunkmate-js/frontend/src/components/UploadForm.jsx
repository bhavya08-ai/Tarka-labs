import React, { useState } from 'react';

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.md')) {
      setFile(selectedFile);
      setError('');
      setSuccess('');
    } else {
      setError('Only markdown (.md) files are supported.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a markdown file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    try {
      await onUpload(formData);
      setSuccess('File uploaded successfully!');
      setError('');
      setFile(null);
      e.target.reset();
    } catch (uploadError) {
      setError('Failed to upload the file.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input type="file" accept=".md" onChange={handleFileChange} />
      <button type="submit" disabled={!file}>
        Upload
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default UploadForm;