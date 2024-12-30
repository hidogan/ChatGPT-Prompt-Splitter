import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    mono: 'JetBrains Mono, Monaco, Consolas, monospace',
  },
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
            boxShadow: 'sm',
          },
          _active: {
            bg: 'brand.700',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-1px)',
          },
        },
        ghost: {
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'white',
            color: 'gray.900',
            borderWidth: '1px',
            borderColor: 'gray.200',
            _hover: {
              borderColor: 'brand.300',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Textarea: {
      variants: {
        filled: {
          bg: 'white',
          color: 'gray.900',
          borderWidth: '1px',
          borderColor: 'gray.200',
          _hover: {
            borderColor: 'brand.300',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    NumberInput: {
      variants: {
        filled: {
          field: {
            bg: 'white',
            color: 'gray.900',
            borderWidth: '1px',
            borderColor: 'gray.200',
            _hover: {
              borderColor: 'brand.300',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
    },
  },
});

export default theme; 