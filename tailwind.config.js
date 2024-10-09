/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: { max: "440px" },
        lsm: { max: "640px" },
      },
    },
  },
  plugins: [],
};
