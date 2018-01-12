class EnvSelector {
  setParams(params) {
    this._prodObj = require(params.prodPath);
    this._devObj = require(params.devPath);
  }

  getData(key) {
    const currentEnv = process.env.NODE_ENV || 'development';
    const dataObject = currentEnv === 'production' ? this._prodObj : this._devObj;

    return dataObject[key];
  }
}

module.exports = new EnvSelector();
