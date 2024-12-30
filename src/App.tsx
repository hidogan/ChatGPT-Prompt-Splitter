import React, { useState } from 'react';
import {
  ChakraProvider,
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  HStack,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { TextInput } from './components/TextInput';
import { ChunkDisplay } from './components/ChunkDisplay';
import { TextSplitter } from './utils/textSplitter';
import { TextChunk } from './types';
import theme from './theme';

function App() {
  const [chunks, setChunks] = useState<TextChunk[]>([]);
  const [config, setConfig] = useState({
    maxChunkSize: 15000,
    preserveWords: true
  });

  const handleTextChange = async (text: string) => {
    const newChunks = await TextSplitter.splitText(text, config);
    setChunks(newChunks);
  };

  const handleChunkSizeChange = (size: number) => {
    setConfig(prev => ({ ...prev, maxChunkSize: size }));
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="white">
        <Box 
          bg="brand.50"
          borderBottom="1px" 
          borderColor="brand.100"
          py={6}
          mb={6}
        >
          <Container maxW="container.xl">
            <VStack spacing={3} align="stretch">
              <Heading 
                size="2xl" 
                color="brand.600"
                letterSpacing="tight"
              >
                ChatGPT Prompt Splitter
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Split your large prompts into optimal chunks for AI chat
              </Text>
            </VStack>
          </Container>
        </Box>

        <Container maxW="container.xl">
          <VStack spacing={6} align="stretch">
            <Alert 
              status="info" 
              variant="left-accent"
              borderRadius="lg"
              bg="blue.50"
              color="blue.800"
              py={3}
            >
              <AlertIcon color="blue.500" />
              <Box>
                <Text fontWeight="bold" mb={1}>How it works:</Text>
                <UnorderedList spacing={0.5} pl={4}>
                  <ListItem>Paste your long text in the input box</ListItem>
                  <ListItem>Your text will be split into parts of 15,000 characters (ChatGPT's limit)</ListItem>
                  <ListItem>Each "Copy Part" button will copy that part with special formatting</ListItem>
                  <ListItem>The button turns green after copying to track your progress</ListItem>
                  <ListItem>Copy and paste each part to ChatGPT in order</ListItem>
                </UnorderedList>
              </Box>
            </Alert>

            <Alert 
              status="success" 
              variant="left-accent"
              borderRadius="lg"
              bg="green.50"
              color="green.800"
              py={3}
            >
              <AlertIcon color="green.500" />
              <Box>
                <Text fontWeight="bold" mb={1}>What happens when you paste to ChatGPT:</Text>
                <UnorderedList spacing={0.5} pl={4}>
                  <ListItem>Part 1 includes instructions telling ChatGPT to expect multiple parts</ListItem>
                  <ListItem>ChatGPT will reply with "Received part X/Y" for each part</ListItem>
                  <ListItem>Your text is automatically wrapped with [START PART X/Y] and [END PART X/Y]</ListItem>
                  <ListItem>After pasting the last part, ChatGPT will process your complete text</ListItem>
                  <ListItem>Then you can continue your conversation normally</ListItem>
                </UnorderedList>
              </Box>
            </Alert>

            <Box
              bg="white"
              p={6}
              rounded="lg"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <TextInput 
                onTextChange={handleTextChange}
                onChunkSizeChange={handleChunkSizeChange}
                numParts={chunks.length}
              />
            </Box>

            <Box
              bg="white"
              p={6}
              rounded="lg"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <ChunkDisplay chunks={chunks} />
            </Box>
          </VStack>

          <Box 
            as="footer" 
            textAlign="center"
            py={10}
            color="gray.600"
          >
            <Text>
              ChatGPT Prompt Splitter - Split your large text into manageable chunks for AI chat prompts.
            </Text>
            <Text mt={2}>
              Made with <Text as="span" color="brand.500">❤️</Text> for the AI community
            </Text>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App; 