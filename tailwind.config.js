module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg)',
        green: 'var(--color-green)',
        opGreen: 'var(--color-green-opacity)',
        altGreen: 'var(--color-green-alt)',
      },
      textColor: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        green: 'var(--color-green)',
        altGreen: 'var(--color-green-alt)',
      },
      borderColor: {
        primary: 'var(--color-border-primary)',
        green: 'var(--color-green)',
        altGreen: 'var(--color-green-alt)',
      },
      minHeight: {
        main: 'calc(100vh - 48px - 48px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
