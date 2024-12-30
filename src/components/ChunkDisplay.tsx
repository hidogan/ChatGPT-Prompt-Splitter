import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, 
  Button, 
  Text, 
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { TextChunk } from '../types';

interface ChunkDisplayProps {
  chunks: TextChunk[];
}

export const ChunkDisplay: React.FC<ChunkDisplayProps> = ({ chunks }) => {
  const toast = useToast();
  const [expandedChunkId, setExpandedChunkId] = useState<string | null>(null);
  const [copiedChunks, setCopiedChunks] = useState<Set<string>>(new Set());

  const getInstructions = useMemo(() => (partNumber: number) => {
    return partNumber === 1 
      ? "IMPORTANT: Wait for all parts before proceeding!\n\n" +
        "I am about to send you a long message split into multiple parts.\n" +
        "Please follow these rules:\n\n" +
        "1. After each part, only respond with: \"Received part X/Y\"\n" +
        "2. Do not process or analyze anything until you receive all parts\n" +
        "3. Each part will be marked with [START PART X/Y] and [END PART X/Y]\n" +
        "4. Only after you see \"ALL PARTS SENT\" should you process the complete message\n\n" +
        "Let's begin:\n\n"
      : "";
  }, []);

  const copyToClipboard = useCallback(async (chunk: TextChunk) => {
    try {
      const content = getInstructions(chunk.partNumber) + 
        `[START PART ${chunk.partNumber}/${chunk.totalParts}]\n` +
        chunk.text + 
        `\n[END PART ${chunk.partNumber}/${chunk.totalParts}]\n\n` +
        (chunk.partNumber === chunk.totalParts 
          ? "ALL PARTS SENT. Now you can process my complete message." 
          : `Please reply only with: "Received part ${chunk.partNumber}/${chunk.totalParts}"`);

      let copySuccessful = false;

      // Try the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(content);
          copySuccessful = true;
        } catch (clipboardError) {
          console.error('Clipboard API failed:', clipboardError);
          // Fall through to fallback method
        }
      }

      // Fallback method if Clipboard API fails or is not available
      if (!copySuccessful) {
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.cssText = 'position: fixed; top: 0; left: 0; opacity: 0; z-index: -1;';
        document.body.appendChild(textArea);

        try {
          textArea.focus();
          textArea.select();
          copySuccessful = document.execCommand('copy');
        } catch (fallbackError) {
          console.error('Fallback copy failed:', fallbackError);
          throw fallbackError;
        } finally {
          textArea.remove();
        }
      }

      if (!copySuccessful) {
        throw new Error('Both copy methods failed');
      }

      // If we got here, the copy was successful
      setCopiedChunks(prev => new Set(prev).add(chunk.id));
      
      toast({
        title: 'Copied to clipboard!',
        description: `Part ${chunk.partNumber} is ready to paste into ChatGPT`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (err) {
      console.error('Copy operation failed:', err);
      toast({
        title: 'Could not copy to clipboard',
        description: 'Please try selecting and copying the text manually, or check your browser permissions.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [toast, getInstructions]);

  const memoizedChunkButtons = useMemo(() => (
    <Wrap spacing={[2, 3]}>
      {chunks.map((chunk) => (
        <WrapItem key={`button-${chunk.id}`}>
          <Button
            colorScheme={copiedChunks.has(chunk.id) ? "green" : "brand"}
            size="sm"
            onClick={() => copyToClipboard(chunk)}
            _hover={{ transform: 'translateY(-1px)' }}
            transition="all 0.2s"
          >
            Copy Part {chunk.partNumber}
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  ), [chunks, copiedChunks, copyToClipboard]);

  if (chunks.length === 0) {
    return (
      <Text color="gray.500" textAlign="center" py={8}>
        Enter text above to see the chunks
      </Text>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      {memoizedChunkButtons}

      <Box
        maxH="500px"
        overflowY="auto"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
        bg="white"
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            borderRadius: '8px',
            backgroundColor: 'gray.100',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.300',
            borderRadius: '8px',
          },
        }}
      >
        <VStack spacing={4} align="stretch" p={4}>
          {chunks.map((chunk) => (
            <Box
              key={chunk.id}
              p={4}
              bg="gray.50"
              borderRadius="md"
              position="relative"
              cursor="pointer"
              onClick={() => setExpandedChunkId(expandedChunkId === chunk.id ? null : chunk.id)}
              _hover={{
                bg: 'gray.100',
              }}
            >
              <Text
                fontSize="sm"
                color="gray.600"
                mb={2}
              >
                Part {chunk.partNumber} ({chunk.text.length.toLocaleString()} characters)
              </Text>
              <Text
                whiteSpace="pre-wrap"
                fontSize="sm"
                color="gray.800"
                noOfLines={expandedChunkId === chunk.id ? undefined : 3}
              >
                {chunk.text}
              </Text>
              {chunk.text.split('\n').length > 3 && expandedChunkId !== chunk.id && (
                <Text
                  fontSize="sm"
                  color="brand.500"
                  mt={2}
                >
                  Click to expand...
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default ChunkDisplay; 