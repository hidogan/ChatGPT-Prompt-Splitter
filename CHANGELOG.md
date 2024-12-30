# Changelog
All notable changes to the ChatGPT Prompt Splitter project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-03-20
### Added
- Initial project setup using Create React App with TypeScript
- Core text splitting functionality with word boundary preservation
- Basic UI components:
  - Text input area with character count
  - Configurable chunk size selector (1000-15000 characters)
  - Chunk display with copy-to-clipboard functionality
- Type definitions for TextChunk and SplitterConfig
- Integration with Chakra UI for styling
- Responsive layout with container constraints
- Toast notifications for clipboard operations

### Technical Details
- Created core utility class `TextSplitter` for text processing
- Implemented main components:
  - TextInput.tsx
  - ChunkDisplay.tsx
- Set up basic state management using React hooks
- Added TypeScript interfaces for type safety 