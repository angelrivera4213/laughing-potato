module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                'starwars-icon': "url('/img/starwars-icons.png')"
            },
            backgroundSize: {
                'starwars-icon': '1000% 200%'
            },
            backgroundPosition: {
                'databank-icon': '77.77778% 0%'
            },
            width: {
                'starwars-icon': '1.7rem'
            },
            height: {
                'starwars-icon': '1.7rem'
            },
            margin: {
                'starwars-icon': '-1.7em -0.2em -0.5em -0.5em',
            },
            colors: {
                'burnt-red': '#9e4f60'
            },
            fontFamily: {
                sans: [
                    'Roboto',
                    'sans-serif'
                ]
            },
        }
    },
    plugins: []
}
