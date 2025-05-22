// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import UploadButton from '../components/UploadButton';
import Sidebar from '../components/Sidebar';
import GlobalStyles from '../styles/GlobalStyles';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
`;

const Home = () => {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/documents');
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Sidebar documents={documents} />
        <MainContent>
          <h2>Upload a Markdown Document</h2>
          <UploadButton onUpload={fetchDocuments} />
        </MainContent>
      </Container>
    </>
  );
};

export default Home;