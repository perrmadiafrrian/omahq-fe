module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        half: "50vh",
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        half: "50vh",
      },
      maxWidth: {
        10: "10rem",
      },
      padding: {
        100: "30rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      filter: ["hover", "focus"],
      fontSize: ["hover", "focus"],
    },
  },
  plugins: [],
};
