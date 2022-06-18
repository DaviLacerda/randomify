module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    "default": "#F7D633",
                },
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};
