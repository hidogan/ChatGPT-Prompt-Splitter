import React from 'react';
import {
  Button,
  HStack,
} from '@chakra-ui/react';

interface SplitControlsProps {
  onSplit: () => void;
  onClear: () => void;
  isDisabled: boolean;
}

export const SplitControls: React.FC<SplitControlsProps> = ({ onSplit, onClear, isDisabled }) => {
  return (
    <HStack spacing={4} mb={4}>
      <Button
        colorScheme="blue"
        onClick={onSplit}
        isDisabled={isDisabled}
      >
        Split Text
      </Button>
      <Button
        variant="outline"
        onClick={onClear}
      >
        Clear
      </Button>
    </HStack>
  );
};

export default SplitControls; 