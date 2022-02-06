export default [
	{
		settings: ['master'],
		defaults: {
			host: 'akabab.github.io',
			roHost: 'akabab.github.io',
			protocol: 'https',
			timeout: 5000,
			pathPrefix: '/starwars-api/api',
			credentials: 'include'
		},
		resources: {
			'starwars.getCharacters': {
				path: '/all.json',
				params: {},
				query: []
			}
		}
	}
];