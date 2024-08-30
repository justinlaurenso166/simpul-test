/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          blue: "#2F80ED",
          gray: {
            dark: "#4F4F4F",
            normal: "#828282",
            light: "#E0E0E0",
          },
        },
        indicator: {
          orange: "#F8B76B",
          purple: "#8785FF",
          red: "#EB5757",
          yellow: "#F2C94C",
        },
        chats: {
          orange: {
            light: "#FCEED3",
            normal: "#E5A443",
          },
          purple: {
            light: "#EEDCFF",
            normal: "#9B51E0",
          },
          green: {
            light: "#D2F2EA",
            normal: "#43B78D",
          }
        },
        stickers: {
          E9F3FF: "#E9F3FF",
          FDCFA4: "#FDCFA4",
          F9E9C3: "#F9E9C3",
          AFEBDB: "#AFEBDB",
          CBF1C2: '#CBF1C2',
          CFCEF9: "#CFCEF9",
          F9E0FD: "#F9E0FD",
        },
        light: "#F2F2F2",
      },
      boxShadow: {
        lightShadow: '0 4px 4px 0 rgba(0,0,0,0.1)'
      },
      fontFamily: {
        lato: "'Lato', sans-serif",
      },
    },
  },
  plugins: [nextui()],
};
