import React from 'react';
import {
  VStack,
  Text,
} from '@chakra-ui/react';
import { ChunkDisplay } from './ChunkDisplay';
import { TextChunk } from '../types';

interface ChunksListProps {
  chunks: TextChunk[];
}

export const ChunksList: React.FC<ChunksListProps> = ({ chunks }) => {
  if (chunks.length === 0) {
    return null;
  }

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold">Split Results:</Text>
      <ChunkDisplay chunks={chunks} />
    </VStack>
  );
};

export default ChunksList; 