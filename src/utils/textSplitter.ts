import { TextChunk } from '../types';

interface SplitConfig {
  maxChunkSize: number;
  preserveWords?: boolean;
}

export class TextSplitter {
  private static readonly PROCESSING_CHUNK_SIZE = 50000; // Process text in 50KB chunks

  static async splitText(text: string, config: SplitConfig): Promise<TextChunk[]> {
    if (!text) return [];

    const { maxChunkSize, preserveWords = true } = config;
    const chunks: TextChunk[] = [];
    const totalParts = Math.ceil(text.length / maxChunkSize);
    let currentPosition = 0;
    let partNumber = 1;

    while (currentPosition < text.length) {
      // Process text in smaller chunks to prevent UI freezing
      const endPosition = Math.min(
        currentPosition + this.PROCESSING_CHUNK_SIZE,
        text.length
      );
      
      let chunkSize = Math.min(maxChunkSize, endPosition - currentPosition);

      if (preserveWords && chunkSize < (endPosition - currentPosition)) {
        // Optimize word boundary search
        const textSlice = text.slice(currentPosition, currentPosition + chunkSize + 10);
        const lastSpaceIndex = textSlice.lastIndexOf(' ');
        if (lastSpaceIndex > 0) {
          chunkSize = lastSpaceIndex;
        }
      }

      const chunkText = text.slice(currentPosition, currentPosition + chunkSize).trim();
      
      if (chunkText) {
        chunks.push({
          id: `chunk-${partNumber}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          text: chunkText,
          partNumber,
          totalParts
        });
        partNumber++;
      }

      currentPosition += chunkSize;
      
      // Allow UI to update between processing chunks
      if (currentPosition < text.length) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }

    return chunks;
  }

  // Helper method to estimate processing time
  static estimateProcessingTime(textLength: number): number {
    const CHARS_PER_MS = 5000; // Estimated processing speed
    return Math.ceil(textLength / CHARS_PER_MS);
  }
}

export const splitText = async (text: string, maxChunkSize: number): Promise<TextChunk[]> => {
  return TextSplitter.splitText(text, {
    maxChunkSize,
    preserveWords: true
  });
}; 