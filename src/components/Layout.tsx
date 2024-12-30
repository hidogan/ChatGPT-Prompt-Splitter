import React, { useState } from 'react';
import { Box, Heading, Container, Flex, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { TextInput } from './TextInput';
import { ChunkSizeSelector } from './ChunkSizeSelector';
import { PreviewPanel } from './PreviewPanel';
import { SplitControls } from './SplitControls';
import { ChunksList } from './ChunksList';
import { DownloadOptions } from './DownloadOptions';
import { TextChunk } from '../types';
import { splitText } from '../utils/textSplitter';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Layout = () => {
  const [text, setText] = useState('');
  const [chunkSize, setChunkSize] = useState(15000);
  const [chunks, setChunks] = useState<TextChunk[]>([]);

  const handleSplit = async () => {
    const newChunks = await splitText(text, chunkSize);
    setChunks(newChunks);
  };

  const handleClear = () => {
    setText('');
    setChunks([]);
  };

  return (
    <Box>
      <Box 
        py={6} 
        mb={6}
        position="relative"
        overflow="hidden"
        bg="brand.darkBg"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.5}
          bgGradient="linear(135deg, brand.prismarine, brand.galacticFed, brand.accent)"
          backgroundSize="400% 400%"
          animation={`${gradientAnimation} 15s ease infinite`}
          filter="blur(100px)"
        />
        <Container maxW="container.xl">
          <Flex direction="column" align="center" position="relative">
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl' }}
              color="brand.lightText"
              fontWeight="bold"
              textAlign="center"
              textShadow="0 2px 12px rgba(0,0,0,0.3)"
              letterSpacing="tight"
              mb={2}
            >
              ChatGPT Prompt Splitter
            </Heading>
            <Text color="whiteAlpha.800" fontSize="lg" textAlign="center">
              Split your large prompts into optimal chunks
            </Text>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" px={4}>
        <main>
          <Flex direction="column" gap={4}>
            {/* Text Input Section */}
            <Box bg="whiteAlpha.50" p={4} rounded="lg">
              <TextInput 
                onTextChange={setText}
                onChunkSizeChange={setChunkSize}
                numParts={chunks.length}
              />
              <ChunkSizeSelector 
                value={chunkSize}
                onChange={setChunkSize}
                onRefresh={handleSplit}
              />
            </Box>
            
            {/* Preview & Controls */}
            <Box bg="whiteAlpha.50" p={4} rounded="lg">
              <PreviewPanel 
                text={text}
                chunkSize={chunkSize}
              />
              <SplitControls 
                onSplit={handleSplit}
                onClear={handleClear}
                isDisabled={!text}
              />
            </Box>
            
            {/* Results */}
            <Box bg="whiteAlpha.50" p={4} rounded="lg">
              <ChunksList chunks={chunks} />
              <DownloadOptions chunks={chunks} />
            </Box>
          </Flex>
        </main>
      </Container>
    </Box>
  );
}

export default Layout; 