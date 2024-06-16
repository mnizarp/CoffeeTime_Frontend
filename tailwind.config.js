/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'greenbackground':"url('/coffee green background.webp')",
        'aboutus':"url('/about_us_image.jpg')"
        
      }
    },
  },
  plugins: [],
}