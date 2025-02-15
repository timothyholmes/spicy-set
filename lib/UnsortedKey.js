module.exports = class Key {
  constructor(obj) {
    this.target = {};
    this.keys = Object.keys(obj);
    this.keys.sort();

    for (let i = 0; i < this.keys.length; i += 1) {
      this.target[this.keys[i]] = obj[this.keys[i]];
    }
  }
};
