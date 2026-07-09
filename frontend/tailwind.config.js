/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2937",
        night: "#1B2A4A",
        night2: "#233B63",
        paper: "#F7F5F0",
        coral: "#FF6B4A",
        coralDark: "#E4522F",
        mint: "#2EC4B6",
        mintDark: "#1FA294",
        gold: "#FFC145",
        violet: "#7C5CFC",
        violetDark: "#6440E0",
      },
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        pop: "0 4px 0 rgba(0,0,0,0.15)",
        popSm: "0 2px 0 rgba(0,0,0,0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
