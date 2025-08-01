export default {
  content: [
    "./src/pages/*/.{js,ts,jsx,tsx,mdx}",
    "./src/components/*/.{js,ts,jsx,tsx,mdx}",
    "./src/app/*/.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
