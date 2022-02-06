import fs from 'fs';
import path from 'path';
import Service from './Service';
import ConfigHelper from 'ycb-config';
import pick from 'lodash.pick';
import rest from './rest';
import sub from '../../lib/sub';

const RO_HOST_KEY = 'roHost';
const methodHostTypeOverride = {
	'GET': RO_HOST_KEY
};

export class BaseService extends Service {
	async crud (type, resource, params, body, configs) {
		const configName = resource.split('.')[0];
		let configData = await this.ycb.promises.read(this.name, configName, req.context);
		let resourceData = configData?.resources?.[resource];

		if (!resourceData) {
			throw new Error(`Resource ${resource} does not exist`);
		}

		const resourceConfig = Object.assign({}, configData.defaults, resourceData);
		const hostType = methodHostTypeOverride[type] || 'host';
		consht url = {
			protocol: resourceConfig.protocol,
			host: resourceConfig[hostType],
			path: (resourceConfig.pathPrefix || '') + sub(resourceConfig.path, params),
			query: pick(
				Object.assign({}, params, resourceConfig.params),
				[].concat(resourceConfig.query)
			)
		};
		const headers = Object.assign({}, resourceConfig.headers);

		return await rest(url, method, headers, body, resourceConfig);
	}

	async create (req, resource, params, body, configs) {
		return await this.crud('POST', req, resource, params, body, configs);
	}

	async read () {
		return await this.crud('GET', req, resource, params, null, configs);
	}

	async update () {
		return await this.crud('PUT', req, resource, params, body, configs);
	}

	async delete () {
		return await this.crud('DELETE', req, resource, params, null, configs);
	}
}