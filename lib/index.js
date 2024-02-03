
const { isEqual, uniqWith } = require('lodash');

class SpicySetDef {
  constructor(iterable = []) {
    this.items = uniqWith([...iterable], isEqual);
    this.size = this.items.length;
  }

  /**
   * @method add
   * @memberof SpicySet
   * @instance
   * @description Adds Object to the set if not present, returns current set
   * @param  {Object} candiate this can be any object
   * @return {Set}
   */
  add(candidate) {
    if (!this.has(candidate)) {
      this.items.push(candidate);
    }

    return this;
  }

  /**
   * @method has
   * @memberof SpicySet
   * @instance
   * @description Checks if object exists in set based on object content
   * @param  {Object} candiate this can be any object
   * @return {boolean}
   */
  has(candiate) {
    const match = this.items.some(value => isEqual(value, candiate));

    return match;
  }

  /**
   * @method delete
   * @memberof SpicySet
   * @instance
   * @description Removes an object from the set
   * @param  {Object} candiate this can be any object
   * @return {boolean}
   */
  delete(candiate) {
    const match = this.items.findIndex(value => isEqual(value, candiate));

    this.items.splice(match, 1);

    return this;
  }

  clear() {
    this.items = [];
    return this;
  }

  forEach(callback = () => {}) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.items) {
      callback(item);
    }
  }

  toSortedArray(cb = (a, b) => a - b) {
    return this.items.sort(cb);
  }

  hasObject(candidate) {
    return this.has(candidate);
  }

  addObject(candidate) {
    return this.add(candidate);
  }
}

/**
 * Vanilla Set with a little extra 🔥
 * @namespace SpicySet
 */
function SpicySet(iterable = []) {
  return new SpicySetDef(iterable);
}

module.exports = SpicySet;
