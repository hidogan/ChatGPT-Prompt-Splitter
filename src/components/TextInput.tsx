import React, { useState } from 'react';
import { 
  Box, 
  Textarea, 
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

interface TextInputProps {
  onTextChange: (text: string) => void;
  onChunkSizeChange: (size: number) => void;
  numParts: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  onTextChange,
  onChunkSizeChange,
  numParts,
}) => {
  const [text, setText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const handleChunkSizeChange = (valueString: string) => {
    const size = parseInt(valueString);
    if (!isNaN(size)) {
      onChunkSizeChange(size);
    }
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.300')}>
          Input Text
        </Text>
        <FormControl maxW="200px">
          <HStack spacing={3} align="center">
            <FormLabel mb={0} color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
              Chunk Size:
            </FormLabel>
            <NumberInput
              defaultValue={15000}
              min={1000}
              max={50000}
              step={1000}
              onChange={handleChunkSizeChange}
              size="sm"
            >
              <NumberInputField borderRadius="md" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </FormControl>
      </HStack>

      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your text here..."
        size="lg"
        minH="300px"
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        borderRadius="lg"
        _hover={{
          borderColor: useColorModeValue('gray.300', 'gray.500'),
        }}
        _focus={{
          borderColor: 'brand.500',
          boxShadow: `0 0 0 1px ${useColorModeValue('brand.500', 'brand.400')}`,
        }}
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            borderRadius: '8px',
            backgroundColor: useColorModeValue('gray.100', 'gray.700'),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: useColorModeValue('gray.300', 'gray.600'),
            borderRadius: '8px',
          },
        }}
      />

      {numParts > 0 && (
        <Text 
          mt={2} 
          fontSize="sm" 
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Text will be split into {numParts} parts
        </Text>
      )}
    </Box>
  );
};

export default TextInput; 