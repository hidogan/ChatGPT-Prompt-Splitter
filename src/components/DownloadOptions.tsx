import React from 'react';
import {
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { TextChunk } from '../types';

interface DownloadOptionsProps {
  chunks: TextChunk[];
}

export const DownloadOptions: React.FC<DownloadOptionsProps> = ({ chunks }) => {
  const toast = useToast();

  const downloadTxt = () => {
    if (chunks.length === 0) return;
    const totalParts = chunks[0].totalParts;
    const instructions = "The total length of the content that I want to send you is too large to send in only one piece.\n\n" +
      "For sending you that content, I will follow this rule:\n\n" +
      `[START PART 1/${totalParts}]\n` +
      `this is the content of the part 1 out of ${totalParts} in total\n` +
      `[END PART 1/${totalParts}]\n\n` +
      `Then you just answer: "Received part 1/${totalParts}"\n\n` +
      "And when I tell you \"ALL PARTS SENT\", then you can continue processing the data and answering my requests.\n\n" +
      "Do not answer yet. This is just another part of the text I want to send you. " +
      `Just receive and acknowledge as "Part 1/${totalParts} received" and wait for the next part.\n\n`;
    const content = instructions + chunks.map(chunk => 
      `[START PART ${chunk.partNumber}/${chunk.totalParts}]\n${chunk.text}\n[END PART ${chunk.partNumber}/${chunk.totalParts}]`
    ).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'split-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Download started',
      status: 'success',
      duration: 2000,
    });
  };

  if (chunks.length === 0) {
    return null;
  }

  return (
    <HStack spacing={4} mt={4}>
      <Button
        colorScheme="green"
        onClick={downloadTxt}
      >
        Download as TXT
      </Button>
    </HStack>
  );
};

export default DownloadOptions; 