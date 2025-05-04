export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    // Borders & Colors
    'border-green-500',
    'border-red-500',
    'border-yellow-500',
    'border-blue-500',
    'border-4',
    'text-green-700',
    'text-red-700',
    'text-yellow-700',
    'text-blue-700',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-gray-500',
    'bg-white',
    'bg-black/70',
    'hover:bg-green-700',
    'hover:bg-red-700',
    'hover:bg-yellow-700',
    'hover:bg-blue-700',
    'hover:bg-gray-700',

    // Text & Font
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-black',
    'font-bold',
    'font-normal',

    // Spacing
    'px-6',
    'py-2',
    'py-5',
    'mx-2',
    'mt-5',
    'gap-4',

    // Layout & Flex
    'fixed',
    'inset-0',
    'flex',
    'items-center',
    'justify-center',
    'relative',
    'text-center',

    // Sizing
    'max-h-[90vh]',
    'overflow-y-auto',
    'rounded-xl',
    'rounded-lg',
    'size-5',

    // Positioning
    'absolute',
    'top-1',
    'right-1',

    // Effects & States
    'shadow-lg',
    'cursor-pointer',
    'focus:ring-1',
    'focus:ring-black',
    'focus:outline-none',

    // Accessibility - screen reader only
    'sr-only',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
