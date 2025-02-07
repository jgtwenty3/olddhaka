import type { Config } from "tailwindcss";
import fluid, { extract, screens, fontSize, FluidThemeConfig } from 'fluid-tailwind'


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fluid: (({ theme }) => ({
      defaultScreens: ["20rem", theme("screens.lg")],
    })) satisfies FluidThemeConfig,
    extend: {
      fontFamily: {
        
        itcbenguiat: ['"ITCBenguiatStdBoldCn"', 'sans-serif'], 

      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: "#032C1F",
        cream:"#e1e1cf"
      },
    },
  },
  plugins: [],
} satisfies Config;
