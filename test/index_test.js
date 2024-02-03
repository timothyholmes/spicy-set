
const _ = require('lodash');
const Lab = require('lab');
const should = require('should');
const SpicySet = require('../lib/index');
const Sinon = require('sinon');

exports.lab = Lab.script();
const lab = exports.lab;
const describe = lab.describe;
const it = lab.it;

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
  describe('hasObject', () => {
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
  describe('addObject', () => {
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

      // check the inventory before we add to it
      should(set.has(futureSoloAlbums)).equal(true);

      // add the object to the set and check the inventory
      should(set.delete(_.cloneDeep(futureSoloAlbums))).equal(set);
      should(set.hasObject(futureSoloAlbums)).equal(false);
      should(set.has(futureSoloAlbums)).equal(false);

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

  describe('sort', () => {
    it('should sort the set based on callback', (done) => {
      const set = new SpicySet([4, 1, 3, 2, 4, 3, 1]);

      should(set.toSortedArray()).deepEqual([1, 2, 3, 4]);
      should(set.toSortedArray((a, b) => b - a)).deepEqual([4, 3, 2, 1]);

      done();
    });
  });
});
