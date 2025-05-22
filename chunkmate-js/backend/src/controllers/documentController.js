const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const extractChunksFromMarkdown = require('../utils/chunker');
const extractLinks = require('../utils/linkExtractor');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path: filePath } = req.file;
    const content = fs.readFileSync(filePath, 'utf-8');

    // Save document info
    const document = await prisma.document.create({
      data: {
        name: originalname,
      },
    });

    // Extract chunks
    const chunks = extractChunksFromMarkdown(content);
    const savedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      const savedChunk = await prisma.chunk.create({
        data: {
          number: i + 1,
          content: chunk.content,
          headings: chunk.headings.join(' > '),
          documentId: document.id,
        },
      });

      // Extract and save links
      const links = extractLinks(chunk.content);
      for (const url of links) {
        await prisma.reference.create({
          data: {
            url,
            documentId: document.id,
            chunkId: savedChunk.id,
          },
        });
      }

      savedChunks.push(savedChunk);
    }

    res.status(201).json({
      message: 'Document processed and chunks saved successfully',
      documentId: document.id,
      chunks: savedChunks,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error while processing document' });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch documents' });
  }
};

exports.getDocumentChunks = async (req, res) => {
  try {
    const { id } = req.params;
    const chunks = await prisma.chunk.findMany({
      where: { documentId: id },
      orderBy: { number: 'asc' },
    });
    res.json(chunks);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch chunks' });
  }
};