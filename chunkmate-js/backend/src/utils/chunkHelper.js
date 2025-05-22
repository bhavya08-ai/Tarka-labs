const fs = require('fs');
const path = require('path');

// Helper to extract links from a markdown paragraph
const extractLinks = (text) => {
  const regex = /([^]+)(https?:\/\/[^\s)]+)/g;
  const links = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
    });
  }
  return links;
};

// Helper to chunk document content
const chunkDocument = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');

  let chunks = [];
  let currentHeadings = [];
  let chunkId = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Heading detection (up to 10 levels)
    if (/^#{1,10}\s/.test(line)) {
      currentHeadings.push(line);
      continue;
    }

    // Table detection
    if (line.startsWith('|') && line.includes('|')) {
      let tableLines = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i++]);
      }
      i--;

      const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
      for (let j = 2; j < tableLines.length; j++) {
        const row = tableLines[j].split('|').map(c => c.trim()).filter(Boolean);
        if (row.length === headers.length) {
          let chunkText = currentHeadings.join('\n') + '\n';
          for (let k = 0; k < headers.length; k++) {
            chunkText += `${headers[k]}: ${row[k]}\n`;
          }
          chunks.push({ id: chunkId++, text: chunkText.trim(), links: extractLinks(chunkText) });
        }
      }
      continue;
    }

    // Paragraph as chunk
    if (line.length > 0) {
      const chunkText = `${currentHeadings.join('\n')}\n${line}`;
      const links = extractLinks(line);
      chunks.push({ id: chunkId++, text: chunkText.trim(), links });
    }
  }

  return chunks;
};

module.exports = { chunkDocument };