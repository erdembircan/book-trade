import envSelector from '../../../src/server/utils/envSelector';
import otherEnvSelector from '../../../src/server/utils/envSelector';
import devConfig from './devMock';
import prodConfig from './prodMock';
import path from 'path';

describe('envSelector', () => {
  it('should be a singleton, and return correct value depends on enviroment', () => {
    const devPath = path.resolve(__dirname, './devMock.js');
    const prodPath = path.resolve(__dirname, './prodMock.js');
    envSelector.setParams({ development: devPath, production: prodPath });

    process.env.NODE_ENV = 'development';

    expect(envSelector.getData('test')).toBe(otherEnvSelector.getData('test'));

    expect(envSelector.getData('test')).toBe(devConfig.test);

    process.env.NODE_ENV = 'production';
    expect(envSelector.getData('test')).toBe(prodConfig.test);
  });
});
