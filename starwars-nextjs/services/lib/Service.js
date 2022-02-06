import fs from 'fs';
import path from 'path';
import ConfigHelper from 'ycb-config';

export class Service {
	constructor (config) {
		this.ycb = this._createYcb(config);
		this.name = config?.name;
		this.complete = this._addConfig(this.ycb, config);
	}

	_createYcb (config) {
		const name = this.name;
		let dimensionsPath = config?.ycb?.dimensionsPath;

		if (!dimensionsPath) {
			dimensionsPath = `${path.resolve(process.cwd(), 'services')}/configs/dimensions.json`
		} else if (!fs.existsSync(dimensionsPath)) {
			throw new Error(`An invalid dimensionsPath was passed in for service ${name}`);
		}

		return new ConfigHelper({
			dimensionsPath
		});
	}

	async _addConfig (ycb, config) {
		const name = this.name;
		let configPath = config?.ycb?.configPath;

		if (!Array.isArray(configPath)) {
			configPath = [configPath];
		}

		console.log('configPath', configPath);
		
		await Promise.all(configPath.map(async (config) => {
			console.log('config', config);
			if (!config || !fs.existsSync(config)) {
				throw new Error(`A valid configPath is required to leverage YCB in service ${name}`);
			}

			const configName = path.basename(config, path.extname(config));

			console.table([{
				name,
				configName,
				config
			}]);

			await ycb.promises.addConfig(
				name,
				configName,
				config
			);
		}));
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

export default Service;