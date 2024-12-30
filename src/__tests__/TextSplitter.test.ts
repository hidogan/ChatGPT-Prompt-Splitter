import { TextSplitter } from '../utils/textSplitter';

describe('TextSplitter', () => {
  it('should split text into chunks of specified size', async () => {
    const text = 'This is a test text that needs to be split into chunks';
    const chunks = await TextSplitter.splitText(text, { maxChunkSize: 10 });
    expect(chunks.length).toBeGreaterThan(0);
    expect(Math.max(...chunks.map(c => c.text.length))).toBeLessThanOrEqual(10);
  });

  it('should preserve words by default', async () => {
    const text = 'This is a test';
    const chunks = await TextSplitter.splitText(text, { maxChunkSize: 7 });
    expect(chunks[0].text).toBe('This is');
  });

  it('should handle empty text', async () => {
    const text = '';
    const chunks = await TextSplitter.splitText(text, { maxChunkSize: 10 });
    expect(chunks.length).toBe(0);
  });

  it('should handle text smaller than chunk size', async () => {
    const text = 'Small text';
    const chunks = await TextSplitter.splitText(text, { maxChunkSize: 20 });
    expect(chunks.length).toBe(1);
    expect(chunks[0].text).toBe(text);
  });
}); 