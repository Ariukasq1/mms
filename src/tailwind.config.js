module.exports = {
  purge: [],
  theme: {
    screens: {
      sm: { min: "320px", max: "639px" },
      md: { min: "640px", max: "767px" },
      lg: { min: "768px", max: "1023px" },
      xl: { min: "1024px", max: "1279px" },
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
    },
    truncate: {
      lines: {
        2: "2",
        3: "3",
        5: "5",
        8: "8",
      },
    },
    extend: {
      screens: {
        "2xl": { min: "1280px", max: "1535px" },
        "3xl": { min: "1536px", max: "1679px" },
        "4xl": { min: "1680px" },
      },
      colors: {
        menuTextColor: "#00498e",
        contact: "#262626",
      },
      spacing: {
        "28": "7rem",
        "29": "9rem",
        "72": "18rem",
        "80": "20rem",
        "86": "38rem",
        "87": "70rem",
        "88": "102rem",
        "89": "130rem",
      },
      height: {
        body: "calc(100vh - 114px)",
      },
    },
  },
  variants: {
    textColor: ["responsive", "focus", "group-hover", "hover", "active"],
  },
  plugins: [require("tailwindcss-truncate-multiline")()],
};
