
const _ = require('lodash');

/**
 * Vanilla Set with a little extra 🔥
 * @namespace SpicySet
 */

/**
 * @method addObject
 * @memberof SpicySet
 * @instance
 * @description Adds Object to the set if not present, returns current set
 * @return {Set}
 */
Set.prototype.addObject = function addObjectToSet(candidate) {
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
Set.prototype.hasObject = function hasObjectInSet(candiate) {
  const matchedObjects = [...this].filter(value => _.isEqual(value, candiate));

  if (!_.isEmpty(matchedObjects)) {
    return true;
  }

  return false;
};

module.exports = (iterable = null) => new Set(iterable);
