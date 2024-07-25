/* eslint-disable no-undef */

const _ = require('lodash');
const should = require('should');
const SpicySet = require('../lib/index');
const Sinon = require('sinon');

// test data
const futureSoloAlbums = {
  beastMode: true,
  fiftySixNights: true,
  monster: true,
  WATTBA: false,
  superSlimey: false
};

const youngThugSoloAlbums = {
  slimeSeasonOne: true,
  barterSix: true,
  superSlimey: false,
  easyBreezy: true
};

describe('Spicy Set', () => {
  describe('Constructor', () => {
    it('should return a set when called with no arguments', (done) => {
      const setWithoutArguments = new SpicySet();

      should(setWithoutArguments).be.type('object');

      done();
    });
    it('should return a set when called with an array', (done) => {
      const setWithIterable = new SpicySet([
        futureSoloAlbums,
        youngThugSoloAlbums,
        _.cloneDeep(futureSoloAlbums)
      ]);

      should(setWithIterable).be.type('object');

      should(setWithIterable.has(futureSoloAlbums)).equal(true);
      should(setWithIterable.has(youngThugSoloAlbums)).equal(true);
      should(setWithIterable.size).equal(2);

      done();
    });
    it('should return a set when called with an iterable', (done) => {
      const vanillaSetWithIterable = new Set([
        futureSoloAlbums,
        youngThugSoloAlbums,
        _.cloneDeep(futureSoloAlbums)
      ]);

      const spicySetWithIterable = new SpicySet(vanillaSetWithIterable);

      should(spicySetWithIterable).be.type('object');

      should(spicySetWithIterable.has(futureSoloAlbums)).equal(true);
      should(spicySetWithIterable.has(youngThugSoloAlbums)).equal(true);
      should(spicySetWithIterable.size).equal(2);

      done();
    });
  });

  describe('has', () => {
    it('should return true if object with same content is in set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));

      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(true);

      done();
    });
    it('should return false if object is not in set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));

      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(true);
      should(set.hasObject(youngThugSoloAlbums)).equal(false);
      should(set.has(youngThugSoloAlbums)).equal(false);

      done();
    });
  });

  describe('add', () => {
    it('should add the object if not present and return the set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));

      // check the inventory before we add to it
      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(true);
      should(set.hasObject(youngThugSoloAlbums)).equal(false);
      should(set.has(youngThugSoloAlbums)).equal(false);

      // add the object to the set and check the inventory
      should(set.addObject(_.cloneDeep(youngThugSoloAlbums))).equal(set);
      should(set.hasObject(youngThugSoloAlbums)).equal(true);
      should(set.has(youngThugSoloAlbums)).equal(true);

      done();
    });
    it('should not add the object if already present and return the set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      should(set.hasObject(futureSoloAlbums)).equal(true);
      should(set.has(futureSoloAlbums)).equal(true);
      should(set.hasObject(youngThugSoloAlbums)).equal(true);
      should(set.has(youngThugSoloAlbums)).equal(true);

      // add the object to the set and check the inventory
      should(set.addObject(_.cloneDeep(youngThugSoloAlbums))).equal(set);
      should(set.hasObject(youngThugSoloAlbums)).equal(true);
      should(set.has(youngThugSoloAlbums)).equal(true);

      done();
    });
  });

  describe('delete', () => {
    it('should remove an object from the set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));

      should(set.has(futureSoloAlbums)).equal(true);
      should(set.delete(_.cloneDeep(futureSoloAlbums))).equal(set);
      should(set.has(futureSoloAlbums)).equal(false);

      done();
    });
  });

  describe('clear', () => {
    it('should empty from the set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      should(set.clear()).equal(set);

      should(set.has(futureSoloAlbums)).equal(false);
      should(set.has(youngThugSoloAlbums)).equal(false);

      done();
    });
  });

  describe('forEach', () => {
    it('should remove an object from the set', (done) => {
      const set = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      const stub = Sinon.stub();

      set.forEach(stub);

      should(stub.calledTwice).equal(true);

      done();
    });
  });

  describe('difference', () => {
    it('should find the difference between incoming set', (done) => {
      const set = new SpicySet();
      const set2 = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      const difference = set.difference(set2);

      should(difference.has(futureSoloAlbums)).equal(false);
      should(difference.has(youngThugSoloAlbums)).equal(true);

      done();
    });
    it('should find the difference between incoming set-like object', (done) => {
      const set = new SpicySet();
      const set2 = [];

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.push(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      const difference = set.difference(set2);

      should(difference.has(futureSoloAlbums)).equal(false);
      should(difference.has(youngThugSoloAlbums)).equal(true);

      done();
    });
  });

  describe('symmetricDifference', () => {
    it('should find the symmetricDifference between incoming set', (done) => {
      const set = new SpicySet();
      const set2 = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      const symmetricDifference = set.symmetricDifference(set2);

      should(symmetricDifference.has(futureSoloAlbums)).equal(false);
      should(symmetricDifference.has(youngThugSoloAlbums)).equal(true);

      done();
    });
    it('should find the symmetricDifference between incoming set-like object', (done) => {
      const set = new SpicySet();
      const set2 = [];

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.push(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      const symmetricDifference = set.symmetricDifference(set2);

      should(symmetricDifference.has(futureSoloAlbums)).equal(false);
      should(symmetricDifference.has(youngThugSoloAlbums)).equal(true);

      done();
    });
  });

  describe('intersection', () => {
    it('should find the intersection between incoming set', (done) => {
      const set = new SpicySet();
      const set2 = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      const intersection = set.intersection(set2);

      should(intersection.has(futureSoloAlbums)).equal(true);
      should(intersection.has(youngThugSoloAlbums)).equal(false);

      done();
    });
    it('should find the intersection between incoming set-like object', (done) => {
      const set = new SpicySet();
      const set2 = [];

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.push(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      const intersection = set.intersection(set2);

      should(intersection.has(futureSoloAlbums)).equal(true);
      should(intersection.has(youngThugSoloAlbums)).equal(false);

      done();
    });
  });

  describe('isSubsetOf', () => {
    it('should determine if the incoming set is a subset', (done) => {
      const set = new SpicySet();
      const set2 = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      should(set.isSubsetOf(set2)).equal(false);
      should(set2.isSubsetOf(set)).equal(true);

      done();
    });
  });

  describe('isSupersetOf', () => {
    it('should determine if the incoming set is a superset', (done) => {
      const set = new SpicySet();
      const set2 = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      should(set.isSupersetOf(set2)).equal(true);
      should(set2.isSupersetOf(set)).equal(false);

      done();
    });
  });

  describe('isDisjointFrom', () => {
    it('should determine if the incoming set is disjoint', (done) => {
      const set = new SpicySet();
      const set2 = new SpicySet();

      set2.add(_.cloneDeep(futureSoloAlbums));
      set.add(_.cloneDeep(youngThugSoloAlbums));

      should(set.isDisjointFrom(set2)).equal(true);
      should(set2.isDisjointFrom(set)).equal(true);

      set.add(_.cloneDeep(futureSoloAlbums));

      should(set.isDisjointFrom(set2)).equal(false);
      should(set2.isDisjointFrom(set)).equal(false);

      done();
    });
  });

  describe('union', () => {
    it('should return a union of the Sets', (done) => {
      const set = new SpicySet();
      const set2 = new SpicySet();

      set.add(_.cloneDeep(futureSoloAlbums));
      set2.add(_.cloneDeep(youngThugSoloAlbums));

      const union = set.union(set2);

      should(union.has(futureSoloAlbums)).equal(true);
      should(union.has(youngThugSoloAlbums)).equal(true);

      done();
    });
  });


  describe('sort', () => {
    it('should sort the set based on callback', (done) => {
      const set = new SpicySet([4, 1, 3, 2, 4, 3, 1]);

      should(set.toSortedArray()).deepEqual([1, 2, 3, 4]);
      should(set.toSortedArray((a, b) => b - a)).deepEqual([4, 3, 2, 1]);

      done();
    });
  });

  describe('iterator', () => {
    it('should iterate with for...of', (done) => {
      const set = new SpicySet([4, 1, 3, 2, 4, 3, 1]);
      const resultSet = new Set();

      // eslint-disable-next-line no-restricted-syntax
      for (const s of set) {
        should(resultSet.has(s)).equal(false);
        should(set.has(s)).equal(true);
        resultSet.add(s);
      }

      should(set.size).equal(resultSet.size);

      done();
    });
  });

  describe('entries', () => {
    it('should iterate with for...of', (done) => {
      const set = new SpicySet([4, 1, 3, 2, 4, 3, 1]);
      const resultSet = new Set();

      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of set.entries()) {
        should(JSON.parse(key)).deepEqual(value);
        should(resultSet.has(value)).equal(false);
        should(set.has(value)).equal(true);
        resultSet.add(value);
      }

      should(set.size).equal(resultSet.size);

      done();
    });
  });

  describe('values', () => {
    it('should iterate with for...of', (done) => {
      const set = new SpicySet([4, 1, 3, 2, 4, 3, 1]);
      const resultSet = new Set();

      // eslint-disable-next-line no-restricted-syntax
      for (const value of set.values()) {
        should(resultSet.has(value)).equal(false);
        should(set.has(value)).equal(true);
        resultSet.add(value);
      }

      should(set.size).equal(resultSet.size);

      done();
    });
  });
});
