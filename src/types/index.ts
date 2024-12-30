export interface TextChunk {
  id: string;
  text: string;
  partNumber: number;
  totalParts: number;
}

export interface SplitterConfig {
  maxChunkSize: number;
  preserveWords: boolean;
} 