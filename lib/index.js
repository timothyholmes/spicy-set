
const { isEqual, uniqWith } = require('lodash');
const fastStringify = require('fast-stringify');

class SpicySetDef {
  constructor(iterable = []) {
    this.items = SpicySetDef.intializeItems(iterable);
    this.size = this.items.size;
  }

  [Symbol.iterator]() {
    let index = 0;
    const data = [...this.items.values()];

    return {
      next: () => {
        const next = {
          done: data.length === index
        };

        const value = data[index];

        if (value) {
          next.value = value;
        }

        index += 1;

        return next;
      }
    };
  }

  static intializeItems(iterable) {
    const source = new Set(uniqWith([...iterable], isEqual));
    const items = new Map();

    source.forEach((item) => {
      items.set(
        fastStringify(item),
        item
      );
    });

    return items;
  }

  /**
   * @method add
   * @memberof SpicySet
   * @instance
   * @description Adds Object to the set if not present, returns current set
   * @param  {Object} candiate this can be any object
   * @returns {SpicySet}
   */
  add(candidate) {
    if (!this.has(candidate)) {
      this.items.set(
        fastStringify(candidate),
        candidate
      );
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
    return this.items.has(fastStringify(candiate));
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
    this.items.delete(fastStringify(candiate));

    return this;
  }

  /**
   * @description Clear the set
   * @method clear
   * @memberof SpicySet
   * @instance
   * @returns (SpicySet)
   */
  clear() {
    this.items = new Map();
    return this;
  }

  /**
   * @description Loop over each element in the set and execute a callback
   * @method forEach
   * @memberof SpicySet
   * @instance
   * @param {Function} callback
   */
  forEach(callback = () => {}) {
    this.items.forEach((value) => {
      callback(value);
    });
  }

  /**
   * @description Takes in a Set like object, and returns a new set of the difference
   * @method difference
   * @memberof SpicySet
   * @instance
   * @param {object} other some set like object
   * @returns {SpicySet}
   */
  difference(other) {
    const otherSet = new this.constructor([...other]);
    const currentSet = new this.constructor([...this]);
    const response = new this.constructor();

    currentSet.forEach((item) => {
      if (!otherSet.has(item)) {
        response.add(item);
      }
    });

    otherSet.forEach((item) => {
      if (!currentSet.has(item)) {
        response.add(item);
      }
    });

    return response;
  }

  /**
   * @description Takes in a Set like object, and returns a new set of the intersection
   * @method intersection
   * @memberof SpicySet
   * @instance
   * @param {object} other some set like object
   * @returns {SpicySet}
   */
  intersection(other) {
    const otherSet = new this.constructor([...other]);
    const currentSet = new this.constructor([...this]);
    const response = new this.constructor();

    otherSet.forEach((item) => {
      if (currentSet.has(item)) {
        response.add(item);
      }
    });

    return response;
  }

  /**
   * @description Takes in a Set like object, and returns a new set
   * of the symmetric difference
   * @method symmetricDifference
   * @memberof SpicySet
   * @instance
   * @param {object} other some set like object
   * @returns {SpicySet}
   */
  symmetricDifference(other) {
    const otherSet = new this.constructor([...other]);
    const responseSet = new this.constructor([...this]);

    const toRemove = responseSet.intersection(otherSet);

    toRemove.forEach((item) => {
      responseSet.delete(item);
    });

    return responseSet;
  }

  /**
   * @description Takes in a Set like object, determines if the instance
   * is a subset
   * @method isSubsetOf
   * @memberof SpicySet
   * @instance
   * @param {object} other some set like object
   * @returns {boolean}
   */
  isSubsetOf(other) {
    const otherSet = new this.constructor([...other]);

    return [...this.items.values()].every(e => otherSet.has(e));
  }

  /**
   * @description Takes in a Set like object, determines if the instance
   * is a superset
   * @method isSupersetOf
   * @memberof SpicySet
   * @instance
   * @param {object} other some set like object
   * @returns {boolean}
   */
  isSupersetOf(other) {
    return [...other].every(e => this.has(e));
  }


  /**
   * @description Takes in a Set like object, returns a set of the union
   * @method union
   * @memberof SpicySet
   * @instance
   * @param {object} other some set like object
   * @returns {SpicySet}
   */
  union(other) {
    return new this.constructor([...this, ...other]);
  }

  /**
   * @description Takes in a Set like object, determines if the instance
   * is a disjoint
   * @method isDisjointFrom
   * @memberof SpicySet
   * @instance
   * @param {object} other some set like object
   * @returns {boolean}
   */
  isDisjointFrom(other) {
    return [...other].every(e => !this.has(e));
  }

  /**
   * @method keys
   * @memberof SpicySet
   * @instance
   * @returns {Iterator}
   */
  keys() {
    return this.values();
  }


  // /**
  //  * @method values
  //  * @memberof SpicySet
  //  * @instance
  //  * @returns {Iterator}
  //  */
  // values() {
  //   return Iterator.from({
  //     next() {

  //     }
  //   });
  // }


  // /**
  //  * @method entries
  //  * @memberof SpicySet
  //  * @instance
  //  * @returns {Iterator}
  //  */
  // entries() {
  //   return Iterator.from({
  //     next() {

  //     }
  //   });
  // }

  /**
   * @method toSortedArray
   * @memberof SpicySet
   * @instance
   * @returns {SpicySet}
   */
  toSortedArray(cb = (a, b) => a - b) {
    return [...this.items.values()].sort(cb);
  }

  /**
   * @deprecated
   * @method hasObject
   * @memberof SpicySet
   * @instance
   * @returns {SpicySet}
   */
  hasObject(candidate) {
    return this.has(candidate);
  }

  /**
   * @deprecated
   * @method addObject
   * @memberof SpicySet
   * @instance
   * @returns {SpicySet}
   */
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
