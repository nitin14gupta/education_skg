/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./App.tsx", "./src/app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          'passion-red': '#E63946',
          'vibrant-coral': '#F3722C', 
          'soft-cream': '#FFF9F7',
          'deep-charcoal': '#222222',
          'dark-slate': '#2B2D42',
          'medium-gray': '#6C757D',
          'heart-pink': '#FF6B81',
          'light-gray': '#D3D3D3'
        },
        fontFamily: {
          poppins: ['Poppins_400Regular', 'Poppins_500Medium', 'Poppins_600SemiBold', 'Poppins_700Bold'],
          inter: ['Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold'],
          dancing: ['DancingScript_400Regular', 'DancingScript_700Bold'],
          outfit: ['Outfit-Regular', 'Outfit-Medium', 'Outfit-SemiBold', 'Outfit-Bold'],
          sora: ['Sora-Regular', 'Sora-SemiBold', 'Sora-Bold'],
          vibes: ['GreatVibes-Regular'],
        },
      },
    },
    plugins: [],
  }
  