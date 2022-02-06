export class Service {
	constructor (config) {
		super(config);
		this.ycb = new ConfigHelper();
		this.name = config?.name;
		this._addConfig(this.ycb, config);
	}

	_addConfig (ycb, config) {
		const name = this.name;
		let configPath = config?.configPath;

		if (!Array.isArray(configPath)) {
			configPath = [configPath];
		}

		configPath.forEach((config) => {
			if (!config || !fs.existsSync(config)) {
				throw new Error(`A valid configPath is required to leverage YCB in service ${name}`)
			}

			const configName = path.basename(config, path.extname(config));
			ycb.addConfig(
				name,
				configName,
				config
			);
		})

	}

	create () {
		throw new Error('create() not implemented');
	}

	read () {
		throw new Error('create() not implemented');
	}

	update () {
		throw new Error('create() not implemented');
	}

	delete () {
		throw new Error('create() not implemented');
	}
}