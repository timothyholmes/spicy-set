
const { isEqual, isEmpty, uniqWith } = require('lodash');

/**
 * Vanilla Set with a little extra 🔥
 * @namespace SpicySet
 */
function SpicySet(iterable = []) {
  return new Set(uniqWith([...iterable], isEqual));
}

/**
 * @method addObject
 * @memberof SpicySet
 * @instance
 * @description Adds Object to the set if not present, returns current set
 * @param  {Object} candiate this can be any object
 * @return {Set}
 */
Set.prototype.addObject = function addObject(candidate) {
  if (!this.hasObject(candidate)) {
    this.add(candidate);
  }

  return this;
};

/**
 * @method hasObject
 * @memberof SpicySet
 * @instance
 * @description Checks if object exists in set based on object content
 * @param  {Object} candiate this can be any object
 * @return {boolean}
 */
Set.prototype.hasObject = function hasObject(candiate) {
  const matchedObjects = [...this].filter(value => isEqual(value, candiate));

  if (!isEmpty(matchedObjects)) {
    return true;
  }

  return false;
};

/**
 * @method toSortedArray
 * @memberof SpicySet
 * @instance
 * @description Returns array of sorted set values
 * @param  {Function} [cb=(a,b)=>a-b] sorting callback
 * @return {Array.<*>}
 */
Set.prototype.toSortedArray = function toSortedArray(cb = (a, b) => a - b) {
  return [...this].sort(cb);
};

module.exports = SpicySet;
