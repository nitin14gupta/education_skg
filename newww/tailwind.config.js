/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          // Primary Colors
          primary: {
            50: '#EEF2FF',
            100: '#E0E7FF',
            200: '#C7D2FE',
            300: '#A5B4FC',
            400: '#818CF8',
            500: '#4F46E5', // Primary Blue
            600: '#4338CA',
            700: '#3730A3',
            800: '#312E81',
            900: '#1E1B4B',
          },
          secondary: {
            50: '#FAF5FF',
            100: '#F3E8FF',
            200: '#E9D5FF',
            300: '#D8B4FE',
            400: '#C084FC',
            500: '#7C3AED', // Secondary Purple
            600: '#7C2D12',
            700: '#6B21A8',
            800: '#581C87',
            900: '#4C1D95',
          },
          success: {
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            300: '#6EE7B7',
            400: '#34D399',
            500: '#10B981', // Success Green
            600: '#059669',
            700: '#047857',
            800: '#065F46',
            900: '#064E3B',
          },
          warning: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B', // Warning Orange
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
          },
          error: {
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#EF4444', // Error Red
            600: '#DC2626',
            700: '#B91C1C',
            800: '#991B1B',
            900: '#7F1D1D',
          },
          // Neutral Colors
          background: '#FAFAFA',
          card: '#FFFFFF',
          text: {
            primary: '#1F2937',
            secondary: '#6B7280',
          },
          border: {
            light: '#E5E7EB',
            dark: '#D1D5DB',
          },
          // Accent Colors
          gold: '#F59E0B',
          mint: '#34D399',
          coral: '#FB7185',
        },
        fontFamily: {
          'fredoka': ['System'],
          'inter': ['System'],
          'space': ['System'],
        },
        fontSize: {
          'display': '32px',
          'h1': '28px',
          'h2': '24px',
          'h3': '20px',
          'body-lg': '16px',
          'body-md': '14px',
          'body-sm': '12px',
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
        },
        borderRadius: {
          'xl': '12px',
          '2xl': '16px',
          '3xl': '24px',
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: [],
  }