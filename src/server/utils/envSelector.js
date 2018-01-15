class EnvSelector {
  constructor() {
    this._data = {};
  }

  setParams(params) {
    if (typeof params === 'object') {
      Object.keys(params).map((key) => {
        this._data[key] = require(params[key]);
      });
    }
  }

  getData(key) {
    const currentEnv = process.env.NODE_ENV || 'development';
    const dataObject = this._data[currentEnv];

    return dataObject[key];
  }
}

export default new EnvSelector();
// module.exports = new EnvSelector();
