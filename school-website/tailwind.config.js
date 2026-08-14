/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'general': ['"General Sans"', '"general"', 'sans-serif'],
        'circular-web': ['"circular-web"', 'sans-serif'],
        'circular': ['"circular-web"', 'sans-serif'],
        'robert-medium': ['"robert-medium"', 'sans-serif'],
        'robert-regular': ['"robert-regular"', 'sans-serif'],
        'zentry': ['"zentry"', 'sans-serif'],
        'sekuya': ['"sekuya"', '"Sekuya"', 'cursive'],
        'hero-title': ['"General Sans"', '"general"', 'sans-serif'],
        'hero-subtitle': ['"General Sans"', '"general"', 'sans-serif'],
        'hero-text': ['"General Sans"', '"general"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}