module.exports = {
    content: ["./src/**/*.{html,js}", "./dist/*.html"],
    theme: {
        colors: {
            "kakampink-bg": "#ffe4f3",
            "kakampink-fg": "#be1f77",
            "kakampink-fg2": "bE558f"
        },
        fontFamily: {
            sans: ['Montserrat', 'Verdana', 'sans-serif']
        },
        extend: {
            spacing: {
                "128": "32rem"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('daisyui')
    ],
    daisyui: {
        themes: [
            {
                kkp: {
                    primary: "#be1f77",
                    secondary: "#bE558f",
                    netural: "#ffe4f3",
                    whitest: "#ffffff",
                    "--btn-text-case": "none"
                }
            }
        ]
    }
  }