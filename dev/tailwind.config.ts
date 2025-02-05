import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-nav": "#303131",
        "black-bg": "#3C3A3A",
        "black-secondary-bg": "#414141",
        "black-tertiery-bg": "#545353",
        "menu-transparent-black": "rgba(0,0,0,0.42)",
        "blue-button": "#1B93FF",
        "blue-button-hover": "#0077CC",
        "blue-button-disabled": "#2566a1",
        "blue-links": "#1993BE",
        "move-input": "#49454F",
        "gray-input": "#999",
        "gray-icons": "#B3B3B3",
        "menu-transparent-gray": "rgba(179,179,179,0.40)",
        "red-error": "#FF6F61",
        "red-error-hover": "#FF4C4C",
      },
      spacing: {
        "dashNav-h": "70px",
        "dash-side-bar-w": "var(--dash-side-bar-w)",
        "shop-now-side-nav-w": "240px",
        "nav-h": "var(--nav-h)",
      },
    },
  },
};
export default config;
