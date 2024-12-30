import React from 'react';
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Button,
} from '@chakra-ui/react';

interface ChunkSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  onRefresh: () => void;
}

export const ChunkSizeSelector: React.FC<ChunkSizeSelectorProps> = ({ value, onChange, onRefresh }) => {
  const handleChange = (valueString: string) => {
    onChange(parseInt(valueString));
  };

  return (
    <Box>
      <Text mb={2}>Maximum chunk size:</Text>
      <HStack>
        <NumberInput
          value={value}
          onChange={handleChange}
          min={1000}
          max={15000}
          step={1000}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          size="md"
          colorScheme="blue"
          onClick={onRefresh}
        >
          ↻ Update
        </Button>
      </HStack>
    </Box>
  );
};

export default ChunkSizeSelector; 