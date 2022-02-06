import path from 'path';
import BaseService from './lib/BaseService';

export default new BaseService({
	name: 'starwars',
	ycb: {
		configPath: `${path.resolve(process.cwd(), 'services')}/configs/starwars.json`
	}
});