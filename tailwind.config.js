module.exports = {
    content: ["./src/**/*.{html,js}", "./dist/*.html"],
    theme: {
        fontFamily: {
            sans: ['Montserrat', 'Verdana', 'sans-serif']
        },
        extend: {
            colors: {
                "kakampink-bg": "#ffe4f3",
                "kakampink-bg2": "#ff8c9d",
                "kakampink-fg": "#be1f77",
                "kakampink-fg2": "#bE558f",
                "kakampink-fg3": "#ffbbce",
                "kakampink-fg4": "#e72792",
                "kakampink-accent": "#b5d7ac",
                "kakampink-accent2": "#e72792",
                "kakampink-accent3": "#a4e393",
                "kakampink-accent4": "#58a371"
            },
            boxShadow: {
                "flat1": "4px 4px 0 #ff8c9d",
                "flat2": "4px 4px 0 #ffbbce",
                "flat3": "4px 4px 0 #cd2e6c",
                "flat4": "4px 4px 0 #c63671"
            },
            spacing: {
                "128": "32rem"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
}