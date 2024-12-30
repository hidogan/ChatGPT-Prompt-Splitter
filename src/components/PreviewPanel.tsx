import React from 'react';
import {
  Box,
  Text,
  Code,
} from '@chakra-ui/react';

interface PreviewPanelProps {
  text: string;
  chunkSize: number;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ text, chunkSize }) => {
  const previewText = text.length > 200 ? `${text.slice(0, 200)}...` : text;
  const estimatedChunks = Math.ceil(text.length / chunkSize);

  return (
    <Box mb={4}>
      <Text fontWeight="bold" mb={2}>Preview:</Text>
      <Code p={3} borderRadius="md" display="block" whiteSpace="pre-wrap" mb={2}>
        {previewText}
      </Code>
      <Text>
        Total characters: {text.length} | Estimated chunks: {estimatedChunks}
      </Text>
    </Box>
  );
};

export default PreviewPanel; 